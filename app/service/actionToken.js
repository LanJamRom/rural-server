'use strict'
const { Service } = require('egg')

class ActionTokenService extends Service {
  /**
   * 生成token
   * @param {String} id 用户id
   */
  async createToken(id) {
    const { ctx } = this
    return ctx.app.jwt.sign(
      {
        data: { id },
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
      },
      ctx.app.config.jwt.secret
    )
  }

  /**
   * 解析token
   * @param {String} token tokenId
   */
  async verifyToken(token) {
    const { ctx } = this
    return ctx.app.jwt.verify(token, ctx.app.config.jwt.secret)
  }
}

module.exports = ActionTokenService
