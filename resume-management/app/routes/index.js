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

  app.get('*', SessionManage.checkSessionForPageRequest, (req, res) => {
    res.render('index')
  })

}