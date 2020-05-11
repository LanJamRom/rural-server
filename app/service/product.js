'use strict'
const { Service } = require('egg')
class ProductService extends Service {
  // TODO: 后台接口
  /**
   * 查询商品列表
   * @param {Object} payload 载荷
   */
  async index(payload) {
    const { ctx, app } = this
    const condition = {
      order: [['createTime']],
      include: [
        {
          model: app.model.ProductSpu,
          attributes: { exclude: ['createTime', 'updateTime', 'productId'] },
          include: [
            {
              model: app.model.ProductSku,
              attributes: { exclude: ['createTime', 'updateTime', 'ProductSpuId'] }
            }
          ]
        },
        {
          model: app.model.ProductStock
        }
      ]
    }
    if (payload && Object.keys(payload).length) {
      if (payload.pageNo) {
        condition.offset = ctx.helper.toInt(payload.pageNo) - 1
      }
      if (payload.pageSize) {
        condition.limit = ctx.helper.toInt(payload.pageSize)
      }
    }
    return await ctx.model.Product.findAll(condition)
  }

  /**
   * 创建新的产品
   * @param {Object} payload 载荷
   */
  async create(payload) {
    const { ctx } = this
    const product = await ctx.model.Product.create(payload)
    await product.createProductExtra()
    return product
  }

  /**
   * 更新产品
   * @param {Object} payload 载荷
   */
  async update(payload) {
    const { ctx } = this
    await ctx.model.Product.update(payload, {
      where: {
        id: payload.id
      }
    })
  }

  /**
   * 删除产品
   * @param {Array} ids id数组集合
   */
  async delete(ids) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    await ctx.model.Product.destroy({
      where: { id: { [Op.in]: ids } }
    })
  }

  /**
   * 给商品添加spu(一级)
   * @param {String} id 商品id
   * @param {String} spu_name spu名称
   */
  async addSpu(id, spu_name) {
    const { ctx } = this
    const product = await ctx.model.Product.findByPk(id)
    return await product.createProductSpu({ spu_name })
  }

  /**
   * 给商品添加spu(二级)
   * @param {String} spu_id spuid
   * @param {String} sku_name sku名称
   * @param {Number} stock 库存量
   */
  async addSku(spu_id, sku_name, stock) {
    const { ctx } = this
    const spu = await ctx.model.ProductSpu.findByPk(spu_id)
    return await spu.createProductSku({ sku_name, stock })
  }

  /**
   * 给商品添加产品参数
   * @param {String} id 商品id
   * @param {String} spc_name 参数名称
   * @param {String} spc_value 参数值
   */
  async addSpc(id, spc_name, spc_value) {
    const { ctx } = this
    const product = await ctx.model.Product.findByPk(id)
    return await product.createProductSpc({ spc_name, spc_value })
  }

  // TODO: 客户端接口
  /**
   * 通过id查询商品
   * @param {String} id 商品id
   */
  async show(id) {
    const { ctx, app } = this
    const product = await ctx.model.Product.findByPk(id, {
      include: [
        {
          model: app.model.ProductSpc
        },
        {
          attributes: { exclude: ['createTime', 'updateTime', 'productId'] },
          model: app.model.ProductSpu,
          include: [
            {
              model: app.model.ProductSku,
              attributes: { exclude: ['createTime', 'updateTime', 'ProductSpuId'] }
            }
          ]
        },
        {
          model: app.model.ProductStock,
          attributes: { exclude: ['id', 'prod_id'] }
        },
        {
          model: app.model.ProductExtra,
          as: 'extra',
          attributes: ['visit_num', 'sales']
        }
      ]
    })
    const [extra] = await ctx.model.ProductExtra.findOrCreate({
      where: {
        product_id: product.id
      },
      defaults: { productId: product.id }
    })
    extra.visitNum = extra.visitNum + 1
    extra.save()

    // return JSON.stringify(product)
    return product
  }

  /**
   * 商品列表
   * @param {Object} payload 载荷
   */
  async show_list(payload) {
    const { ctx, app } = this
    const sequelize = app.Sequelize
    const condition = {
      where: {},
      include: [
        {
          model: app.model.ProductExtra,
          as: 'extra',
          attributes: { exclude: ['createTime', 'updateTime', 'product_id'] }
        }
      ]
    }
    if (payload && Object.keys(payload).length) {
      if (payload.pageNo) {
        condition.offset = ctx.helper.toInt(payload.pageNo) - 1
      }
      if (payload.pageSize) {
        condition.limit = ctx.helper.toInt(payload.pageSize)
      }
      if (payload.orderBy) {
        const orderArr = payload.orderBy.split(',')
        if (orderArr[0] === 'sales') {
          condition.order = [[sequelize.col('extra.sales'), orderArr[1]]]
        } else {
          condition.order = [[sequelize.col(orderArr[0]), orderArr[1]]]
        }
      }
      if (payload.secondCategoryId) {
        condition.where.secondCategoryId = payload.secondCategoryId
      }
      if (payload.keyword) {
        condition.where.name = {
          [sequelize.Op.like]: `%${payload.keyword}%`
        }
      }
    }
    return await ctx.model.Product.findAll(condition)
  }
}

module.exports = ProductService
