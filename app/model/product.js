'use strict'
const { ON_SALE } = require('../common/product')
module.exports = app => {
  const { INTEGER, STRING, DECIMAL, UUID, UUIDV4, NOW } = app.Sequelize

  const Product = app.model.define('product', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    // 商品名称
    name: {
      type: STRING(100),
      allowNull: false
    },
    brand: {
      type: STRING(30),
      allowNull: false
    },
    // 商品副标题
    subtitle: {
      type: STRING(200),
      allowNull: true
    },
    // 产品主图，url相对地址
    mainImage: {
      type: STRING(500),
      allowNull: true,
      get() {
        const currValue = this.getDataValue('mainImage')
        return `https://img.lanjianrong.com${currValue}`
      }
    },
    // swiper图片地址，json格式，扩展用
    subImages: {
      type: app.Sequelize.JSON,
      allowNull: true,
      get() {
        const currValueArr = this.getDataValue('subImages')
        return (
          currValueArr &&
          currValueArr.map(item => {
            return `https://img.lanjianrong.com${item}`
          })
        )
      }
    },
    // 图文详情
    imageDetails: {
      type: app.Sequelize.JSON,
      allowNull: true,
      get() {
        const currValueArr = this.getDataValue('imageDetails')
        return (
          currValueArr &&
          currValueArr.map(item => {
            return `https://img.lanjianrong.com${item}`
          })
        )
      }
    },
    price: {
      type: DECIMAL(20, 2),
      allowNull: false
    },
    // 库存
    stock: {
      type: INTEGER(11),
      allowNull: false
    },
    // 商品状态 1-在售，2-下架，3-删除
    status: {
      type: INTEGER(6),
      allowNull: true,
      defaultValue: ON_SALE.CODE
    },
    createTime: {
      type: app.Sequelize.DATE,
      allowNull: false,
      defaultValue: NOW
    },
    updateTime: {
      type: app.Sequelize.DATE,
      allowNull: false,
      defaultValue: NOW
    }
  })
  Product.associate = () => {
    Product.belongsTo(app.model.SecondCategory, {
      foreignKey: 'secondCategoryId',
      targetKey: 'id',
      onDelete: 'SET NULL'
    })
    Product.belongsToMany(app.model.Cart, {
      through: app.model.CartItem,
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    })
    Product.belongsToMany(app.model.Order, {
      through: app.model.OrderItem,
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    })
    // 额外属性
    Product.hasOne(app.model.ProductExtra, { foreignKey: 'product_id', as: 'extra' })
    // 规格
    Product.hasMany(app.model.ProductSpc)
    // Spu
    Product.hasMany(app.model.ProductSpu)
    // 价格 库存
    Product.hasMany(app.model.ProductStock, { foreignKey: 'prod_id', sourceKey: 'id' })
  }
  // ProductModel.belongsTo(app.model.categoryModel)
  Product.beforeBulkUpdate(product => {
    product.attributes.updateTime = NOW
    return product
  })
  return Product
}
