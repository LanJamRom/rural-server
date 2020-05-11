'use strict'

module.exports = app => {
  const { STRING, DATE, NOW, UUID, UUIDV4 } = app.Sequelize
  const ProductSpu = app.model.define('ProductSpu', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    spu_name: {
      type: STRING,
      allowNull: false
    },
    createTime: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW
    },
    updateTime: {
      type: DATE,
      allowNull: false,
      defaultValue: NOW
    }
  })
  ProductSpu.associate = () => {
    ProductSpu.hasMany(app.model.ProductSku)
  }
  ProductSpu.beforeBulkUpdate(spu => {
    spu.attributes.updateTime = NOW
    return spu
  })

  return ProductSpu
}
