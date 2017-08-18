var Movie = require('../models/movies.js');




	// 路由, 首页, index
exports.index = function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err);
		}
		res.render('index', {
			title: 'node 首页',
			movies: movies
		})
	})
};

