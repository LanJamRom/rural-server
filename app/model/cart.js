'use strict'
module.exports = app => {
  const { DATE, UUID, UUIDV4, NOW } = app.Sequelize
  const Cart = app.model.define(
    'cart',
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
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
      indexes: [{ fields: ['user_id'] }]
    }
  )
  Cart.associate = () => {
    Cart.belongsTo(app.model.User, { foreignKey: 'user_id' })
    Cart.belongsToMany(app.model.Product, { through: app.model.CartItem, onDelete: 'SET NULL', onUpdate: 'SET NULL' })
  }
  Cart.beforeBulkUpdate(cart => {
    cart.attributes.updateTime = NOW
    return cart
  })
  return Cart
}
