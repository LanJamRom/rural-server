'use strict'
const { Service } = require('egg')

class AddressService extends Service {
  async index() {
    const { ctx } = this
    return await ctx.user.getShippings({
      attributes: { exclude: ['user_id', 'userId', 'createTime', 'updateTime'] },
      order: [['default', 'DESC']]
    })
  }

  /**
   * 获取默认地址
   */
  async index_default() {
    const { ctx } = this
    return await ctx.user.getShippings({
      where: { default: true },
      attributes: { exclude: ['user_id', 'userId', 'createTime', 'updateTime'] }
    })
  }
  // async index_default() {
  //   const { ctx } = this
  //   console.log(ctx.model.User.prototype)
  //   return await ctx.user.getShippings({
  //     attributes: { exclude: ['user_id', 'userId', 'createTime', 'updateTime'] },
  //     order: [['default', 'DESC']]
  //   })
  // }
  async create(payload) {
    const { ctx } = this
    if (payload.default) {
      await ctx.model.Shipping.update(
        { default: false },
        {
          where: {
            default: true
          }
        }
      )
    }
    return await ctx.user.createShipping(payload)
  }

  async update(payload) {
    const { ctx } = this
    if (payload.default) {
      await ctx.model.Shipping.update(
        { default: false },
        {
          where: {
            default: true
          }
        }
      )
    }
    const id = payload.id
    delete payload.id
    return await ctx.model.Shipping.update(payload, {
      where: {
        id
      }
    })
  }
}

module.exports = AddressService
