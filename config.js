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
    jsdoc: {
        repository: {
            path: '/home/simon/ringojs/modules/',
            name: 'master'
        }, 
        exportDirectory: '/usr/local/htdocs/api/master/'
    }
};

exports.urls = [
    [ '^/$', function() { throw { redirect: '/wiki/'}; } ],
    [ '^/webhook', './webhooks' ],
    [ '^/demo', './demo/config' ],
    [ '^/wiki', './ringowiki/config' ]
];

exports.static = [
    [ '/demo/static', './demo/static' ], 
    [ '/api/static', './jsdoc/static' ],
    [ '/api', '/usr/local/htdocs/api/' ],
    [ '/wiki/static', './ringowiki/static' ],
    [ '/static', './static' ]
];

exports.jars = [
    "jars/jetty-servlets-7.0.1.v20091125.jar"
];
