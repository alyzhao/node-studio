const express = require('express');
const path = require('path');
const mongoose = require('mongoose');



const dbUrl = 'mongodb://localhost/node';
// mongodb
mongoose.connect(dbUrl, {useMongoClient:true});
mongoose.Promise = global.Promise;  

// express4 独立的中间件
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');		// 用来监听请求的中间件

const mongoStore = require('connect-mongo')(session);	// 引入connect-mongo中间件存储session到mongodb, 中间件已经分离所以参数为session

const port = process.env.PORT || 3000; 	// 获取全局变量PORT的值, 在命令行下 PORT = 5200 node app.js, 即可赋值
const serveStatic = require('serve-static');	// 这些是中间件
const app = express();

// post参数解析
const bodyParser = require('body-parser');		
app.use(bodyParser.urlencoded({extended: true}));		// 使用中间件

// 存储sesion
app.use(cookieParser());
app.use(session({
	secret: 'node-express',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'	// 存储到mongodb的collection名
	}),
	resave: true,
	saveUninitialized: true
}));	



app.set('views', './app/views/pages');	// 查找动态文件的目录
app.set('view engine', 'jade');
app.locals.moment = require('moment');

// 开发环境的配置
if (app.get('env') === 'development') {
	app.set('showStackEror', true);
	app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
	app.locals.pretty = true;	// 不压缩html
	mongoose.set('debug', true);
}
	
require('./config/router')(app); 	// 加载路由

app.use(serveStatic('public')); 		// 加载静态目录时在这儿查找
app.listen(port);

console.log('app started on port ' + port);





