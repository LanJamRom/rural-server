'use strict'
const { Service } = require('egg')

class UserService extends Service {
  /**
   * 用户列表查询
   * @param {*} payload 查询条件
   */
  async index(payload) {
    const { ctx } = this
    const condition = {}
    if (Object.keys(payload).length) {
      if (payload.pageNo) {
        condition.offset = ctx.helper.toInt(payload.pageNo) - 1
      }
      if (payload.pageSize) {
        condition.limit = ctx.helper.toInt(payload.pageSize)
      }
    }
    const data = ctx.model.User.find(condition)
    return data
  }
  /**
   * 查看单个用户
   * @param {*} id 用户id
   */
  async show(id) {
    const { ctx } = this
    const user = await ctx.model.User.findByPk(id)
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user
  }
  /**
   * 创建用户
   * @param {*} payload 参数
   */
  async create(payload) {
    const { ctx } = this
    payload.password && (payload.password = await this.ctx.genHash(payload.password))
    return ctx.model.User.create(payload)
  }
}

module.exports = UserService
