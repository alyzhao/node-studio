const userRouter = require('./userRouter')

module.exports = function (app) {
  app.get('/login', (req, res) => {
    res.render('login')
  })

  app.use('/user', userRouter)

  app.get('*', (req, res) => {
    res.render('index')
  })

}