'use strict'
const { Service } = require('egg')

class CartService extends Service {
  /**
   * 查询购物车列表
   * @param {Object} payload 载荷
   */
  async index(payload) {
    const { ctx } = this
    const condition = {
      attributes: { exclude: ['subImages', 'createTime', 'updateTime', 'secondCategoryId'] },
      joinTableAttributes: { exclude: ['cartId', 'productId', 'createTime', 'updateTime'] }
    }
    if (payload && Object.keys(payload).length) {
      if (payload.pageNo) {
        condition.offset = ctx.helper.toInt(payload.pageNo) - 1
      }
      if (payload.pageSize) {
        condition.limit = ctx.helper.toInt(payload.pageSize)
      }
    }
    const cart = await ctx.user.getCart()
    const data = await cart.getProducts(condition)
    const ids = []
    data.forEach(item => {
      if (item.cartItem) {
        const { sub_id = '', twice_id = '' } = item.cartItem
        sub_id && ids.push(sub_id)
        twice_id && ids.push(twice_id)
      }
    })
    if (ids.length) {
      const skuObj = await ctx.service.special.skuFindAll(ids)
      if (skuObj) {
        return data.map(item => {
          const {
            cartItem: { sub_id, twice_id }
          } = item
          item.cartItem.sub_name = skuObj[sub_id]
          item.cartItem.twice_name = skuObj[twice_id]
          return item
        })
      }
    }
    return data
  }

  /**
   * 购物车增加商品
   * @param {String} id 商品id
   * @param {String} subId 主属性id
   * @param {String} twiceId 副属性id
   */
  async create(id, subId = '', twiceId = '') {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const cart = await ctx.user.getCart()

    const condition = {
      where: {
        cartId: cart.id,
        productId: id,
        sub_id: subId,
        twice_id: twiceId
      }
    }
    const skuArr = await ctx.model.ProductSku.findAll({
      where: {
        id: {
          [Op.in]: [subId, twiceId]
        }
      }
    })
    const stock = await ctx.model.ProductStock.findOne({
      where: {
        prod_id: id,
        sub_id: subId,
        twice_id: twiceId
      }
    })
    if (skuArr.length) {
      const [sub_name = '', twice_name = ''] = skuArr.map(item => {
        return item.sku_name
      })
      condition.where.sub_name = sub_name
      condition.where.twice_name = twice_name
    }
    if (stock) {
      condition.where.currentUnitPrice = stock.price
      condition.where.stock = stock.stock
    } else {
      const product = await ctx.model.Product.findByPk(id)
      condition.where.currentUnitPrice = product.price
      condition.where.stock = product.stock
    }

    const [item, created] = await ctx.model.CartItem.findOrCreate(condition)
    if (!created) {
      await item.update({ quantity: item.quantity + 1 })
    }
  }

  /**
   * 购物车更新商品数量(加减)
   * @param {Object} payload 商品的载荷
   */
  async update(payload) {
    const { ctx } = this
    const { id, quantity } = payload
    await ctx.model.CartItem.update({ quantity }, { where: { id } })
  }

  /**
   * 删除指定购物车商品
   * @param {Array} ids id数组
   */
  async delete(ids) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    await ctx.model.CartItem.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })
  }
}

module.exports = CartService
