# stick's JSGI implementation

This document describes the advanced JSGI implementation by the [stick framework](https://github.com/ringo/stick).
Applications built with stick are modular web applications using middleware composition. Every stick application
can be configured from the outside using the `configure()` function.

## Definition of terms

### JSGI

The [JSGI (JavaScript Gateway Interface)](http://wiki.commonjs.org/wiki/JSGI) specification defines an interface between
a HTTP web server and JavaScript-based applications. The application can consume a plain JavaScript object having properties filled with information about the HTTP request and has to return as response a standardized JavaScript object. A JSGI compatible web server converts this response object into a HTTP response and sends it back to the client.

### JSGI application

A JSGI application is a JavaScript function accepting exactly one argument which is the request object.
It must return a valid response object. The response object has three required properties:

 * `status`: a three-digit integer
 * `headers`: a JavaScript object containing key/value pairs with String or Arrays
 * `body`: an Array of objects which have a `toByteString` function, e.g. an Array of Strings

A JSGI application may look like this:

    function(request) {
        return {
            status: 200,
            headers: {},
            body: ["Hello World!"]
        };
    }

While this is a beautifully simple concept, the nature of functions is that they encapsulate functionality, hiding it from the outside.
This makes it hard to provide application-wide configuration. stick's goal is to define a JSGI application that allows
itself to be composed out of modular middleware components.

For this stick defines an `Application` object. It's a JSGI application, but with some additional methods and features.
When talking about the application object, we usually refer to a stick `Application`.

### Middleware

**A middleware is a JSGI application that wraps another JSGI application.**
Its intention is to add new functionality to the wrapped application by enhancing the request object or modifying the response.
Since a JSGI application is just a JavaScript function, a middleware is a function that wraps another function.
How requests are passed to the wrapped JSGI application, and how the response is generated, depends on the middleware.

The following example shows a simple no-op middleware. It passes the unmodified request on to the nested middleware and returns the result.
The `nextJsgiMiddleware` function is a nested application defined outside the middleware function.

    var nextJsgiMiddleware = require('./someJsgiApp').app;

    function noopJsgiMiddleware(request) {
      // the nested JSGI middleware returning a response object
      return nextJsgiMiddleware(request);
    }

### Middleware chain

A middleware chain is a JSGI application that is composed internally of an arbitrary number of wrapped middleware functions.
Each wrapped middleware can add functionality to the application object, or enhance the request, or modify the response.
The request object flows from the beginning of the chain through each wrapped middleware until the last middleware is reached.
The the response bubbles back inside out back to the outermost middleware, which finally returns the JSGI response back to the web server.
This figure shows a possible middleware chain for a stick web application:

<img src="../images/stick-middleware-chain.png" alt="A typical middleware chain" title="" width="344" />

The according middleware chain for the example is `gzip( etag( cors( route( unhandled()))))`.
Unhandled is the implicit core of each middleware chain and triggers an error if it's reached.
This means that requests with no matched route are unhandled by default.

### Middleware factory

A middleware factory is a function that accepts exactly two arguments:

 1. the stick application's current JSGI middleware chain
 2. stick application object itself

A middleware factory must return a middleware function, which typically wraps the nested JSGI middleware chain passed as first argument.
It can attach functions to the application object called hooks.
Furthermore a middleware factory can add new properties to the stick application object. This is useful to make the
middleware factory configurable.

The following example shows a simple logging middleware factory.
It adds a `enableLogging()` hook to let wrapped middlewares decide if they need logging or not.
If a nested middleware calls the hook, the logging middleware will log the request and response object before it returns.

    function Logging(middlewareChain, app) {
      // configuration property
      app.logPattern = '%-5p [%t]: %m%n';

      var enabled = false;

      // a hook to enable the logger
      app.enableLogging = function() {
        enabled = true;
      };

      // the logging middleware function
      return function(request) {

        // invoke the middleware chain with all nested middleware functions
        var response = middlewareChain(request);

        // check the current configuration
        if (enabled) {
          var logger = new Logger(app.logPattern);
          logger.log(request, response);
        }

        return response;
      }

    };

The following code shows how this middleware could be used:

    var stick = require('stick');
    var app = new stick.Application();
    app.configure(Logging);
    app.enableLogging();


## The stick Application object

The Application object is a JSGI application that wraps a middleware chain.
When invoked, the application acts as a proxy to its middleware chain, meaning it calls the middleware chain with the
request as argument and returns the result.

Applications are created using the `Application` constructor:

    var app = new Application();

When called without argument, the application's middleware chain is initialized to a `unhandled()` function which throws
an Error when invoked.

The `Application` constructor optionally accepts a JSGI application argument. If defined, it is used to initialize the
application's middleware chain. For example, the following code:

    var app = new Application(responder);

will result in an application with `responder()` as JSGI middleware chain.

### configure()

Application objects have a `configure` method that takes one or more middleware factories as arguments and applies them
to the application's existing middleware chain, starting with the rightmost argument. For example, the following invocation
of `configure` on a newly created `Application` object:

    app.configure(log, responder);

will result in `log(responder(unhandled()))` as middleware chain.
If a request reaches the innermost `unhandled()` middleware, stick throws an `Error` to inform all wrapping middlewares
about the unhandled request. If none of the wrapping middlewares responds to this error, Ringo returns a HTTP 500 internal server error.

Middleware factories may also add methods or properties to the application object as described above to allow their middleware
to be configured from the outside.

### env()

Applications have a `env` method that takes a single String argument and returns an Application object that shares the
middleware chain of the original application, but can be configured to contain additional middleware that is not shared
with the parent application.

    var development = app.env("development");

This creates an application `development` whose middleware chain is a proxy function to the middleware chain of the
original application `app`. We call this proxy function `_parent_()`. The following statement:

    development.configure(debug, profile);

will result in development's middleware chain to consist of `debug(profile(_parent_()))`.

Repeated calls of the `env` method with the same argument return the same application object.

## Conventions for stick middleware

By convention, modules are expected to export middleware factories as `middleware`.

    exports.middleware = function myCustomMiddleware(nextChain, app) {
      return function(req) {
        return nextChain(req);
      };
    };

stick Application objects are expected to be exported as `app`:

    var app = exports.app = new Application();
    app.configure(...);

When passing a string to an application method expecting a JSGI app or middleware factory, that string is interpreted
as module id, meaning the application will `require()` the module id and try to use the `app` or `middleware`
property exported by the module.
