let spiderFun = require("./public/spider");

function spider(response, request) {

	let arrCourse = [728, 637, 348, 259, 197, 134, 75];

	let courseListPromise = [];
	let courseList = [];

	arrCourse.forEach((item, index) => {
		console.log([item, index]);
		courseListPromise.push(spiderFun.getCourse(item));
	})

	Promise.all(courseListPromise).then((course) => {
		courseList = course.sort((x, y) => {
			return x.number < y.number;
		});

		let html = '<!DOCTYPE html><head><meta charset="utf-8" /></head>';
		courseList.forEach((item, index) => {
			html += '<h1>' + item.title + '   人数' + item.number + '</h1>';
			item.courseInfo.forEach((item, index) => {
				html += '<h3>' + item.chapterTitle + '</h3>'
				item.video.forEach((item, index) => {
					html += '<p><a target="_blank" href="' + item.url + '">' + item.title + '</a></p>'
				})
			})
			html += '</br></br>';
		})


		console.log(courseList);
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	}).catch((err) => {
		console.log(err.message);
		response.writeHead(500, {"Content-Type": "text/html"});
		response.end();
	})

}

exports.spider = spider;
