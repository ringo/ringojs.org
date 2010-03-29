exports.app = require('ringo/webapp').handleRequest;

exports.middleware = [
    'ringo/middleware/gzip',
    'ringo/middleware/etag',
    'ringo/middleware/responselog',
    'ringo/middleware/error',
    'ringo/middleware/notfound'
    // 'ringo/middleware/profiler'
];

exports.urls = [
    [ '^$', function() { throw { redirect: '/wiki/'}; } ],
    [ '^demo', './demo/config' ],
    [ '^api', './jsdoc/config' ],
    [ '^wiki', './ringowiki/config' ]
];

exports.static = [
    [ '/demo/static', './demo/static' ], 
    [ '/api/static', './jsdoc/static' ],
    [ '/wiki/static', './ringowiki/static' ],
    [ '/static', './static' ]
];

exports.jars = [
    "jars/jetty-servlets-7.0.1.v20091125.jar"
];
