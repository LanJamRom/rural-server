'use strict'

module.exports = {
  updateOrderRequest: {
    id: {
      type: 'string',
      required: true,
      description: '订单id'
    },
    status: {
      type: 'integer',
      required: true,
      enum: [0, 10, 20, 40, 50, 60],
      description: '订单状态: 0已取消 10未支付 20已支付 40已发货 50订单完成 60订单关闭'
    }
  },
  createOrderRequest: {
    type: {
      type: 'string',
      enum: ['prod', 'cart'],
      example: 'prod',
      description: '类型：购物车/商品详情创建订单'
    },
    condition: {
      type: 'array',
      itemType: 'string',
      description: '购物车类型：[shipping_id,cartItemId, ...], 商品详情类型: [shipping_id,prodId: id, subId, twiceId]'
    }
  }
}
