# JSGI and servlet lifecycle for HTTP

The JSGI (JavaScript Gateway Interface) specification defines an interface between a HTTP web server and JavaScript-based
applications. It has been developed by the CommonJS project and is implemented by Ringo. Since Ringo takes advantage of the
Java ecosystem, the actual implementation of JSGI is provided by a Java servlet called JsgiServlet.

A servlet is a Java web component to generate dynamic content. A web server invokes a servlet’s methods and provides them a
request object and expects a response object as return value. Ringo uses Jetty as web server and servlet container. Advantages
of using Jetty are the advanced security and configuration options, the open-source foundation, and a wide range of deployments–from
large clusters to cloud services. Jetty provides the HTTP frontend with all parsing logic, basic error handling and web server configuration.

## Jetty servlet container
Ringo itself hooks into Jetty by providing a custom servlet, the [JsgiServlet][1]. This special servlet is the facilitator
between the Java-based servlet container and the JavaScript-based Ringo application. Like every arbitrary Java servlet,
the JsgiServlet follows the servlet lifecycle. After it gets instantiated by the Jetty container the `init` method is called.
Here it sets up the Ringo runtime environment, which will later process incoming requests. It loads the application code repositories
and all performs the Ringo runtime configuration. At the end a RhinoEngine, which holds the Ringo application with all
JavaScript modules, is attached to the JsgiServlet. At this time the JsgiServlet is ready to forward all incoming requests
to Ringo and to return each response back to Jetty.

<img src="../images/jsgiservlet.svg" alt="A diagram showing the JSGI request lifecycle" title="" style="width: 100%;"/>

## Request handling

The JsgiServlet handles all HTTP requests with its `service` method. Every incoming request will be handled by this method.
In the first step it creates a [JsgiRequest][2] object wrapping the Java-standard HttpServletRequest and HttpServletResponse
objects. The JsgiRequest holds fields like the request path, headers and the HTTP version in use. With the JsgiRequest
prepared, it’s time to actually call the Ringo application and to execute JavaScript code. For this a worker is acquired
from the servlet’s RhinoEngine. The RhinoEngine for a free worker in the pool of workers, or if all workers are already
assigned, it creates a new one.

Now the [`ringo/jsgi/connector`][3] JavaScript module comes in. The acquired worker calls the `handleRequest` JavaScript
function, providing it the application module, the application’s `app` function and the previously created JsgiRequest
object. At this point the request reaches the Ringo application, which implements the business logic, renders templates, or
returns a simple JSON response. If a web framework like stick is used, this is also the time where the framework processes
the requests and routes it to the according functions.

If any JavaScript exception thrown by the application code bubbles up to the JsgiServlet, the servlet generates a generic
error message including the JavaScript stack trace. Finally the worker has done all its work and is released again.
The worker is now ready to serve another incoming request.

[1]: https://github.com/ringo/ringojs/blob/master/src/org/ringojs/jsgi/JsgiServlet.java
[2]: https://github.com/ringo/ringojs/blob/master/src/org/ringojs/jsgi/JsgiRequest.java
[3]: https://github.com/ringo/ringojs/blob/master/modules/ringo/jsgi/connector.js