'use strict'

const { Service } = require('egg')
class SpecialService extends Service {
  /**
   * 特殊方法：商品增加库存
   * 自动读取商品所有属性并写入stock表
   * @param {String} id 商品id
   */
  async specAdd(id) {
    const { ctx } = this
    const product = await ctx.model.Product.findByPk(id)
    const spu = await product.getProductSpus({
      attributes: { exclude: ['createTime', 'updateTime', 'productId'] },
      include: [
        {
          model: ctx.model.ProductSku,
          attributes: { exclude: ['createTime', 'updateTime', 'ProductSpuId'] }
        }
      ]
    })
    if (!spu) return
    const stockMap = spu.reduce((curr, prev) => {
      const id = prev.id
      const ProductSkus = prev.ProductSkus
      curr[id] = ProductSkus
      return curr
    }, {})
    const keys = Object.keys(stockMap)
    const subItem = keys.length && stockMap[keys[0]]
    const twiceItem = keys.length && keys[1] && stockMap[keys[1]]
    const arr = []
    for (let i = 0; i < subItem.length; i++) {
      const sub = subItem[i]
      const obj = {
        prod_id: id,
        subId: sub.id,
        subName: sub.sku_name,
        stock: 100,
        price: 50
      }
      if (twiceItem) {
        for (let k = 0; k < twiceItem.length; k++) {
          const twice = twiceItem[k]
          obj.twiceId = twice.id
          obj.twiceName = twice.sku_name
          arr.push(obj)
        }
      } else {
        arr.push(obj)
      }
    }
    await ctx.model.ProductStock.bulkCreate(arr)
    return await ctx.model.ProductStock.findAll({ where: { id } })
  }

  /**
   * @param {Array} ids sku数组集合
   */
  async skuFindAll(ids) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    const data = await ctx.model.ProductSku.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })

    if (data.length) {
      return data.reduce((curr, prev) => {
        curr[prev.id] = prev.sku_name
        return curr
      }, {})
    }
  }

  /**
   * 给商品添加extra属性
   * @param {string} id 商品id
   */
  async add_extra(id) {
    const { ctx } = this
    const product = await ctx.model.Product.findByPk(id)
    return await product.createProductExtra()
  }
}

module.exports = SpecialService
