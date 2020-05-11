'use strict'

module.exports = app => {
  const { STRING, UUID, UUIDV4, DATE, NOW } = app.Sequelize

  const ProductSpc = app.model.define(
    'ProductSpc',
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      spc_name: {
        type: STRING(30),
        allowNull: false
      },
      spc_value: {
        type: STRING(30),
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
      indexes: [{ fields: ['product_id'] }]
    }
  )

  ProductSpc.associate = () => {
    ProductSpc.belongsTo(app.model.Product)
  }
  ProductSpc.beforeBulkUpdate(spc => {
    spc.attributes.updateTime = NOW
    return spc
  })
  return ProductSpc
}
