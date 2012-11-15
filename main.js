var {Application} = require("stick");
var app = exports.app = Application();
app.configure("gzip", "etag", masterTemplate, "mount");
app.mount("", require("simplesite"));

var masterTemplatePath = module.resolve("templates/master.html");
function masterTemplate(next, app) {
    return function(req) {
        req.env.masterTemplate = masterTemplatePath;
        return next(req);
    }
}

exports.webHookConfig = {
    // list of refs for which webhook logic is active
    refs: {'refs/heads/master': true},
    jsdoc: {
        repository: {
            path: '/usr/local/ringojs.org/vendor/docs-master/modules/',
            name: 'RingoJS API master'
        },
        exportDirectory: '/usr/local/ringojs.org/site/api/master/'
    },
    git: {
        pullDirectory: '/usr/local/ringojs.org/vendor/docs-master/.git/',
    }
};

if (require.main === module) {
    // FIXME shutdown hooks
    var server = new require("ringo/httpserver").Server({app: app});
    server.start();
}
