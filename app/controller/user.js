'use strict'
const { Controller } = require('egg')
/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  /**
   * @summary 用户列表
   * @description 用于查询用户列表
   * @router get /rural/v1/user
   * @request query integer *pageNo eg:1 页码
   * @request query integer *pageSize eg:10 页数
   * @request query string search eg: 搜索字符串
   * @response 200 baseResponse 创建成功
   */
  async index() {
    const { ctx } = this
    const payload = ctx.request.query
    const res = await this.service.user.index(payload)
    ctx.helper.success({ ctx, res })
  }
  /**
   * @summary 按ID查询
   * @description 用id查询单个用户
   * @router get /rural/v1/user/id
   * @request query string *id eg:5e894aa51867c84cc0600cff 用户id
   * @response 200 baseResponse 创建成功
   */
  async show() {
    const { ctx } = this
    const { id } = ctx.query
    const res = await this.service.user.show(id)
    ctx.helper.success({ ctx, res })
  }
  /**
   * @summary 创建用户
   * @description 创建用户 记录用户账号/密码/类型
   * @router post /rural/v1/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx } = this
    const payload = ctx.request.body
    const res = await this.service.user.create(payload)
    ctx.helper.success({ ctx, res })
  }
}

module.exports = UserController
