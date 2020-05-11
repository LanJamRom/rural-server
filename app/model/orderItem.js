'use strict'

module.exports = app => {
  const { INTEGER, DATE, DECIMAL, UUID, UUIDV4, NOW, STRING } = app.Sequelize
  const OrderItem = app.model.define('orderItem', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
      // autoIncrement: true,
    },
    order_order_num: {
      type: UUID,
      allowNull: false
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
    shipping_id: {
      type: UUID,
      allowNull: false
    },
    // 生成订单时的商品单价，单位元，保留2位小数
    currentUnitPrice: {
      type: DECIMAL(20, 2),
      allowNull: true
    },
    // 商品数量
    quantity: {
      type: INTEGER(10),
      allowNull: true
    },
    // 商品总价，单位元，保留2位小数
    totalPrice: {
      type: DECIMAL(20, 2),
      allowNull: true
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

  OrderItem.beforeBulkUpdate(orderItem => {
    orderItem.attributes.updateTime = NOW
    return orderItem
  })
  return OrderItem
}
