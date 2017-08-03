const express = require('express');
const path = require('path');
const _ = require('underscore');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node',{useMongoClient:true});
mongoose.Promise = global.Promise;  
var Movie = require('./models/movies.js');


const port = process.env.PORT || 3000;
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({extended: false}));
app.use(serveStatic('bower_components'));
app.listen(port);

console.log('app started on port ' + port);

app.get('/', (req, res) => {
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

app.get('/movie/:id', (req, res) => {
	let id = req.params.id;
	Movie.findById(id, function(err, movie) {
		res.render('detail', {
			title: 'imooc' + movie.title,
			movie: movie
		})
	});
});

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
	let id = req.body.movie._id;
	let movieObj = req.body.movie;
	let _movie;

	if (id != 'undefined') {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err);
			}

			_movie = _.extend(movie, movieObj);
			_movie.save(function(err, movie) {
				if (err) {
					console.log(err);
				}
				res.redirect('/movie/' + movie._id);
			})
		})
	} else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		});

		_movie.save(function(err, movie) {
			if (err) {
				console.log(err);
			}
			res.redirect('/movie/' + movie._id);
		});
	}
})


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


