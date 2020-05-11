'use strict'
module.exports = app => {
  const { DATE, INTEGER, UUID, UUIDV4, NOW, STRING, DECIMAL, BOOLEAN } = app.Sequelize
  const CartItem = app.model.define(
    'cartItem',
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      sub_id: {
        type: UUID,
        allowNull: true
      },
      sub_name: {
        type: STRING,
        allowNull: true
      },
      twice_id: {
        type: UUID,
        allowNull: true
      },
      twice_name: {
        type: STRING,
        allowNull: true
      },
      // 加入购物车时的商品价格
      currentUnitPrice: {
        type: DECIMAL(20, 2),
        allowNull: true
      },
      // 改商品规格下的库存
      stock: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      // 数量
      quantity: {
        type: INTEGER(11),
        allowNull: true,
        defaultValue: 1
      },
      // 是否选择， 1已勾选， 0未勾选
      checked: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    }
    // {
    //   indexes: [{ fields: [''] }]
    // }
  )
  CartItem.beforeBulkUpdate(cart_item => {
    cart_item.attributes.updateTime = NOW
    return cart_item
  })
  return CartItem
}
