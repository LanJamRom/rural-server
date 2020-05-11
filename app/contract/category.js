'use strict'

module.exports = {
  createCategoryRequest: {
    parentId: {
      type: 'string',
      required: false,
      description: '创建一级分类不传，二级分类必须传',
      example: '2b6a91cc-8057-4145-80db-c521e3488835'
    },
    name: {
      type: 'string',
      required: true,
      description: '类别名称'
    },
    status: {
      type: 'integer',
      description: '类别状态：1-正常，2-废弃',
      enum: [1, 2],
      required: false
    },
    sortOrder: {
      type: 'integer',
      required: false,
      description: '排序编号，同类展示顺序，相等则自然排序',
      example: 0
    },
    describe_img: {
      type: 'string',
      required: false,
      description: '二级分类描述图',
      example: 'string'
    }
  },
  setCategoryRequest: {
    id: {
      type: 'string',
      required: true,
      description: '商品id'
    },
    category_id: {
      type: 'string',
      required: true,
      description: '二级分类id'
    }
  }
}
