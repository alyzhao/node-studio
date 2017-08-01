const fs = require('fs');
const readStream = fs.createReadStream('./guitar.mp4');
let n = 0;

readStream
	.on('data', (chunk) => {
		console.log('data emits');
		console.log(Buffer.isBuffer(chunk));
		// console.log(chunk.toString('utf8'));
		n++;

		readStream.pause();
		console.log('data pause');
		setTimeout(() => {
			console.log('data pause end');
			readStream.resume();
		}, 10);

	})
	.on('readable', () => {
		console.log('data readable');
	})
	.on('end', () => {
		console.log(n);
		console.log('data end');
	})
	.on('close', () => {
		console.log('data close');		
	})
	.on('end', (err) => {
		console.log('data read error ' + err);
	})


