'use strict'

const { Controller } = require('egg')
/**
 * @Controller 用户鉴权
 */
class UserAccessController extends Controller {
  /**
   * @summary ⽤户登⼊/注册
   * @description ⽤户登⼊/注册
   * @router post /rural/v1/login
   * @request body loginRequest *body
   * @response 200 baseResponse 请求成功
   */
  async login() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.loginRequest)
    const payload = ctx.request.body || {}
    const res = await service.userAccess.login(payload)
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 请求验证码
   * @description 用户登录的短信验证码
   * @router post /rural/v1/getCode
   * @request body codeRequest *body
   * @response 200 baseResponse 请求成功
   */
  async getCode() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.codeRequest)
    const { phone } = ctx.request.body
    const msg = (await service.userAccess.getCode(phone)) ? '下发短信成功' : '下发短信失败'
    ctx.helper.success({ ctx, msg })
  }

  /**
   * @summary 刷新token
   * @description 用于重新刷新token
   * @router get /rural/v1/getAccessToken
   * @request query string *account eg:13226047873
   * @response 200 baseResponse 请求成功
   */
  async refreshToken() {
    const { ctx } = this
    const { account } = ctx.request.query
    const res = await ctx.service.userAccess.refreshToken(account)
    ctx.helper.success({ ctx, res })
  }
}
module.exports = UserAccessController
