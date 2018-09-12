const userRouter = require('./userRouter')
const productsRouter = require('./productsRouter')
const SessionManage = require('./SessionManage')
const clientRouter = require('./clientRouter')

module.exports = function (app) {
  app.get('/login', (req, res) => {
    res.render('login')
  })

  app.use('/pro', SessionManage.checkSessionForDataRequest, productsRouter)

  app.use('/client', clientRouter)

  app.use('/user', userRouter)

  app.get('*', SessionManage.checkSessionForPageRequest, (req, res) => {
    res.render('index')
  })

}