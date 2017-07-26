var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response, request) {
	console.log("Request handler 'start' was called.");
	var body = '<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" ' +
		'content="text/html; charset=UTF-8" />'+
		'</head>' +
		'<body>' +
		'<form action="/upload" enctype="multipart/form-data" ' +
		'method="post">' +
		'<input type="file" name="upload">' +
		'<input type="submit" value="Upload file" />' +
		'</form>' +
		'</body>' +
		'</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm();
	// form.uploadDir = "demo01-server/tmp"; 		// 指定临时文件
	
	form.parse(request, function(error, fields, files) {
		// 文件流
		var readStream = fs.createReadStream(files.upload.path);
		var writeStream = fs.createWriteStream("./demo01-server/tmp/test.png");
		readStream.pipe(writeStream);
		readStream.on("end", function() {
			fs.unlinkSync(files.upload.path);
		});


		console.log(files);
		// fs.renameSync(files.upload.path, "./demo01-server/tmp/test.png");
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	})

}

// '/'应该是物理路径的绝对路径, './'是网站根目录的路径, 以我这种方式。

function show(response, request) {
	console.log("Request handler 'show' was called.");	
	fs.readFile("./demo01-server/tmp/test.png", "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}		
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;