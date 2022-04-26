const userRouter = require('./user')
const orderRouter = require('./order')
const productRouter = require('./product')

function route(app) {
  app.use('/auth', userRouter)
  app.use('/product', productRouter)
  app.use('/order', orderRouter)
}

module.exports = route