var Movie = require('../models/movies.js');
var Category = require('../models/category.js')

	// 路由, 首页, index
exports.index = function(req, res) {
	Category
		.find({})
		.populate({path: 'movies', options: {limit: 5}})
		.exec(function(err, categories) {
			if (err) {
				console.log(err);
			}
			res.render('index', {
				title: '首页',
				categories: categories
			})
		})
};

