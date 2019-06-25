const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')  // 这些是中间件
const app = express()

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

app.use(serveStatic(path.join(__dirname, 'static')))     // 加载静态目录时在这儿查找
app.get('*', (req, res) => {
  res.render('index')
})

const port = process.env.PORT || 3000  // 获取全局变量PORT的值, 在命令行下 PORT = 5200 node app.js, 即可赋值

app.listen(port);

console.log('app started on port ' + port)
