'use strict'
module.exports = (app) => {
  const { STRING, UUID, UUIDV4, DATE, NOW } = app.Sequelize
  const User = app.model.define('user', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: 'column'
    },
    phone: {
      type: STRING(11),
      unique: 'column'
    },
    username: {
      type: STRING(30),
      defaultValue: Math.random().toString(36).substr(2) + Date.now().toString()
    },
    avatar: {
      type: STRING
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
  User.associate = () => {
    User.hasMany(app.model.Shipping)
    User.hasOne(app.model.Cart)
    User.hasMany(app.model.Order)
  }
  User.beforeBulkUpdate((user) => {
    user.attributes.updateTime = new Date()
    return user
  })

  return User
}
