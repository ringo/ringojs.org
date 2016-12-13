A minimal Ringo web application
=================================

Before diving into Stick and the other awesome packages we just installed, I want to go through a short example with "raw Ringo". Just so you get a feel for what Ringo provides and the kind of error message you might get.

<div class="mustknow">

If you are not familiar with `exports` and `require()`, better take a detour to the [CommonJs Modules 101](modules.md) explanation

</div>


As a minimal starting point, consider the following web application:

    var app = function(request) {
       return {
          body: ['Hello World'],
          headers: {'Content-Type': 'text/html'},
          status: 200
       }
    }

    var {Server} = require('ringo/httpserver');
    var server = new Server({app: app, port: 8080});
    server.start();

The above is a runnable Ringo application, it does two things:

  * it defines a function "app", which returns an object
  * and it starts a Httpserver, with the "app" function and a "port" passed as configuration options

Ringo's Httpserver calls the "app" function for every request it recieves; the "app" function gets called with one argument: "request". We are not doing anything with the "request" argument, though you could inspect it with a "console.dir(request)" call to learn more about it.

<div class="knowmore">

For a complete list of configuration options for the HttpServer see the [Httpserver API documentation](https://ringojs.org/api/master/ringo/httpserver/#Server).

</div>

Let's start this application and see what it does. Put all of the above code into a new file "main.js" and start it with Ringo:

    $ ringo main.js


...and open <http://localhost:8080> with a browser. You should be greeted with "Hello World", if everything went well. If you mistyped any properties of the response object, you will get an error page complaining about "Invalid JSGI response" or a similar error.

Which brings us to the response object returned by the "app" function. To be a valid HTTP response it has to be an object with at least the following three properties:

 * a `body` Array, `['Hello World']`
 * a `headers` Object, `{"Content-Type": 'text/html'}`
 * a `status` Number, `200`

<div class="knowmore">

`body` is an Array-like, which is necessary for applications sending streaming responses. You can think of it as an Array for now.

The [technical specification for JSGI](http://wiki.commonjs.org/wiki/JSGI/Level0/A/Draft2) has all the details on response and request - Stick makes dealing with these easier as we will see in the next section.

</div>

By now, maybe you can already imagine how we could implement our own URL routing by inspecting `request.pathInfo` and dispatching to different view functions depending on the path. All we need is a couple of RegExes to check how "pathInfo" looks, and view functions which get called by such a dispatcher.

Luckily, Stick already does this matching and dispatching in a uniform way, besides providing us with easy access to request parameters and more.


Interlude: Quickstart a Httpserver
--------------------------

Our example can be shortened by using a different Httpserver constructor. Instead of elaborately instantiating the HttpServer and then starting it, as we do now:

    var server = new Server({app: app, port: 8080});
    server.start();

...we should use the `require('ringo/httpserver').main()` function. This function expects only a string argument: a module id. This module is expected to export a "app" function, which - as before - the Httpserver will call for each request.

So we change our "main.js" to export the "app" function and call the httpserver `main()` with the current module id:

    exports.app = function(request) {
      ....
    }
    require('ringo/httpserver').main(module.id);

But what about the port? Did we lose the ability to specify the port? No! Because the Httpserver's `main()` reads command line options. Try this for a full list of options available:

    $ ringo main.js --help

... for example, to specify a different port:

    $ ringo main.js --port 8888

Interlude: executing code only when run from command line
-----------------------------------------------

Another thing to improve in our example, is that the Httpserver is always started even when the module is `require`ed by another module or from the shell. Doing this, would also start the server:

    $ ringo
    >> require('./main');

But in this case we do not want the Httpserver to start, since we might only be interested in the exported properties.

This can be accomplished with the following if-block, which ensures that the code inside it is only run when the module is executed directly from the command line:


    if (require.main == module) {
      require('ringo/httpserver').main(module.id);
    }

<div class="knowmore">

If you are wondering what other properties "module" and "require" have, remember my tip from earlier to always check the API docs if in doubt:

   * <https://ringojs.org/api/master/globals/#module>
   * <https://ringojs.org/api/master/globals/#require.main>

</div>

## Take away

So much about JSGI and Ringo’s Httpserver. Those two are always at the core of your web application even if packages like Stick put sugar on top of it.

## The Stick Web Framework

Working with low-level APIs could be frustration over time. More complex applications require sophisticated frameworks and libraries. For this we will look into stick, a web framework on top of JSGI and Ringo:<br>
[4. A Stick web application](/tutorial/stickapp/)