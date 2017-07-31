<<<<<<< HEAD
var http = require('http');
var fs = require('fs');

// var url = 'http://md.ematong.com/el-imfans/resources/wapItem/wap_new/images/im/weichat/100.png';

function getData(url, imgName) {
	http.get(url, (res) => {
		let error;

		if (res.statusCode != 200) {
			error = new Error('请求失败... ' + `状态码: ${statusCode}`);
		}

		if (error) {
			// console.error(error.message);
			res.resume();
			reject(error);
		}

		res.setEncoding('binary');
		let html = '';

		res.on('data', (chunk) => { html += chunk; });
		res.on('end', () => {
			console.log("数据抓取完毕!");
			console.log(html);
			fs.writeFile("./facial/" + imgName + '.png', html, "binary", function(err){
	            if(err){
	                console.log("down fail");
	            }
            console.log("down success");
        	});
		});
	}).on('error', () => {
		console.log('扒取数据失败！')
	});
}

for (let i = 100, length = 220; i < length; i++) {
	let url = 'http://md.ematong.com/el-imfans/resources/wapItem/wap_new/images/im/weichat/' + i + '.png';
	getData(url, i);
}

=======
var http = require('http');
var fs = require('fs');

// var url = 'http://md.ematong.com/el-imfans/resources/wapItem/wap_new/images/im/weichat/100.png';

function getData(url, imgName) {
	http.get(url, (res) => {
		let error;

		if (res.statusCode != 200) {
			error = new Error('请求失败... ' + `状态码: ${statusCode}`);
		}

		if (error) {
			// console.error(error.message);
			res.resume();
			reject(error);
		}

		res.setEncoding('binary');
		let html = '';

		res.on('data', (chunk) => { html += chunk; });
		res.on('end', () => {
			console.log("数据抓取完毕!");
			console.log(html);
			fs.writeFile("./facial/" + imgName + '.png', html, "binary", function(err){
	            if(err){
	                console.log("down fail");
	            }
            console.log("down success");
        	});
		});
	}).on('error', () => {
		console.log('扒取数据失败！')
	});
}

for (let i = 100, length = 220; i < length; i++) {
	let url = 'http://md.ematong.com/el-imfans/resources/wapItem/wap_new/images/im/weichat/' + i + '.png';
	getData(url, i);
}

>>>>>>> 245fac948e0a1db21347fa1434ccb9961ce074aa
