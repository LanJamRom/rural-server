'use strict'

module.exports = {
  baseRequest: {
    id: { type: 'string', description: 'id 唯⼀键', required: true }
  },
  respondHead: {
    ret: { type: 'integer', required: true, example: 0 },
    msg: { type: 'string', example: '请求成功' }
  },
  respondItem: {},
  baseResponse: {
    head: { type: 'respondHead' },
    data: { type: 'array', itemType: 'respondItem' }
  },
  idsBaseRequest: {
    ids: {
      type: 'array',
      required: true,
      description: '需要操作的id数组集合',
      itemType: 'string'
    }
  },
  idBaseRequest: {
    id: {
      type: 'string',
      required: true,
      description: '商品id'
    }
  }
}
