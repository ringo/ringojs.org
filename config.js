
var {Application} = require("stick");
var app = exports.app = Application();
app.configure(masterTemplate, "mount");
app.mount("/wiki", module.resolve("ringowiki/config"));
app.mount("/bot", module.resolve("ringobot/config"));
app.mount("", module.resolve("simplesite/config"));

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

/* exports.urls = [
    [ '^/webhook', './webhooks' ],
    [ '^/demo', './demo/config' ],
    [ '^/wiki', './ringowiki/config' ],
    [ '^/bot', './ringobot/config' ],
    [ '', './simplesite/config' ]
];

exports.static = [
    [ '/demo/static', './demo/public/static' ],
    [ '/wiki/static', './ringowiki/static' ],
    [ '/bot/static', './ringobot/static' ],
];

exports.jars = [
    "jars/jetty-servlets-7.0.1.v20091125.jar"
];

exports.extensions = [
    "ringo/cometd",
    "ringobot/bot"
]; */
