var cheerio = require('cheerio');

function getChapter(promise) {

	var promise2 = new Promise((resolve, reject) => {
		promise.then((value) => {
			let $ = cheerio.load(value);
			let chapters = [
				// {
				// 	title: '',
				// 	vidoe: []
				// }
			];
			let chapterDiv = $('.chapter');
			chapterDiv.each(function(item) {
				let $this = $(this);
				let chapterItem = {};
				let chapterClone = $this.find('strong').clone();
				chapterClone.children().remove();
				let title = chapterClone.text().replace(/(^\s+)|(\s+$)/g, '')
				chapterItem.title = title;
				// console.log("title" + title);
				chapterItem.video = [];
				let videoList = $this.find('.video').children('li');
				videoList.each(function(item) {
					let videoItem = $(this).find('.J-media-item');
					let href = "http://www.imooc.com" + videoItem.attr('href');
					let title = videoItem.text().replace(/(^\s+)|(\s+$)|(\n.*)/g, '');
					//console.log("videohref " + href);
					// console.log("video title: " + videoItem.text());
					chapterItem.video.push({title: title, url: href});
				});
				chapters.push(chapterItem);
			});
			resolve(chapters);
		}).catch((error) => {
			reject(error);
		})
	});

	return promise2;
}

exports.getChapter = getChapter;