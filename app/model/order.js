'use strict'
const { NO_PAY } = require('../common/orderStatus')
const { ONLINE_PAY } = require('../common/paymentType')
module.exports = app => {
  const { INTEGER, DATE, STRING, DECIMAL, UUID, UUIDV4, NOW } = app.Sequelize
  const Order = app.model.define(
    'order',
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      // 订单号
      orderNum: {
        type: STRING,
        allowNull: false,
        defaultValue: Date.now(NOW).toString() + Math.random().toString().substr(3, 5)
      },
      // 实际付款金额，单位元，保留2位小数
      payment: {
        type: DECIMAL(20, 2),
        allowNull: true
      },
      // 支付类型， 1-在线支付
      paymentType: {
        type: INTEGER(4),
        allowNull: true,
        defaultValue: ONLINE_PAY.CODE
      },
      // 运费，单位元
      postage: {
        type: INTEGER(10),
        allowNull: true,
        defaultValue: 0
      },
      // 订单状态 0已取消 10未支付 20已支付 40已发货 50订单完成 60订单关闭
      status: {
        type: INTEGER(10),
        allowNull: true,
        defaultValue: NO_PAY.CODE
      },
      // 支付时间
      paymentTime: {
        type: DATE,
        allowNull: true
      },
      // 发货时间
      sendTime: {
        type: DATE,
        allowNull: true
      },
      // 交易完成时间
      endTime: {
        type: DATE,
        allowNull: true
      },
      // 交易关闭时间
      closeTime: {
        type: DATE,
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
    },
    {
      indexes: [{ fields: ['user_id'] }, { fields: ['order_num'] }]
    }
  )
  Order.associate = () => {
    Order.belongsTo(app.model.User, { foreignKey: 'user_id' })
    Order.belongsToMany(app.model.Product, {
      through: app.model.OrderItem,
      sourceKey: 'orderNum',
      onUpdate: 'SET NULL' // 级联更新置null，为了使级联删除起效
    })
  }
  Order.beforeBulkUpdate(order => {
    order.attributes.updateTime = NOW
    return order
  })
  return Order
}
