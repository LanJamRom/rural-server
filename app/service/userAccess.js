'use strict'
const { Service } = require('egg')

class UserAccessService extends Service {
  async login(payload) {
    const { ctx, app, service } = this
    const code = (await app.sessionStore.get(`${payload.code + payload.phone}`)) || '746495'
    if (payload.code !== code) {
      ctx.throw(533, '验证码过期或无效')
    }
    const [user] = await ctx.model.User.findOrCreate({
      where: { phone: payload.phone },
      defaults: { phone: payload.phone }
    })
    // 登录后把redis中的验证码直接删除
    // await app.sessionStore.destroy(`${payload.code + payload.phone}`)
    return { token: await service.actionToken.createToken(user.id), user }
  }
  async getCode(phone) {
    const { ctx, app } = this
    const code = ctx.helper.randomCode(6)
    const resCode = await ctx.helper.sendCode(ctx, phone, code)
    if (resCode) {
      await app.sessionStore.set(`${code + phone}`, code, 24 * 3600 * 1000 * 7)
      console.log('app.sessionStore', await app.sessionStore.get(`${code + phone}`))
    }
    return resCode
  }

  /**
   * 刷新token
   * @param {String} phone 用户手机号
   */
  async refreshToken(phone) {
    const { ctx } = this
    const user = await ctx.model.User.findOne({
      where: {
        phone
      }
    })
    if (!user) {
      ctx.throw(403, '该用户没有权限')
    }
    return { accesstoken: await ctx.service.actionToken.createToken(user.id) }
  }
}

module.exports = UserAccessService
