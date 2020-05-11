'use strict'

module.exports = {
  createProductRequest: {
    name: {
      type: 'string',
      required: true,
      description: '商品名称',
      example: '芡实米鸡头米茨实新鲜欠实芡实干'
    },
    subtitle: {
      type: 'string',
      required: false,
      description: '商品副标题',
      example: '拍下19.9元 单笔订单实付满19元买1送1'
    },
    mainImage: {
      type: 'string',
      required: true,
      description: '产品主图，url绝对地址',
      example: '/rural/1586594664883.jpg'
    },
    subImages: {
      type: 'array',
      required: true,
      description: 'swiper轮换图',
      itemType: 'string',
      example: [
        '/rural/158659466488310.jpg',
        '/rural/15865946648835.gif',
        '/rural/15865946648836.jpg',
        '/rural/15865946648837.jpg',
        '/rural/15865946648838.jpg',
        '/rural/15865946648839.gif',
        '/rural/1586594664884.gif'
      ]
    },
    imageDetails: {
      type: 'array',
      required: true,
      description: '图片并茂',
      itemType: 'string'
    },
    price: {
      type: 'number',
      required: true,
      description: '商品单价',
      example: 25
    },
    stock: {
      type: 'number',
      required: true,
      description: '库存',
      example: 200
    },
    brand: {
      type: 'string',
      required: true,
      description: '品牌',
      example: '福东海'
    }
  },
  updateProductRequest: {
    id: {
      type: 'string',
      required: true,
      description: '商品id',
      example: 'ab98fa30-d8d8-4a32-b261-3252195ce158'
    },
    name: {
      type: 'string',
      required: true,
      description: '商品名称',
      example: '芡实米鸡头米茨实新鲜欠实芡实干'
    },
    subtitle: {
      type: 'string',
      required: true,
      description: '商品副标题',
      example: '拍下19.9元 单笔订单实付满19元买1送1'
    },
    mainImage: {
      type: 'string',
      required: true,
      description: '产品主图，url相对地址',
      example: '1586594664883.jpg'
    },
    subImages: {
      type: 'array',
      required: true,
      description: '图片地址，json格式，扩展用',
      itemType: 'string',
      example: [
        '/rural/158659466488310.jpg',
        '/rural/15865946648835.gif',
        '/rural/15865946648836.jpg',
        '/rural/15865946648837.jpg',
        '/rural/15865946648838.jpg',
        '/rural/15865946648839.gif',
        '/rural/1586594664884.gif'
      ]
    },
    detail: {
      type: 'string',
      required: false,
      description: '商品详情'
    },
    price: {
      type: 'number',
      required: true,
      description: '商品单价',
      example: 25
    },
    stock: {
      type: 'number',
      required: true,
      description: '库存',
      example: 200
    },
    brand: {
      type: 'string',
      required: true,
      description: '品牌',
      example: '福东海'
    }
  },
  createProductSpuRequest: {
    id: {
      type: 'string',
      description: '商品id',
      required: true
    },
    spu_name: {
      type: 'string',
      description: 'sku名称',
      required: true
    }
  },
  createProductSkuRequest: {
    spuId: {
      type: 'string',
      description: '商品spuId',
      required: true
    },
    sku_name: {
      type: 'string',
      description: 'sku名称',
      required: true
    }
  },
  createProductSpcRequest: {
    id: {
      type: 'string',
      description: '商品id',
      required: true
    },
    spc_name: {
      type: 'string',
      description: '参数名称',
      required: true
    },
    spc_value: {
      type: 'string',
      description: '参数值',
      required: true
    }
  }
}
