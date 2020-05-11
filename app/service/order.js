'use strict'

const { Service } = require('egg')

class OrderService extends Service {
  // TODO: 后台接口
  /**
   * 查询订单列表
   * @param {Object} payload 载荷
   */
  async index(payload) {
    const { ctx } = this
    const condition = {}
    if (payload && Object.keys(payload).length) {
      if (payload.pageNo) {
        condition.offset = ctx.helper.toInt(payload.pageNo) - 1
      }
      if (payload.pageSize) {
        condition.limit = ctx.helper.toInt(payload.pageSize)
      }
    }
    return await ctx.model.Order.findAll(condition)
  }

  /**
   * 更新订单
   * @param {Object} payload 载荷
   */
  async update(payload) {
    const { ctx } = this
    await ctx.model.Order.update(payload, {
      where: {
        id: payload.id
      }
    })
  }

  /**
   * 删除订单
   * @param {Array} ids id数组集合
   */
  async delete(ids) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    await ctx.model.Order.destroy({
      where: { id: { [Op.in]: ids } }
    })
  }

  // TODO: 客户端接口

  /**
   * 查询订单列表
   * @param {Object} payload 载荷
   */
  async user_index(payload) {
    const { ctx, app } = this
    const condition = {
      include: [
        {
          model: app.model.Product,
          attributes: {
            exclude: ['subImages', 'imageDetails', 'subtitle', 'createTime', 'updateTime', 'secondCategoryId']
          }
        }
      ],
      order: [['updateTime', 'DESC']],
      where: {}
    }
    if (payload && Object.keys(payload).length) {
      if (payload.pageNo) {
        condition.offset = ctx.helper.toInt(payload.pageNo) - 1
      }
      if (payload.pageSize) {
        condition.limit = ctx.helper.toInt(payload.pageSize)
      }
      if (payload.status) {
        condition.where.status = payload.status
      }
    }
    return ctx.user.getOrders(condition)
  }

  /**
   * 提交订单
   * @param {Array} ids cartItem的id数组集合
   */
  async create_by_cart(ids) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const shipping_id = ids.shift()
    const idCondition = { where: { id: { [Op.in]: ids } } }
    const order = await ctx.user.createOrder()
    const cartItems = await ctx.model.CartItem.findAll(idCondition)
    const prodIds = cartItems.map(item => item.productId)

    const prodIdscondition = { where: { prod_id: { [Op.in]: prodIds } } }
    const product = await ctx.model.Product.findAll({
      where: {
        id: {
          [Op.in]: prodIds
        }
      },
      attributes: ['id', 'price']
    })
    const productMap = product.reduce((curr, prev) => {
      curr[prev.id] = prev.price
      return curr
    }, {})
    // 取得所有商品ID的所有stock属性
    const stock = await ctx.model.ProductStock.findAll(prodIdscondition)
    const orderItem = cartItems.reduce((curr, prev) => {
      const obj = {
        order_order_num: order.orderNum,
        productId: prev.productId,
        shipping_id,
        quantity: prev.quantity
      }
      if (prev.sub_id) {
        obj.sub_id = prev.sub_id
        obj.sub_name = prev.sub_name
      }
      if (prev.twice_id) {
        obj.twice_id = prev.twice_id
        obj.twice_name = prev.twice_name
      }
      // 主属性存在
      if (prev.sub_id && !prev.twice_id) {
        const stockItem = stock.find(item => {
          return item.prod_id === prev.productId && item.subId === prev.sub_id
        })
        if (stockItem) {
          obj.currentUnitPrice = stockItem.price
          obj.totalPrice = stockItem.price * prev.quantity
        }
      } else if (prev.sub_id && prev.twice_id) {
        // 主副属性都存在
        const stockItem = stock.find(item => {
          return item.prod_id === prev.productId && item.subId === prev.sub_id && item.twiceId === prev.twice_id
        })
        if (stockItem) {
          obj.currentUnitPrice = stockItem.price
          obj.totalPrice = stockItem.price * prev.quantity
        }
      } else {
        // 没有主副属性
        const price = productMap[prev.productId]
        obj.currentUnitPrice = price
        obj.totalPrice = price * prev.quantity
      }

      curr.push(obj)
      return curr
    }, [])
    // 批量增加orderitem
    await ctx.model.OrderItem.bulkCreate(orderItem)
    // 一次性删除购物车
    await ctx.model.CartItem.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })
    return ctx.user.getOrders({ where: { id: order.id } })
  }
  async create_by_prod(args) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const [shipping_id, id, subId = '', twiceId = ''] = args
    const order = await ctx.user.createOrder()
    const orderItem = {
      order_order_num: order.orderNum,
      productId: id,
      shipping_id,
      quantity: 1
    }
    let skuObj
    if (subId) {
      const skuArr = await ctx.model.ProductSku.findAll({
        where: {
          id: {
            [Op.in]: [subId, twiceId]
          }
        }
      })
      skuObj = skuArr.reduce((curr, prev) => {
        const key = prev.id
        curr[key] = prev.sku_name
        return curr
      }, {})
      orderItem.sub_id = subId
      orderItem.sub_name = skuObj[subId]
      const prodIdscondition = { where: { prod_id: id } }
      // 取得该商品ID的所有stock属性
      const stock = await ctx.model.ProductStock.findAll(prodIdscondition)
      if (twiceId) {
        const stockItem = stock.find(item => {
          return item.prod_id === id && item.subId === subId && item.twiceId === twiceId
        })
        orderItem.twice_id = twiceId
        orderItem.twice_name = skuObj[twiceId]
        orderItem.currentUnitPrice = stockItem.price
        orderItem.totalPrice = stockItem.price
      } else {
        const stockItem = stock.find(item => {
          return item.prod_id === id && item.subId === subId
        })
        orderItem.currentUnitPrice = stockItem.price
        orderItem.totalPrice = stockItem.price
      }
    } else {
      const product = await ctx.model.Product.findByPk(id)
      orderItem.currentUnitPrice = product.price
      orderItem.totalPrice = product.price
    }
    return await ctx.model.OrderItem.create(orderItem)
  }
  /**
   * 修改订单状态
   * @param {Number} status 订单状态
   * @param {Number} id 订单id
   */
  async user_update(status, id) {
    const { ctx } = this
    const map = {
      0: {
        closeTime: new Date(),
        status
      },
      20: {
        status
      },
      40: {
        sendTime: new Date(),
        status
      },
      50: {
        endTime: new Date(),
        status
      },
      60: {
        closeTime: new Date(),
        status
      }
    }
    await ctx.model.Order.update(map[status], {
      where: {
        id
      }
    })
  }
}

module.exports = OrderService
