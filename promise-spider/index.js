var server = require("./server/server");
var requestHandler = require("./requestHandler");

var handle = {};
handle["/"] = requestHandler.spider;

server.ServerStart(handle, 520);