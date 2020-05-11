'use strict'
const { Controller } = require('egg')

/**
 * @Controller 商品管理
 */
class ProductController extends Controller {
  /**
   * @summary 商品列表
   * @description 用于查询商品列表
   * @router get /rural/v1/product
   * @request query integer *pageNo eg:1 页码
   * @request query integer *pageSize eg:10 页数
   * @request query string search eg: 搜索字符串
   * @response 200 baseResponse 请求成功
   */
  async index() {
    const { ctx } = this
    const payload = ctx.request.query
    const res = await ctx.service.product.index(payload)
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 创建商品
   * @description 用于创建商品
   * @router post /rural/v1/product
   * @request body createProductRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx } = this
    ctx.validate(ctx.rule.createProductRequest)
    const payload = ctx.request.body
    const res = await ctx.service.product.create(payload)
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 更新商品
   * @description 对特定商品进行更新
   * @router put /rural/v1/product
   * @request body updateProductRequest *body
   * @response 200 baseResponse 更新成功
   */
  async update() {
    const { ctx } = this
    ctx.validate(ctx.rule.updateProductRequest)
    const payload = ctx.request.body
    await ctx.service.product.update(payload)
    ctx.helper.success({ ctx })
  }

  /**
   * @summary 删除商品
   * @description 删除指定id的商品
   * @router delete /rural/v1/product
   * @request body idsBaseRequest *body
   * @response 200 baseResponse 删除成功
   */
  async delete() {
    const { ctx } = this
    ctx.validate(ctx.rule.idsBaseRequest)
    const { ids } = ctx.request.body
    await ctx.service.product.delete(ids)
    ctx.helper.success({ ctx })
  }

  /**
   * @summary 商品分类
   * @description 给商品增加二级分类
   * @router put /rural/v1/prod_set_category
   * @request body setCategoryRequest *body
   * @response 200 baseResponse 添加成功
   */
  async set_category() {
    const { ctx } = this
    ctx.validate(ctx.rule.setCategoryRequest)
    const { id, category_id } = ctx.request.body
    await ctx.service.category.prod_set_category(id, category_id)
    ctx.helper.success({ ctx })
  }

  /**
   * @summary 添加商品Spu(一级)
   * @description 给商品添加spu
   * @router post /rural/v1/add_prod_spu
   * @request body createProductSpuRequest *body
   * @response 200 baseResponse 添加成功
   */
  async add_spu() {
    const { ctx } = this
    ctx.validate(ctx.rule.createProductSpuRequest)
    const { id, spu_name } = ctx.request.body
    const res = await ctx.service.product.addSpu(id, spu_name)
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 添加商品Sku(二级)
   * @description 给商品添加sku
   * @router post /rural/v1/add_prod_sku
   * @request body createProductSkuRequest *body
   * @response 200 baseResponse 添加成功
   */
  async add_sku() {
    const { ctx } = this
    ctx.validate(ctx.rule.createProductSkuRequest)
    const { spuId, sku_name, stock } = ctx.request.body
    const res = await ctx.service.product.addSku(spuId, sku_name, stock)
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 添加商品Spc
   * @description 给添加添加产品参数
   * @router post /rural/v1/add_prod_spc
   * @request body createProductSpcRequest *body
   * @response 200 baseResponse 添加成功
   */
  async add_spc() {
    const { ctx } = this
    ctx.validate(ctx.rule.createProductSpcRequest)
    const { id, spc_name, spc_value } = ctx.request.body
    const res = await ctx.service.product.addSpc(id, spc_name, spc_value)
    ctx.helper.success({ ctx, res })
  }
}

module.exports = ProductController
