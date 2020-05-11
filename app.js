'use strict'
/**
 * 全局定义
 * @param app
 */
class AppBootHook {
  constructor(app) {
    this.app = app
    app.root_path = __dirname
  }
  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }
  configDidLoad() {
    // Config, plugin files have been loaded.
  }
  async didLoad() {
    // All files have loaded, start plugin here.
    // await this.app.model.ProductExtra.sync({ force: true })
    // await this.app.model.ProductStock.sync({ force: false, alter: true })
    // await this.app.model.CartItem.sync({ force: false, alter: true })
    // await this.app.model.OrderItem.sync({ force: false, alter: true })
    // await this.app.model.Order.sync({ force: false, alter: true })
    // await this.app.model.Cart.sync({ force: false, alter: true })
    // await this.app.model.Product.sync({ force: false, alter: true })
    // await this.app.model.ProductSku.sync({ force: false, alter: true })
    // await this.app.model.ProductSpc.sync({ force: false, alter: true })
    // await this.app.model.ProductExtra.sync({ force: false, alter: true })
    // await this.app.model.ProductStock.sync({ force: false, alter: true })
    // await this.app.model.Shipping.sync({ force: false, alter: true })
  }
  async willReady() {
    // All plugins have started, can do some thing before app ready
  }
  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
    // console.log('========Init Data=========')
    // const ctx = await this.app.createAnonymousContext()
    // await ctx.model.User.remove()
    // await ctx.model.User.create({
    //   mobile: '13611388415',
    //   password: '111111',
    //   realName: '⽼夏'
    // })
  }
  async serverDidReady() {}
  async beforeClose() {
    // Do some thing before app close.
  }
}
module.exports = AppBootHook
