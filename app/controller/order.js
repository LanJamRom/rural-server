'use strict'
const { Controller } = require('egg')

/**
 * @Controller 订单管理
 */
class OrderController extends Controller {
  /**
   * @summary 订单列表
   * @description 用于查询订单列表
   * @router get /rural/v1/order
   * @request query integer *pageNo eg:1 页码
   * @request query integer *pageSize eg:10 页数
   * @request query string search eg: 搜索字符串
   * @response 200 baseResponse 请求成功
   */
  async index() {
    const { ctx } = this
    const payload = ctx.request.query
    const res = await ctx.service.order.index(payload)
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 更新订单
   * @description 对特定订单进行更新
   * @router put /rural/v1/order
   * @request body updateOrderRequest *body
   * @response 200 baseResponse 更新成功
   */
  async update() {
    const { ctx } = this
    ctx.validate(ctx.rule.updateOrderRequest)
    const payload = ctx.request.body
    await ctx.service.order.update(payload)
    ctx.helper.success({ ctx })
  }
  /**
   * @summary 删除订单
   * @description 删除指定id的订单
   * @router delete /rural/v1/order
   * @request body idsBaseRequest *body
   * @response 200 baseResponse 删除成功
   */
  async delete() {
    const { ctx } = this
    ctx.validate(ctx.rule.idsBaseRequest)
    const { ids } = ctx.request.body
    await ctx.service.order.delete(ids)
    ctx.helper.success({ ctx })
  }
}
module.exports = OrderController
