var http = require("http");
var url = require("url");
var router = require("./router");

function ServerStart(handle, port) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        router.route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(port);
    console.log("server is at 127.0.0.1:" + port);
}

exports.ServerStart = ServerStart;