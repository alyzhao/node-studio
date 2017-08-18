var User = require('../models/user.js');


exports.loginout = function(req, res) {
	delete req.session.user;
	res.redirect('/');
};

// 用户注册
exports.signup = function(req, res) {
	let user = req.body.user;
	console.log(user);
	User.findOne({name: user.name}, (err, result) => {
		if (err) {
			console.log(err);
		}

		if (result) {
			return res.redirect('./signin');
		} else {
			let userDoc = new User({
				name: user.name,
				password: user.password
			});
			userDoc.save((err, result) => {
				if (err) {
					console.log(err);
				} else {
					res.redirect('/');
				}
			});		
		}
	})
};

// 用户登录
exports.signin = function(req, res) {
	let user = req.body.user;
	User.findOne({name: user.name}, (err, result) => {
		if (err) {
			console.log(err);
		}
		if (!result) {
			return res.redirect('/signup');
		}

		result.comparePassword(user.password, (err, isMatch) => {
			if (err) console.log(err);
			if (isMatch) {
				console.log('password is pass!');
				req.session.user = result; 	// 设置session
				res.redirect('/');
			} else {
				req.session.signinTips = '密码错误';
				res.redirect('/signin');
			}
		})
	})
};

// 用户详情页
exports.userlist = function(req, res) {
	User.fetch((err, users) => {
		if (err) {
			console.log(err);
		} else {
			res.render('userlist', {
				users: users
			})
		}
	})
};

exports.showSignin = function(req, res) {
	signinTips = req.session.signinTips;
	if (req.session.signinTips) {
		delete req.session.signinTips;
	}
	res.render('signin', {
		title:'登录页面',
		signinTips: signinTips
	})
}

exports.showSignup = function(req, res) {
	res.render('signup', {
		title:'注册页面'
	})
}


// 中间件
exports.signinRequired = function(req, res, next) {
	let userSession = req.session.user;
	if (!userSession) {
		console.log('on signin!')
		return res.redirect('/signin');	
	}
	next();
}

exports.roleRequired = function(req, res, next) {
	if (req.session.user.role <= 10) {
		console.log(req.session.user.role);
		console.log('no limits!')
		return res.redirect('/signin');
	}
	next();
}
