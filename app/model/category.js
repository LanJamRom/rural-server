'use strict'
module.exports = (app) => {
  const { INTEGER, STRING, DATE, UUID, UUIDV4, NOW } = app.Sequelize

  const Category = app.model.define('category', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    // 类别名称
    name: {
      type: STRING(50),
      allowNull: true
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
  })
  Category.associate = () => {
    Category.hasMany(app.model.SecondCategory)
  }
  Category.beforeBulkUpdate((category) => {
    category.attributes.updateTime = NOW
    return category
  })
  return Category
}
