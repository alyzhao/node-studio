var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandler");

var handle = {};
handle["/"] = requestHandler.spider;

server.start(router.route, handle);