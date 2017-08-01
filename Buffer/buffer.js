const fs = require('fs');

fs.readFile('./cat.jpg', (err, origin_buffer) => {
	console.log(Buffer.isBuffer(origin_buffer));

	fs.writeFile('./cat_buffer.jpg', origin_buffer, (err) => {
		if(err) console.log(err);
	})

	let base64Image = origin_buffer.toString('base64');

	console.log(base64Image);

	// let decodedImage = new Buffer(base64Image, 'base64');

	let decodedImage = Buffer.from(base64Image, 'base64');
	console.log(Buffer.compare(origin_buffer, decodedImage));

	fs.writeFile('./cat_base64.jpg', base64Image, 'base64', (err) => {
		if(err) console.log(err);		
	})
})
