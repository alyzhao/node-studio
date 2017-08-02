const http = require('http');
const fs = require('fs');
const request = require('request');

http
	.createServer((req, res) => {
		/*fs.readFile('./copy_cat.jpg', (err, data) => {
			if (err) {
				res.end('file not exit!');
			} else {
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.end(data);
			}
		})*/

		// fs.createReadStream('./copy_cat.jpg').pipe(res);
		// fs.createReadStream('https://avatars3.githubusercontent.com/u/24472439?v=4&s=460').pipe(res);
		request('https://avatars3.githubusercontent.com/u/24472439?v=4&s=460').pipe(res);

	})
	.listen(520)

