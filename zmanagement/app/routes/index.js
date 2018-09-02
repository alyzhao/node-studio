module.exports = function (app) {
  app.get('/login', (req, res) => {
    res.render('login')
  })

  app.get('*', (req, res) => {
    res.render('index')
  })
}