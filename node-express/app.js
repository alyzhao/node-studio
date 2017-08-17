const express = require('express');
const path = require('path');
const _ = require('underscore');

const cookieParser = require('cookie-parser');
const session = require('express-session');


// mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node',{useMongoClient:true});
mongoose.Promise = global.Promise;  
var Movie = require('./models/movies.js');
var User = require('./models/user.js');


const port = process.env.PORT || 3000; 	// 获取全局变量PORT的值, 在命令行下 PORT = 5200 node app.js, 即可赋值
const serveStatic = require('serve-static');	// 这些是中间件
const bodyParser = require('body-parser');		
const app = express();

app.set('views', './views/pages');	// 查找动态文件的目录
app.set('view engine', 'jade');
app.locals.moment = require('moment');

app.use(cookieParser())
app.use(session({
	secret: 'node-express'
}));

app.use(bodyParser.urlencoded({extended: true}));		// 使用中间件
app.use(serveStatic('public')); 		// 加载静态目录时在这儿查找
app.listen(port);

console.log('app started on port ' + port);

// 路由, 首页, index
app.get('/', (req, res) => {
	console.log(req.session);
	console.log(req.session.user);
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err);
		}
		res.render('index', {
			title: 'node 首页',
			movies: movies
		})
	})
});

// 用户注册
app.post('/user/signup/', (req, res) => {
	let user = req.body.user;
	console.log(user);
	User.findOne({name: user.name}, (err, result) => {
		if (!err && result) {
			res.redirect('/');
		} else {
			let userDoc = new User({
				name: user.name,
				password: user.password
			});
			userDoc.save((err, result) => {
				if (err) return err;
				console.log(result);
				res.redirect('/admin/userlist/')
			})				
		}
	})
});

// 用户登录
app.post('/user/signin/', (req, res) => {
	let user = req.body.user;
	User.findOne({name: user.name}, (err, result) => {
		if (!err && result) {
			result.comparePassword(user.password, (err, isMatch) => {
				if (!err && isMatch) {
					console.log('password is pass!');
					req.session.user = result; 	// 设置session
					res.redirect('/');
				} else {
					console.log('password is wrong!');
				}
			})
		} else {
			console.log('no user!')
		}
	})

})

// 详情页, detail 
app.get('/movie/:id', (req, res) => {
	let id = req.params.id;		// 获得参数
	Movie.findById(id, function(err, movie) {
		res.render('detail', {
			title: 'imooc' + movie.title,
			movie: movie
		})
	});
});

// 用户详情页
app.get('/admin/userlist', (req, res) => {
	User.fetch((err, users) => {
		if (err) {
			console.log(err);
		} else {
			res.render('userlist', {
				users: users
			})
		}
	})
});

// 后台路由, 添加admin
app.get('/admin/movie', (req, res) => {
	res.render('admin', {
		title: 'node 后台',
		movie: {
			title: '',
			doctor: '',
			country: '',
			title: '',
			year: '',
			poster: '',
			language: '',
			flash: '',
			summary: ''
		}
	})
});

// 删除记录
app.delete('/admin/delete/', (req, res) => {
	let id = req.query.id;
	console.log(id);
	Movie.remove({_id: id}, (err, result) => {
		let success = 1;
		if (err) {
			console.log(err);
			succes = 0;
		} else {
			console.log(result);
		}
		res.json({success: success});
	})
})

// 
app.get('/admin/update/:id', function(req, res) {
	let id = req.params.id;
	console.log(id);

	if (id) {
		Movie.findById(id, function(err, movie) {
			console.log(movie);
			res.render('admin', {
				title: 'node 后台更新页',
				movie: movie	
			})
		})
	}

})

// admin post movie
app.post('/admin/movie/new', function(req, res) {
	// post过来的是一个对象movie
	// if (req.body.movie.hasOwnProperty('_id')) {
	// id = req.body.movie._id;	
	// }
	let movieObj = req.body.movie;
	console.log('post 参数:')
	console.log(movieObj);
	let id = movieObj._id; 		// id是以字符串的形式传递的
	console.log("电影id: " + id);
	let _movie;

	if (id == 'undefined') {
		console.log('添加影片');

		let newRecord = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			language: movieObj.language,
			country: movieObj.country,
			summary: movieObj.summary,
			flash: movieObj.flash,
			poster: movieObj.poster,
			year: movieObj.year
		})

		newRecord.isNew = true;

		newRecord.save((err, document) => {
			if (err) {
				console.log(err)
			} else {
				res.redirect('/movie/' + document._id);
			}
		})

	} else {
		console.log('修改影片');
		/* 如果直接这样修改会使得meta失去createAt
		let _movie = _.extend({}, movieObj);
		_movie.meta = {updateAt: Date.now()}
		Movie.update({_id: id}, _movie, (err, num) => {
			if (err) {
				console.log(err);
			} else {
				console.log(num); 	// 返回一个对象里面具体参数看API, 不是修改的行数
			}
		})*/
		Movie.findById(id, (err, movie) => {
			let _movie = _.extend(movie, movieObj);
			_movie.isNew = false;
			_movie.save((err, result) => {
				if (!err) {
					console.log('update success');
					res.redirect('/movie/' + id);
				}
			})
		})

	}

	// if (id) {
	// 	Movie.findById(id, function(err, movie) {
	// 		if (err) {
	// 			console.log(err);
	// 		}

	// 		_movie = _.extend(movie, movieObj);		// 复制movieObj对象中的所有属性覆盖到movie对象上，并且返回 movie 对象. 复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复).
	// 		_movie.save(function(err, movie) {
	// 			if (err) {
	// 				console.log(err);
	// 			}
	// 			res.redirect('/movie/' + movie._id);
	// 		})
	// 	})
	// } else {
	// 	_movie = new Movie({
	// 		doctor: movieObj.doctor,
	// 		title: movieObj.title,
	// 		country: movieObj.country,
	// 		language: movieObj.language,
	// 		year: movieObj.year,
	// 		poster: movieObj.poster,
	// 		summary: movieObj.summary,
	// 		flash: movieObj.flash
	// 	});

	// 	_movie.save(function(err, movie) {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 		res.redirect('/movie/' + movie._id);
	// 	});
	// }
})

// 
app.get('/admin/list', (req, res) => {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err);
		}
		res.render('list', {
			title: 'node 列表页',
			movies: movies
		})
	});
});


