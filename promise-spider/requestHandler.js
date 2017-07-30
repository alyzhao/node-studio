let getData = require("./getData");

function spider(response, request) {
	let url = 'http://www.imooc.com/learn/348';

	let promiseSpider = getData.getData(url);
	promiseSpider.then((value) => {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(value);
		response.end();
	}).catch((error) => {
		console.log(error);
		response.writeHead(500, {"Content-Type": "text/html"});
		response.end();
	})

}

exports.spider = spider;
