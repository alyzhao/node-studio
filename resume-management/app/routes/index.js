const SessionManage = require('./SessionManage')
const resumeRouter = require('./resumeRouter')
const userRouter = require('./userRouter')
const viewerRouter = require('./viewerRouter')

module.exports = function (app) {
  app.get('/login', (req, res) => {
    res.render('login')
  })

  app.use('/viewer', viewerRouter)

  app.use('/user', userRouter)

  app.use('/resume', SessionManage.checkSessionForDataRequest, resumeRouter)

  // app.use('/pro', SessionManage.checkSessionForDataRequest, productsRouter)

  // app.use('/client', clientRouter)

  // app.use('/user', userRouter)

  app.get('*', SessionManage.checkSessionForPageRequest, (req, res) => {
    res.render('index')
  })

}