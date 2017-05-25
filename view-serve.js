const fs = require("fs");
const path = require("path");

function middleware(directory, locals) {
    return (request, response, next) => {
        let view = request.url.slice(1);
        if (!view) {
            view = "index";
        }
        const file = path.join(directory, view);
        fs.stat(path.join(request.app.get("views"), directory, view + "." + request.app.get("view engine")), error => {
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
