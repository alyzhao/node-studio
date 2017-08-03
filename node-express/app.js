const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(serveStatic('bower_components'));
app.listen(port);

console.log('app started on port ' + port);

app.get('/', (req, res) => {
	res.render('index', {
		title: 'node 首页',
		movies: [{
			title: '铁甲钢拳',
			_id: 1,
			poster: 'http://img.movie.kanimg.kankan.com/168x235/975/1503b2e8e2b7346d860c5ac84a05bb38.jpg'
		},{
			title: '铁甲钢拳',
			_id: 1,
			poster: 'http://img.movie.kanimg.kankan.com/168x235/975/1503b2e8e2b7346d860c5ac84a05bb38.jpg'
		},{
			title: '铁甲钢拳',
			_id: 1,
			poster: 'http://img.movie.kanimg.kankan.com/168x235/975/1503b2e8e2b7346d860c5ac84a05bb38.jpg'
		},{
			title: '铁甲钢拳',
			_id: 1,
			poster: 'http://img.movie.kanimg.kankan.com/168x235/975/1503b2e8e2b7346d860c5ac84a05bb38.jpg'
		}]
	})
});

app.get('/movie/:id', (req, res) => {
	res.render('detail', {
		title: 'node 详情页',
		movie: {
			doctor: '导演',
			country: '美国',
			title: '铁甲钢拳',
			year: 2015,
			poster: 'http://www/baidu.com',
			language: '英语',
			flash: 'http://117.148.168.1/mvvideo10.meitudata.com/584ec0ea2baf39448.mp4',
			summary: '《铁甲钢拳》是一部由梦工厂影业制作，迪士尼影业发行的科幻电影。影片由史蒂文·斯皮尔伯格监制，肖恩·利维执导，休·杰克曼、达科塔·高尤、伊万杰琳·莉莉和安东尼·麦凯等联袂出演。影片于2011年11月8日在中国内地上映。电影的故事是围绕未来世界的机器人拳击比赛展开的，讲述了一个饱含动作、梦想与亲情的励志故事。'
		}
	})
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

app.get('/admin/list', (req, res) => {
	res.render('list', {
		title: 'node 列表页',
		movie: [{
			doctor: '导演',
			country: '美国',
			title: '铁甲钢拳',
			year: 2015,
			language: '英语',
			flash: 'http://117.148.168.1/mvvideo10.meitudata.com/584ec0ea2baf39448.mp4',
			summary: '《铁甲钢拳》是一部由梦工厂影业制作，迪士尼影业发行的科幻电影。影片由史蒂文·斯皮尔伯格监制，肖恩·利维执导，休·杰克曼、达科塔·高尤、伊万杰琳·莉莉和安东尼·麦凯等联袂出演。影片于2011年11月8日在中国内地上映。电影的故事是围绕未来世界的机器人拳击比赛展开的，讲述了一个饱含动作、梦想与亲情的励志故事。'
		}]
	})
});


