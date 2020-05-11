'use strict'
module.exports = {
  createAddressRequest: {
    receiverName: {
      type: 'string',
      required: true,
      description: '收件人',
      example: '蓝健荣'
    },
    // 收货电话
    receiverPhone: {
      type: 'string',
      required: true,
      description: '⼿机号',
      example: '13226047873',
      format: /^1[34578]\d{9}$/
    },
    // 省份
    receiverProvince: {
      type: 'string',
      required: true,
      description: '省份',
      example: '广东省'
    },
    // 城市
    receiverCity: {
      type: 'string',
      required: true,
      description: '城市',
      example: '珠海市'
    },
    // 区/县
    receiverDistrict: {
      type: 'string',
      required: true,
      description: '区/县',
      example: '高新区'
    },
    // 详细地址
    receiverAddress: {
      type: 'string',
      required: true,
      description: '详细地址',
      example: '东岸社区东心街2号'
    },
    // 邮编
    receiverZip: {
      type: 'string',
      required: true,
      description: '邮编地址',
      example: 519000
    }
  },
  updateShippingRequest: {
    id: {
      type: 'string',
      required: true,
      description: 'id 唯一键'
    },
    receiverName: {
      type: 'string',
      required: true,
      description: '收件人',
      example: '蓝健荣'
    },
    // 收货电话
    receiverPhone: {
      type: 'string',
      required: true,
      description: '⼿机号',
      example: '13226047873',
      format: /^1[34578]\d{9}$/
    },
    // 省份
    receiverProvince: {
      type: 'string',
      required: true,
      description: '省份',
      example: '广东省'
    },
    // 城市
    receiverCity: {
      type: 'string',
      required: true,
      description: '城市',
      example: '珠海市'
    },
    // 区/县
    receiverDistrict: {
      type: 'string',
      required: true,
      description: '区/县',
      example: '高新区'
    },
    // 详细地址
    receiverAddress: {
      type: 'string',
      required: true,
      description: '详细地址',
      example: '东岸社区东心街2号'
    },
    // 邮编
    receiverZip: {
      type: 'string',
      required: true,
      description: '邮编地址',
      example: 519000
    }
  }
}
