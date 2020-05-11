'use strict'
const { Controller } = require('egg')
/**
 * @Controller 商品分类
 */
class CategoryController extends Controller {
  /**
   * @summary 分类列表
   * @description 查询商品分类列表
   * @router get /rural/v1/category
   * @response 200 baseResponse 请求成功
   */
  async index() {
    const { ctx } = this
    const res = await ctx.service.category.index()
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 新建分类
   * @description 新建商品的分类
   * @router post /rural/v1/category
   * @request body createCategoryRequest *body
   * @response 200 baseResponse 请求成功
   */
  async create() {
    const { ctx } = this
    ctx.validate(ctx.rule.createCategoryRequest)
    const payload = ctx.request.body
    await ctx.service.category.create(payload)
    ctx.helper.success({ ctx })
  }

  /**
   * @summary 删除分类
   * @description 删除指定id的分类
   * @router delete /rural/v1/category
   * @request body idsBaseRequest *body
   * @response 200 baseResponse 删除成功
   */
  async delete() {
    const { ctx } = this
    ctx.validate(ctx.rule.idsBaseRequest)
    const { ids } = ctx.request.body
    await ctx.service.category.delete(ids)
    ctx.helper.success({ ctx })
  }
}

module.exports = CategoryController
