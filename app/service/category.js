'use strict'

const { Service } = require('egg')

class CategoryService extends Service {
  // TODO: 后台接口

  /**
   * 新建分类
   * @param {Object} payload 载荷
   */
  async create(payload) {
    const { ctx } = this
    if (payload.parentId) {
      const category = await ctx.model.Category.findByPk(payload.parentId)
      !category && ctx.throw(404)
      const dto = payload
      delete dto.parentId
      await category.createSecondCategory(dto)
    } else {
      await ctx.model.Category.create(payload)
    }
    return
  }

  /**
   * 删除分类
   * @param {Array} ids id数组集合
   */
  async delete(ids) {
    const { ctx, app } = this
    const { Op } = app.Sequelize
    await ctx.model.Category.destroy({
      where: { id: { [Op.in]: ids } }
    })
  }

  /**
   * 给商品添加一个分类标签
   * @param {String} id 商品id
   * @param {String} category_id 二级分类id
   */
  async prod_set_category(id, category_id) {
    const { ctx } = this
    const product = await ctx.model.Product.findByPk(id)
    const category = await ctx.model.SecondCategory.findByPk(category_id)
    await product.setSecondCategory(category)
  }

  // TODO: 客户端接口

  async index() {
    const { ctx } = this
    const data = ctx.model.Category.findAll({
      attributes: ['id', 'name', 'status'],
      include: [
        {
          order: [['sort_order']],
          attributes: ['id', 'name', 'status', 'describeImg'],
          model: ctx.model.SecondCategory
        }
      ],
      order: [['sort_order']]
    })
    return data
  }
}

module.exports = CategoryService
