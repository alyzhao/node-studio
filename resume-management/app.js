const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const serveStatic = require('serve-static')  // 这些是中间件
const app = express()
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session); // 引入connect-mongo中间件存储session到mongodb, 中间件已经分离所以参数为session

const config = require('./app/config')

app.set('views', path.join(__dirname, './app/views'))
app.set('view engine', 'ejs')

// 存储session
if (process.env.NODE_ENV === 'production') {

}
const dbUrl = process.env.NODE_ENV === 'production' ?
  `mongodb://${config.mongoDB.user}:${config.mongoDB.password}@${config.mongoDB.host}:${config.mongoDB.port}/resume` :
  'mongodb://localhost/resume';
// mongodb
mongoose.connect(dbUrl, { useNewUrlParser: true }, (err, res) => {
  if (!err) {
    console.log('connect mongodb success!')
  } else {
    console.log('connect mongodb failed!')
  }
});
mongoose.Promise = global.Promise;  
app.use(cookieParser());
app.use(session({
  secret: 'zmanagement',
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'  // 存储到mongodb的collection名
  }),
  resave: true,
  saveUninitialized: true
}));


// webpack相关
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const compiler = webpack(webpackConfig)
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))
  app.use(webpackHotMiddleware(compiler, {
    log: console.log()
  }))
} else {
  morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
  })
}

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
// app.use(session)

app.use(serveStatic(path.join(__dirname, 'public')))     // 加载静态目录时在这儿查找

require('./app/routes')(app)

const port = process.env.PORT || 3000  // 获取全局变量PORT的值, 在命令行下 PORT = 5200 node app.js, 即可赋值


app.listen(port);

console.log('app started on port ' + port)
