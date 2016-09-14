var fs = require("fs");
var path = require("path");

function middleware(directory, locals) {
    return function(request, response, next) {
        var view = request.url.slice(1);
        if (!view) {
            view = "index";
        }
        var file = path.join(directory, view);
        fs.stat(path.join(request.app.get("views"), directory, view + ".ejs"), function(error) {
            if (error) {
                next();
            }
            else {
                response.render(file, typeof locals === "object" ? locals[view] : require(locals)[view]);
            }
        });
    };
}

module.exports = middleware;