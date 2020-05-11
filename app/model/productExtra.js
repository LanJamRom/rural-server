'use strict'

module.exports = app => {
  const { DATE, NOW, UUID, UUIDV4, INTEGER } = app.Sequelize
  const ProductExtra = app.model.define(
    'ProductExtra',
    {
      id: {
        type: UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4
      },
      visitNum: {
        type: INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      sales: {
        type: INTEGER,
        defaultValue: 0,
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

  ProductExtra.associate = () => {
    app.model.ProductExtra.belongsTo(app.model.Product, {
      foreignKey: 'product_id',
      as: 'extra',
      onDelete: 'SET NULL'
    })
  }

  ProductExtra.beforeBulkUpdate(extra => {
    extra.attributes.updateTime = NOW
    return extra
  })

  return ProductExtra
}
