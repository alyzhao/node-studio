const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const serveStatic = require('serve-static')  // 这些是中间件
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
    morgan('combined', {
      skip: function (req, res) { return res.statusCode < 400 }
    })
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())
app.use(session)

// app.use(express.static(path.join(__dirname, 'frontend', 'public')))

require('./app/routes')(app)

const port = process.env.PORT || 3000;  // 获取全局变量PORT的值, 在命令行下 PORT = 5200 node app.js, 即可赋值

app.use(serveStatic('public'));     // 加载静态目录时在这儿查找

app.listen(port);
