exports.app = require('ringo/webapp').handleRequest;

exports.middleware = [
    'ringo/middleware/gzip',
    'ringo/middleware/etag',
    'ringo/middleware/responselog',
    'ringo/middleware/error',
    'ringo/middleware/notfound',
    // 'ringo/middleware/profiler'
];

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

exports.urls = [
    [ '^/webhook', './webhooks' ],
    [ '^/demo', './demo/config' ],
    [ '^/wiki', './ringowiki/config' ],
    [ '^/irc', './ringobot/config' ],
    [ '', './simplesite/config' ]
];

exports.static = [
    [ '/demo/static', './demo/public/static' ],
    [ '/wiki/static', './ringowiki/static' ],
    [ '/irc/static', './ringobot/static' ],
];

exports.jars = [
    "jars/jetty-servlets-7.0.1.v20091125.jar"
];

exports.extensions = [
    "ringo/cometd",
    "ringobot/bot"
];
