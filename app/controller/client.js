'use strict'

const { Controller } = require('egg')

/**
 * @Controller 客户端接口
 */
class ClientController extends Controller {
  /**
   * @summary 获取购物车
   * @description 用于获取用户购物车列表
   * @router get /rural/v2/cart
   * @request query integer *pageNo eg:1 页码
   * @request query integer *pageSize eg:10 页数
   * @response 200 baseResponse 请求成功
   */
  async cart_list() {
    const { ctx } = this
    const payload = ctx.request.query
    const res = await ctx.service.cart.index(payload)
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 加入购物车
   * @description 用户往购物车增加新的商品/数量
   * @router post /rural/v2/cart
   * @request body addCartRequest *body
   * @response 200 baseResponse 请求成功
   */
  async cart_create() {
    const { ctx } = this
    // 取出商品id
    const { id, subId, twiceId } = ctx.request.body
    ctx.validate(ctx.rule.addCartRequest)
    await ctx.service.cart.create(id, subId, twiceId)
    ctx.helper.success({ ctx })
  }

  /**
   * @summary 修改购物车
   * @description 购物车列表数量增加/减少
   * @router put /rural/v2/cart
   * @request body updateCartRequest *body
   * @response 200 baseResponse 请求成功
   */
  async cart_put() {
    const { ctx } = this
    const payload = ctx.request.body
    ctx.validate(ctx.rule.updateCartRequest)
    await ctx.service.cart.update(payload)
    ctx.helper.success({ ctx })
  }

  /**
   * @summary 删除购物车
   * @description 购物车列表数量删除
   * @router delete /rural/v2/cart
   * @request body deleteCartRequest *body
   * @response 200 baseResponse 删除成功
   */
  async cart_del() {
    const { ctx } = this
    const { ids } = ctx.request.body
    ctx.validate(ctx.rule.deleteCartRequest)
    await ctx.service.cart.delete(ids)
    ctx.helper.success({ ctx })
  }

  /**
   * @summary 获取订单
   * @description 用于获取用户订单列表
   * @router get /rural/v2/order
   * @request query integer *pageNo eg:1 页码
   * @request query integer *pageSize eg:10 页数
   * @response 200 baseResponse 请求成功
   */
  async order_list() {
    const { ctx } = this
    const payload = ctx.request.query
    const res = await ctx.service.order.user_index(payload)
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 提交订单
   * @description 用户下单
   * @router post /rural/v2/order
   * @request body createOrderRequest *body
   * @response 200 baseResponse 请求成功
   */
  async order_create() {
    const { ctx } = this
    const { type, condition } = ctx.request.body
    const typeMap = {
      prod: 'create_by_prod',
      cart: 'create_by_cart'
    }
    const res = await ctx.service.order[typeMap[type]](condition)
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 更新订单状态
   * @description 用户订单状态更新
   * @router put /rural/v2/order
   * @request body updateOrderRequest *body
   * @response 200 baseResponse 请求成功
   */
  async order_update() {
    const { ctx } = this
    ctx.validate(ctx.rule.updateOrderRequest)
    const { status, id } = ctx.request.body
    await ctx.service.order.user_update(status, id)
    ctx.helper.success({ ctx })
  }

  /**
   * @summary 商品列表
   * @description 用户获取商品列表
   * @router get /rural/v1/prod_list
   * @request query integer *pageNo eg:1 页码
   * @request query integer *pageSize eg:10 页数
   * @request query string name 模糊匹配字段
   * @request query string secondCategoryId 分类id
   */
  async product_list() {
    const { ctx } = this
    const payload = ctx.request.query
    const res = await ctx.service.product.show_list(payload)
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 商品详情
   * @description 商品详情页
   * @router get /rural/v1/prod_detail
   * @request query string *id 商品id
   */
  async prduct_detail() {
    const { ctx } = this
    const { id } = ctx.request.query
    const res = await ctx.service.product.show(id)
    // const { ProductExtra } = res
    // delete ProductExtra.id
    // delete res.ProductExtra
    // res = { ...ProductExtra, ...res }
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 用户地址列表
   * @description 用于查询用户地址列表
   * @router get /rural/v2/shipping
   * @response 200 baseResponse 请求成功
   */
  async shipping_list() {
    const { ctx } = this
    const res = await this.service.shipping.index()
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 默认地址
   * @description 获取当前用户默认地址
   * @router get /rural/v2/shipping_default
   * @response 200 baseResponse 请求成功
   */
  async shipping_default() {
    const { ctx } = this
    const res = await this.service.shipping.index_default()
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 创建新的地址
   * @description 用户创建新的收货地址
   * @router post /rural/v2/shipping
   * @request body createAddressRequest *body
   * @response 200 baseResponse 请求成功
   */
  async shipping_create() {
    const { ctx } = this
    ctx.validate(ctx.rule.createAddressRequest)
    const payload = ctx.request.body
    const res = await this.service.shipping.create(payload)
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 更新用户地址
   * @description 用于更新用户地址
   * @router put /rural/v2/shipping
   * @request body updateShippingRequest *body
   * @response 200 baseResponse 请求成功
   */
  async shipping_update() {
    const { ctx } = this
    ctx.validate(ctx.rule.updateShippingRequest)
    const payload = ctx.request.body
    const res = await this.service.shipping.update(payload)
    ctx.helper.success({ ctx, res })
  }
}

module.exports = ClientController
