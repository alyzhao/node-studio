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
			// console.log(categories);
			res.render('index', {
				title: '首页',
				categories: categories
			})
		})
};

exports.search = function(req, res) {
	let catId = req.query.cat,
		page = req.query.p,
		pageSize = 2,
		index = (page - 1) * pageSize,
		q = req.query.q;

	if (catId) {
		Category
		.find({_id: catId})
		.populate({
			path: 'movies',
			select: 'title poster',
			options: {limit: pageSize, skip: index}	// skip表示跳过的记录数, 具体的看API
		})
		.exec(function(err, categories) {
			// console.log(categories);
			if (err) console.log(err);
			// Category.count({})
			Category.findOne({_id: catId}, (err, cat) => {
				let totalPage = Math.ceil(cat.movies.length / 2);
				// console.log(totalPage);
				res.render('results', {
					title: '结果列表页',
					keyword: categories[0].name,
					currentPage: page,
					query: 'cat=' + catId,
					totalPage: totalPage,		// Math.ceil(Number) 向上取整
					category: categories[0]
				});
			})
		})
	} else {
		let regMovie = new RegExp(q, 'i');
		Movie
		.find({title: regMovie})
		.limit(pageSize)
		.skip(index)
		.exec((err, movies) => {
			if (err) console.log(err);
			Movie.count({title: regMovie}, (err, count) => {
				if (err) console.log(err);
				// console.log(movies);
				let totalPage = Math.ceil(count / 2);
				res.render('results', {
					title: '关键词查找结果',
					keyword: q,
					currentPage: page,
					query: 'q=' + q,
					totalPage: totalPage,		// Math.ceil(Number) 向上取整
					movies: movies
				})			
			})
		})
	}

};

