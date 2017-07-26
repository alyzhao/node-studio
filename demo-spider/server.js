var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(520);
    console.log("server is at 127.0.0.1:520")
}

exports.start = start;