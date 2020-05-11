'use strict'

module.exports = app => {
  const { STRING, DATE, NOW, UUID, UUIDV4, INTEGER } = app.Sequelize
  const ProductSku = app.model.define(
    'ProductSku',
    {
      id: {
        type: UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4
      },
      sku_name: {
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
    },
    {
      indexes: [{ fields: ['product_spu_id'] }]
    }
  )

  ProductSku.associate = () => {
    ProductSku.belongsTo(app.model.ProductSpu)
  }

  ProductSku.beforeBulkUpdate(sku => {
    sku.attributes.updateTime = NOW
    return sku
  })

  return ProductSku
}
