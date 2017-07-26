function route(handle, pathname, response, request) {
    console.log("router request for " + pathname);
    if (typeof handle[pathname] == "function") {
       return handle[pathname](response, request);
    } else {
        console.log("404 not found");
        response.writeHead(404, {"Content-type": "text/plain"});        
        response.write("404 Not found!")
        response.end();
    }
}

exports.route = route;