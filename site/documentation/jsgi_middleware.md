# JSGI Middleware

The idea of middleware is to wrap the JSGI application (or any middleware already wrapping the application) to run some pre- or post-request code. Since middleware exposes the same JSGI interface to the outside world, it can be nested or "stacked" at will. 

Usually, JSGI middleware comes as a function that takes a JSGI application as argument, and returns a middleware function wrapping that app. For example, a simple middleware that adds logging to each request might be implemented as follows:

    exports.Logger = function(app) {
        return function(env) {
            log(env.SCRIPT_NAME + env.PATH_INFO);
            return app(env);
        };
    }
 
The middleware that comes with RingoJS follows this pattern. Additionally, the RingoJS JSGI implementation offers a convenience feature to automatically instantiate and wrap middleware so you don't have to. All you need to do is export your middleware factory functions as an array called `middleware` in your `config` module. If your middleware factory function is called `middleware` or `handleRequest` it is even enough to just export the module name:

    exports.middleware = [
        'ringo/middleware/gzip',
        'ringo/middleware/etag',
        'ringo/middleware/error',
        'ringo/middleware/notfound'
    ];

The above list shows some of the middleware that comes with RingoJS. Have a look at the [modules/ringo/middlware](http://github.com/ringo/ringojs/tree/master/modules/ringo/middleware) directory for more middleware.

Of course, the great thing about JSGI middleware is that it's easy to write your own, or use middleware from another package.
