const fs = require('fs');
const readStream = fs.createReadStream('./guitar.mp4');
const writeStream = fs.createWriteStream('guitor_copy.mp4');

readStream
	.on('data', (chunk) => {
		if (writeStream.write(chunk) === false) {
			// 如果读取的数据还是缓冲区
			console.log('still cached');
			readStream.pause();
		}
	})
	.on('end', () => {
		console.log('file has been readed over!')
		writeStream.end();
	});

writeStream.on('drain', () => {
	console.log('data drains');

	readStream.resume();
})
	


