var {Application} = require("stick");
var app = exports.app = Application();
app.configure("static", "etag", masterTemplate, "mount");
app.mount("", require("simplesite"));
app.mount("/bot", require("ringobot"));
app.static("/usr/local/api.ringojs.org/htdocs/", "index.html");

var masterTemplatePath = module.resolve("templates/master.html");
function masterTemplate(next, app) {
    return function(req) {
        req.env.masterTemplate = masterTemplatePath;
        return next(req);
    }
}

var init = exports.init = function() {
    var server = new require("ringo/httpserver").Server({app: app});
    server.start();
    require("ringobot").start(server);
}

if (require.main === module) {
   init();
}
