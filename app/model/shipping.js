'use strict'
module.exports = app => {
  const { STRING, DATE, UUID, UUIDV4, NOW, BOOLEAN } = app.Sequelize
  const Shipping = app.model.define(
    'shipping',
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
      },
      // 收货姓名
      receiverName: {
        type: STRING(20),
        allowNull: false
      },
      // 收货电话
      receiverPhone: {
        type: STRING(20),
        allowNull: false
      },
      // 省份
      receiverProvince: {
        type: STRING(20),
        allowNull: false
      },
      // 城市
      receiverCity: {
        type: STRING(20),
        allowNull: false
      },
      // 区/县
      receiverDistrict: {
        type: STRING(20),
        allowNull: false
      },
      // 详细地址
      receiverAddress: {
        type: STRING(100),
        allowNull: false
      },
      // 邮编
      receiverZip: {
        type: STRING(6),
        allowNull: false
      },
      // 优先级
      default: {
        type: BOOLEAN,
        defaultValue: false
      },
      fullAddress: {
        type: STRING(200),
        get() {
          const province = this.getDataValue('receiverProvince')
          const city = this.getDataValue('receiverCity')
          const area = this.getDataValue('receiverDistrict')
          const street = this.getDataValue('receiverAddress')
          return `${province}-${city}-${area}-${street}`
        }
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
  Shipping.associate = () => {
    Shipping.belongsTo(app.model.User, { foreignKey: 'user_id' })
    // app.model.UserShipping.belongsTo(app.model.User, { foreignKey: 'user_id' })
  }

  Shipping.beforeBulkUpdate(shipping => {
    shipping.attributes.updateTime = NOW
    return shipping
  })

  return Shipping
}
