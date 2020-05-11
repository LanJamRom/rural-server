'use strict'

const { Controller } = require('egg')

/**
 * @Controller 特殊接口
 */
class SpecialController extends Controller {
  /**
   * @summary 商品添加库存
   * @description 自动给商品每个类型增加库存
   * @router get /rural/v1/add_prod_stock
   * @request query string *id 商品id
   * @response 200 baseResponse 请求成功
   */
  async prod_create_stock() {
    const { ctx } = this
    const { id } = ctx.request.query
    const res = await ctx.service.special.specAdd(id)
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 添加商品extra
   * @description 为商品创建extra属性
   * @router post /rural/v1/add_prod_extra
   * @request body idBaseRequest *body
   * @response 200 baseResponse 添加成功
   */
  async add_extra() {
    const { ctx } = this
    const { id } = ctx.request.body
    const res = await ctx.service.special.add_extra(id)
    ctx.helper.success({ ctx, res })
  }
}

module.exports = SpecialController
