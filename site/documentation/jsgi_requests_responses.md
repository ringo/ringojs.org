# JSGI Requests and Responses

The JSGI (JavaScript Gateway Interface) specification defines an low-level interface between a HTTP server and JavaScript-based web applications. It has been developed by the CommonJS project and is implemented by Ringo. The main goal is to map incoming HTTP requests to arbitrary JavaScript objects. Application developers can use the request data, manipulate it, and generate a response object, which the JSGI implementation maps back to a valid HTTP response.

Between the HTTP server and the application, developers can include middleware functions. Middlewares can manipulate the request object, like parsing query parameters. They help to make application development easier. Web frameworks like [stick](../stick_jsgi_implementation) provide a rich set of middlewares.

## Request Object

 * `host` &mdash; host name of the web server
 * `port` &mdash; local port number of the web server
 * `queryString` &mdash; query string of the URL, separated from the preceding path by a question mark
 * `version` &mdash; HTTP version of the request in form of an array `[majorVersion, minorVersion]`
 * `remoteAddress` &mdash; fully qualified name (FQDN) of the client's IPv6 or IPv4 address
 * `scheme` &mdash; returns `https` for secure connections, `http` otherwise
 * `async` &mdash; true if the request supports asynchronous operation
 * `headers` &mdash; object containing the client-supplied HTTP request headers with lower-case keys; multiple header values will be merged following RFC 7230
 * `input` &mdash; body of the request in binary form as `io.Stream`
 * `scriptName` &mdash; empty string if the current JSGI application is the "root" of the server; the initial portion of the request URL's path that corresponds to the application object otherwise
 * `pathInfo` &mdash; the URL's decoded path, always starting with a "/" character
 * `method` &mdash; the name of the HTTP method; e.g. `GET`, `HEAD`, `POST`, `PUT`, `DELETE`
 * `env` &mdash; Ringo-specific environment information
   * `env.app` &mdash; the `module.id` if the current JSGI application is a CommonJS module; not defined otherwise
   * `env.servlet` &mdash; the JSGIServlet instance handling this request
   * `env.servletRequest` &mdash; the original `javax.servlet.http.HttpServletRequest` instance provided by the Servlet container
   * `env.servletResponse` &mdash; the original `javax.servlet.http.HttpServletResponse` instance provided by the Servlet container
 * `jsgi` &mdash; JSGI-specific read-only variables
   * `jsgi.version` &mdash; Ringo implements version `0.3`
   * `jsgi.multithread` &mdash; Ringo supports multi-threading, always `true`
   * `jsgi.multiprocess` &mdash; Ringo is a single-process runtime, always `false`
   * `jsgi.runOnce` &mdash; Ringo might call a single JSGI application multiple times, always `false`
   * `jsgi.cgi` &mdash; Ringo runs atop Jetty or any other Servlet container, but not atop CGI, so always `false`
   * `jsgi.errors` &mdash; references `system.stderr` for error output


## Response Object

A JSGI application is a JavaScript function accepting exactly one argument which is the request object. It must return a valid response object. The response object has exactly three required properties:

 * `status` &mdash; a three-digit integer representing the HTTP response status code; e.g. `200`
 * `headers` &mdash; a JavaScript object containing key/value pairs with string or array values
 * `body` &mdash; an array-like object implementing a `forEach` method, which will be called to generate a valid response. Each element must have a `toByteString` method or be an instance of `Binary`.
