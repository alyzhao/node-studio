var getData = require('./getData');
var getChapter = require('./getChapter');
var fs = require('fs');


var url = 'http://www.imooc.com/learn/348';
var chapters = getChapter.getChapter(getData.getData(url));

chapters.then((value) => {
	let fileContent = '';
	value.forEach((item, index) => {
		console.log(item.title);
		fileContent += item.title + '\n';
		item.video.forEach((item, index) => {
			console.log('---' + item.title + "  " + item.url);
			fileContent += '---' + item.title + "  " + item.url + '\n';
		})
	});
	fs.writeFile('./class.txt', fileContent, (err) => {
		err ? console.log(err) : console.log("write success!");
	})
}).catch((error) => {
	console.log('error: ' + error.message);
})
