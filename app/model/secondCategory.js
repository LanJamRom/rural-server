'use strict'
module.exports = app => {
  const { INTEGER, STRING, DATE, UUID, UUIDV4, NOW } = app.Sequelize

  const SecondCategory = app.model.define(
    'secondCategory',
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      // 类别名称
      name: {
        type: STRING(50),
        allowNull: false
      },
      // 描述图片
      describeImg: {
        type: STRING(500),
        allowNull: false,
        get() {
          const currValue = this.getDataValue('describeImg')
          return `https://img.lanjianrong.com${currValue}`
        }
      },

      // 类别状态1-正常，2-废弃
      status: {
        type: INTEGER(1),
        allowNull: true,
        defaultValue: 1
      },
      // 排序编号，同类展示顺序，相等则自然排序
      sortOrder: {
        type: INTEGER(4),
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
      indexes: [{ fields: ['category_id'] }]
    }
  )
  SecondCategory.associate = () => {
    SecondCategory.belongsTo(app.model.Category)
    SecondCategory.hasMany(app.model.Product, { onDelete: 'SET NULL' })
  }
  SecondCategory.beforeBulkUpdate(category => {
    category.attributes.updateTime = NOW
    return category
  })
  return SecondCategory
}
