'use strict'

module.exports = app => {
  const { UUID, INTEGER, STRING } = app.Sequelize
  const ProductStock = app.model.define(
    'ProductStock',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      prod_id: {
        type: UUID,
        allowNull: false
      },
      subId: {
        type: UUID,
        allowNull: true
      },
      subName: {
        type: STRING,
        allowNull: true
      },
      twiceId: {
        type: UUID,
        allowNull: true
      },
      twiceName: {
        type: STRING,
        allowNull: true
      },
      stock: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      price: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      indexes: [{ fields: ['prod_id'] }]
    }
  )

  ProductStock.associate = () => {
    ProductStock.belongsTo(app.model.Product, { foreignKey: 'prod_id', targetKey: 'id' })
  }
  return ProductStock
}
