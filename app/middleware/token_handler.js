'use strict'
module.exports = () => {
  return async function (ctx, next) {
    if (ctx.request.url.indexOf('/v2') !== -1) {
      const accessToken = ctx.request.header.authorization
      if (!accessToken) {
        ctx.throw(402)
      }
      const User = await ctx.model.User.findByPk(ctx.state.user.data.id)
      const cart = await User.getCart()
      if (!cart) {
        await User.createCart()
      }
      ctx.user = User
    }
    await next()
  }
}
