A Stick web application
==================================

A straight port of our simple application to Stick is easy: instead of providing the "app" function ourselves, we pass a Stick application to Ringo's Httpserver. The Stick application will in turn call our view functions after doing its Stick-business.

Stick 101
-------------

The following behaves just like our example from the last section. We will step through what it does after the code:

    var {Application} = require('stick');

    var app = exports.app = new Application();
    app.configure('route');

    app.get('/', function(request) {
       return {
          body: ['Hello World'],
          headers: {'Content-Type': 'text/html'},
          status: 200
       }
    });

    if (require.main == module) {
       require('ringo/httpserver').main(module.id);
    }

First, we create a Stick application and configure it to have the "route" middleware. Then we use the routing function `app.get(path, function)` to route all URLs to the same view function responding with "Hello World".

Interlude: Response helpers
-----------------------------

Constructing the response object manually is cumbersome and error-prone. The `ringo/jsgi/helper` module provides various methods to create a response. Check out the [jsgi/response API](https://ringojs.org/api/master/ringo/jsgi/response/) for a complete list.

Instead of creating an object with "body", "headers" and "status" code, we can condense the response creation down to one line:

    app.get('/', function(request) {
       return response.html('Hello World');
    });

Compared to the last tutorial section where we did not yet use Stick, this might just look like more code to do the same. It gets more interesting if we look at the new possibilities the "route" middleware gives us: most importantly we can defined URL routes with placeholders.

URL Routing
-------------

As we already saw, the "route" middleware adds `get()` to the Stick application. And it also adds the functions `post()`, `put()` and `del()`. All of them are used to setup URL routes depending on the request type. We only deal with `post()` and `get()` in this tutorial.


I call "path segments" the parts of a URI between `/` (slashes). For example, /Home/foo/bar/ as three segments: Home, foo and bar.

URL Routing with placeholders
-----------------

A named placeholder is prefixed with `:` (colon) and it does not match `/` (slash) and `.` (dot). For example:

    /blogposts/:yearplaceholder/:monthplaceholder/:anotherplaceholder/index.html


The above is a valid path description with two placeholders: one for the year, one for the "month" and "another" placeholeder.

Let's use this new knowledge to setup a URL structure similar to what Wikipedia provides, namely:

  * "/Home" - the wiki content pages, which have only one segment but any character in that first segment
  * "/Home/edit" - the "edit" view for each content page, which shares the first segment with its wiki page, followed by "edit"

As a path specification, the above translates into these routes:


      app.get('/:slug', function(request, slug) {
         return response.html('I am ', slug);
      });

      app.get('/:slug/edit', function(request, slug) {
         return response.html('Edit ', slug);
      });

We are now using named placeholders to extract the page slug. For our wiki, the "slug" of a page is its name minus any characters not usable in a URI.

As you can see in the code above, Stick passes the placeholder's value as an additional argument to the view function. And we use that argument to customize the response text: if you open <http://localhost:8080/RingoJs> it should return "I am RingoJs" and similarly for <http://localhost:8080/RingoJs/edit> we should get "Edit RingoJs".

Besides those content pages, there are special pages with the prefix "special". Those pages expose internal information like recent changes to the wiki. For the special pages we add another route, which grabs everything which has "/special/" as a first segment and a placeholder for the second. Put together, our routes now look like this:


      app.get('/:slug', function(request, slug) {
         return response.html('I am ' + slug);
      });

      app.get('/:slug/edit', function(request, slug) {
         return response.html('Edit ' + slug);
      });

      app.get('/special/:specialtype', function(request, specialtype) {
         return response.html('I am special "' + specialtype + '"');
      });

One thing to notice here is the order of the routes. Try accessing <http://localhost:8080/special/edit>. This path would fit two of the routes: either the first or the last one. As you might have guessed by now, the routes are tried in the order they are defined.

The last thing you need to know about named placeholders is that they can be made optional by appending a `?` to the name of a placeholder. This allows us to fix a shortcoming in our routes, namely, that the root URL <http://localhost:8080/> is not handled. Making '/:slug?' optional in the first route fixes this. The root Url should now return "I am undefined". Good enough for now.

Later, we will redirect this root Url to the homepage of our wiki.

## Storing Data
A typical application stores data into a database system. In this tutorial we will focus on relational databases and their data models:<br>
[5. Database Mappings](/tutorial/sqlstore/)