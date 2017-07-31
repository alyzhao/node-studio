// const spider = require('./spider');
// const cheerio = require('cheerio');

// spider.getCourse(728)
// 	.then((value) => {
// 		console.log(JSON.stringify(value));
// 	})
// 	.catch((err) => {
// 		console.log(err.message);
// 	})

let data = [
	{
		num: 5,
		t: 'ggg'
	},
	{
		num: 7,
		t: 'ggg'
	},
	{
		num: 8,
		t: 'ggg'
	},
	{
		num: 2,
		t: 'ggg'
	}
]

let data2 = data.sort((x, y) => {
	return x.num < y.num ? false : true;
})

console.log(data2);