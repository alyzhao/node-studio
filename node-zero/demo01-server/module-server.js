var http = require("http");
var url = require("url");



function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("pathname: " + pathname);

        route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(8888);
    console.log("server is at 127.0.0.1:8888")
}

exports.start = start;
