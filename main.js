var {Application} = require("stick");
var app = exports.app = Application();
app.configure("static", "etag", masterTemplate, "mount");
app.mount("", require("simplesite"));
app.mount("/bot", require("ringobot"));
app.static("/usr/local/ringo/jsdoc/htdocs/");

var masterTemplatePath = module.resolve("templates/master.html");
function masterTemplate(next, app) {
    return function(req) {
        req.env.masterTemplate = masterTemplatePath;
        return next(req);
    }
}

if (require.main === module) {
    var server = new require("ringo/httpserver").Server({app: app});
    server.start();
    require("ringobot").start(server);
}
