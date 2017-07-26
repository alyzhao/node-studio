var http = require('http');

// var url = 'http://www.imooc.com/learn/348';

function getData(url) {
	let promise = new Promise((resolve, reject) => {
		http.get(url, (res) => {

			const { statusCode } = res;
			const contentType = res.headers['content-type'];
			console.log('statusCode: ');
			console.log(statusCode);
			console.log('contentType: ');
			console.log(contentType);

			let error;

			if (statusCode != 200) {
				error = new Error('请求失败... ' + `状态码: ${statusCode}`);
			}

			if (error) {
				// console.error(error.message);
				res.resume();
				reject(error);
			}

			res.setEncoding('utf-8');
			let html = '';

			res.on('data', (chunk) => { html += chunk; });
			res.on('end', () => {
				console.log("数据抓取完毕!");
				resolve(html);
			});
		}).on('error', () => {
			console.log('扒取数据失败！')
		});
	});

	return promise;
}

// var rawData = getData(url);
// rawData.then((value) => {
// 	console.log("promise then:")
// 	console.log(value);
// 	return value;
// }).catch((error) => {
// 	console.error(error.message);
// })

exports.getData = getData;
