var http = require('http');
var cheerio = require('cheerio');

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

function getLearnNum(courseID) {
	let promise = new Promise((resolve, reject) => {
		let url = 'http://www.imooc.com/course/AjaxCourseMembers?ids=' + courseID;
		http.get(url, (res) => {
			const { statusCode } = res;
			let error;
			if (statusCode != 200) {
				error = new Error(`请求失败， 状态码：${statusCode}`);
			}
			if (error) {
				res.resume();
				reject(error);
			}
			res.setEncoding('utf-8');
			let rawData = '';

			res.on('data', (chunk) => { rawData += chunk; });
			res.on('end', () => {
				let data = JSON.parse(rawData);
				let learnNum = data.data[0].numbers;
				resolve(learnNum);
				console.log(`学习id为${courseID}的课程的人数: ${learnNum}`);

			});
		}).on('error', () => {
			console.log(`爬取课程${courseID}失败！`);
		});
	});
	return promise;
}

function getCourse(courseID) {
	return new Promise((resolve, reject) => {
		getData('http://www.imooc.com/learn/' + courseID)
			.then((value) => {
				let $ = cheerio.load(value);
				let courseInfo = {};
			// let courseData = [{
			// 	title: '',
			// 	number: number,
			// 	courseInfo: [{
			// 		chapterTitle: '',
			// 		videos: [{
			// 			title: '',
			// 			url: ''
			// 		}]
			// 	}]
			// }]				
				courseInfo.title = $('h2.l').text();
				getLearnNum(courseID)
					.then((value) => {
						courseInfo.number = value;
						courseInfo.courseInfo = [];
						let chapterDiv = $('.chapter');
						chapterDiv.each(function(item) {
							let $this = $(this);
							let chapterItem = {};
							let chapterClone = $this.find('strong').clone();
							chapterClone.children().remove();
							let title = chapterClone.text().trim();
							chapterItem.chapterTitle = title;
							chapterItem.video = [];
							let videoList = $this.find('.video').children('li');
							videoList.each(function(item) {
								let videoItem = $(this).find('.J-media-item');
								let href = "http://www.imooc.com" + videoItem.attr('href');
								let title = videoItem.text().replace(/(^\s+)|(\s+$)|(\n.*)/g, '');
								chapterItem.video.push({title: title, url: href});
							});
							courseInfo.courseInfo.push(chapterItem);
						});
						resolve(courseInfo);						
					})
					.catch((err) => {
						console.log(err.message);
					});
						
			})
			.catch((err) => {
				reject(err);
			})
	})
}

exports.getCourse = getCourse;

