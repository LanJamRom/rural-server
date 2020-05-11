'use strict'
module.exports = {
  addCartRequest: {
    id: {
      type: 'string',
      required: true,
      description: '商品id'
    },
    subId: {
      type: 'string',
      required: false,
      description: '主属性id'
    },
    twiceId: {
      type: 'string',
      required: false,
      description: '副属性id'
    }
  },
  updateCartRequest: {
    id: {
      type: 'string',
      required: true,
      description: 'cartItem的id',
      example: 'ab98fa30-d8d8-4a32-b261-3252195ce158'
    },
    quantity: {
      type: 'integer',
      required: true,
      description: '数量',
      example: 1,
      min: 1
    }
  },
  deleteCartRequest: {
    ids: {
      type: 'array',
      required: true,
      description: 'id数组集合',
      itemType: 'string'
    }
  }
}
