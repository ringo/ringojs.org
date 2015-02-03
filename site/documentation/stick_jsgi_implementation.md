# stick's JSGI implementation

This document describes the JSGI implementation by the [stick framework](https://github.com/ringo/stick). Applications
built with stick are modular web applications using middleware composition.

## Definition of Terms

### JSGI

The [JSGI (JavaScript Gateway Interface)](http://wiki.commonjs.org/wiki/JSGI)  specification defines an interface between a HTTP web server and JavaScript-based
applications. It has been developed by the CommonJS project and is implemented by Ringo. Since Ringo takes advantage of the
Java ecosystem, the actual implementation of JSGI is provided by a Java servlet called JsgiServlet.

The JSGI specification defines a web application as a function accepting a request argument and returning a response object.
While this is a beautifully simple concept, the nature of functions is that they encapsulate functionality, hiding it from the outside.
stick's goal is to define a JSGI application that allows itself to be composed out of modular middleware components, which
can be configured from the outside.

### Application

By JSGI application we mean a JavaScript function that takes a request object and returns a response object.
A JSGI application may look like this:

    function(request) {
        return {
            status: 200,
            headers: {},
            body: ["Hello World!"]
        };
    }

stick also defines an `Application` object, which, while also being a JSGI application, provides some additional methods and features. When talking about the application object, we usually refer to this second kind of application.

### Middleware

By middleware we mean a JSGI application that wraps another JSGI application. Whether, or how, requests are passed on to the wrapped application and how the response is generated depends on the middleware.

A simple, no-op middleware that just passes the request on to the nested application and returns the result might look like this, with `nested` being the nested application defined outside the middleware function:

    function(request) {
        return nested(request);
    }

### Middleware Factory

A middleware factory is a function that accepts a nested JSGI application as argument and returns a middleware function. A simple factory for the middleware function above might look like this:

    function(nested) {
        return function(request) {
            return nested(request);
        };
    }

As we see, middleware functions binds the middleware function to the nested application, usually by making the middleware function as closure.

### Middleware Chain

When we talk about middleware chains, we mean a JSGI application that is composed internally of an arbitrary number of wrapped middleware functions. 

## The Application Object

The application object is a JSGI application that wraps a middleware chain. When invoked, the application acts as a proxy to its middleware chain, meaning it calls the middleware chain with the request as argument and returns the result.

Applications are created using the `Application` constructor:

    var app = new Application();

When called without argument, the application's middleware chain is initialized to a `unhandled()` function which throws an Error when invoked. 

The `Application` constructor optionally accepts a JSGI application argument. If defined, it is used to initialize the application's middleware chain. For example, the following code:

    var app = new Application(responder);

will result in an application with `responder()` as JSGI middleware chain.

### configure()

Application objects have a `configure` method that takes one or more middleware factories as arguments and applies them to the application's existing middleware chain, starting with the rightmost argument. For example, the following invocation of `configure` on a newly created `Application` object:

    app.configure(log, responder);

will result in `log(responder(unhandled()))` as middleware chain.

Middleware factories may also add methods or properties to the application object as described below to allow their middleware to be configured from the outside.

### env()

Applications have a `env` method that takes a single String argument and returns an Application object that shares the middleware chain of the original application, but can be configured to contain additional middleware that is not shared with the parent application. 

    var development = app.env("development");

This creates an application `development` whose middleware chain is a proxy function to the middleware chain of the original application `app`. We call this proxy function `_parent_()`. The following statement: 

    development.configure(debug, profile])

will result in development's middleware chain to consist of `debug(profile(_parent_()))`.

Repeated calls of the `env` method with the same argument return the same application object.

## Middleware Factories

Middleware factories are expected to accept two arguments:

 1. The application's current JSGI middleware chain
 2. The application object itself

A middleware factory is expected to return a middleware function which typically wraps the nested JSGI middleware chain passed as first argument. 

Additionally, a middleware factory may set up configuration hooks in the `Application` object passed as second argument to allow the middleware to be configured from outside.

For example, a simple Logging middleware might look like this:

    function Logger(nested, app) {

        var enabled = false;

        app.enableLogging = function() {
            enabled = true;
        }

        return function(request) {
            if (enabled) {
                log(request);
            }
            return nested(request);
        }
    }

The following code shows how this middleware could be used:

    var app = new Application();
    // ...
    app.configure(Logger);
    app.enableLogging();

## Conventions

By convention, modules are expected to export JSGI applications as `app`, and middleware factories as `middleware`. 

When passing a string to an application method expecting a JSGI app or middleware factory, that string is interpreted as module id, meaning the application will `require()` the module id and try to use the `app` or `middleware` property exported by the module.