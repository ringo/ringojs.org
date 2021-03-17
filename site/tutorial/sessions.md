Sessions
------------

We do have a wiki but it has plenty of rough edges. For one, we should display confirmation- and error-messages to the user when he pressed save. Another problem is that we do not store any author information with the changes. We do store seperate revisions, and it would be nice to see which User changed what.

We are going to need a User model, and for that to make any sense we need session support. Let's take care of sessions first. As you might have expected, we add another middleware to our Stick application:

    var app = exports.app = new Application();
    app.configure('route');
    app.configure('params');
    app.configure('session');

The session middleware adds another property to the request object: `session`. As always we output this new object and see what it has to offer. So put this in any view and request it:

    console.dir(request.session);

This should output the following:

    {
     data: {},
     isNew: true,
     creationTime: 1352369842057,
     maxInactiveInterval: -1,
     lastAccessedTime: 1352369842057,
     invalidate: [Function],
     volatile: null
    }

We are most interested in `data` where we can story arbitrary data which persists between requests. Most of the other properties are self-explanatory, and you can find more information in the [Stick API documentation](https://ringojs.org/api/stick/middleware/session/).

`volatile` is similar to `data` but it only survives one request, for example one redirect request, which is exactly what we do after a save! We can thus use `volatile` to store a success- or error- message in the session, which we then display once the user redirected back to the edit page.

To make the success messages distinguishable, our `Page.updateOrCreate` should return the revision id it created:

    Page.updateOrCreate = function(slug, obj) {
       ...
       return revision.id;
    }

...and in the POST edit view we add error handling and set `session.volatile` appropriatly:

    app.post('/:slug/edit', function(request, slug) {
       try {
          var revisionId = model.Page.updateOrCreate(slug, request.postParams);
          request.session.volatile = "Revision #" + revisionId + " saved succesfully";
       } catch (e) {
          request.session.volatile = "Error saving page: " + e;
       }
       return response.redirect(urlFor(app, {action: 'edit', slug: slug}));
    });

Of course in the GET edit view, this message has to be passed to template, and the template needs to display it... what a great exercise for you!

A simple Middleware
----------------------

The more pressing issue is still open: missing author information. For that we need to identify users. For now, let's just add "anonymous users" in the wikipedia sense: every session automatically gets a User object derived from their IP. Not perfect, but it allows us to start fixing our models and logic to accomodate author information without having to deal with login, register, email-forgotten and all that user managment scaffolding.

This is how I want anonymous users to work: a "autologin" middleware should attach a User object to every session if the session does not already have a User object.

In JSGI, a middleware is not so different from our normal view functions: it gets the "request" as an argument and it can return a response by itself. Or the middlware can just modify the request and pass it further down the chain.

The simplest, no-op middleware is the following:


    function(request) {
        return next(request);
    }

Where `next` is the next middleware to be called. Where `next` comes from becomes clearer if we look at the middleware factory function. Those factory functions are - by Stick convention - always called `middleware`, and they must return a function usable as a middleware.

Extending our above example into a functional middleware example leads us to:

    exports.middleware = function (next) {
       return function (request) {
          return next(request);
       };
    };

We will play with these new concepts shortly, so you get a chance to better grasp them. Save the above middleware function in `middleware/autologin.js` and add it to the Stick application:

    var app = exports.app = new Application();
    app.configure('route');
    app.configure('params');
    app.configure(require('./middleware/autologin'));
    app.configure('session');

The order of the middlewares is important! They are called in reverse order: session calls autologin, which calls params, which calls route, which finally calls our view function. The response returned by our view function then bubbles back up the middleware chain.

Interlude: More middleware examples
--------------------------------------

Now, the following is not related to "autologin" but it helps us understand middlewares. How would we write a middleware, which *always* returns "403 forbidden"? Such a middleware wouldn't have to worry about anything further down the middlware chain, it could just return the response once it gets called:

    exports.middleware = function (next) {
       return function (request) {
          return {
            body: ['Forbidden!'],
            status: 403,
            header: {'Content-Type': 'text/html'}
          }
       };
    };

What if this middleware should return Forbidden only if the response (!) body contains the words "You shall not pass!" (this is a contrieved example... but bare with me). The middleware would have to call `next()` and inspect the response's body. If it contains the sentence we are looking for, it returns 403, otherwise it returns the actual response:

    exports.middleware = function (next) {
       return function (request) {
          var response = next(request);
          if (response.body.join('').indexOf('You shall not pass!')) {
            return {
                body: ['Forbidden!'],
                status: 403,
                header: {'Content-Type': 'text/html'}
            }
          }
          return response;
       };
    };

A more realistic example would be an authentication middleware, which limits access to everyting below the URL "/secret/" to one IP. We have to inspect the incoming request and only if it is authorized will we call `next`, otherwise we return 403:


    exports.middleware = function (next) {
       return function (request) {
          var isSecretPath = request.pathInfo.indexOf('/secret/') === 0;
          var isIpAllowed = request.remoteAddress === "127.0.0.1";
          if (!isSecretPath || isIpAllowed) {
             return next(request);
          }
          return {
            body: ['Forbidden!'],
            status: 403,
            header: {'Content-Type': 'text/html'}
          }
       };
    };

Autologin middleware
---------------------

Enough of the silly examples. If you have not fully groked JSGI middleware yet, do not worry. If you are interested, checkout the many Stick middleware modules. But even if you only have a basic understanding of what's going on (request is coming in, response is being returned) you should be fine for the rest of the tutorial.

The autologin middleware is quite minimal: we just attach a new User object to the session, if it doesn't already have one:

    var {User} = require('../model');
    exports.middleware = function autologin(next) {
       return function (req) {
          if (!req.session.data.user) {
             req.session.data.user = new User({name: req.remoteAddress});
          }
          return next(req);
       };
    };

The User model
----------------

But were does the "User" model come from? We have to add it to our database models: keeping it simple, the User only has a "name" and a "password". Add this to "model.js":

    var User = exports.User = store.defineEntity('User', {properties: {
       "name": {
          type: "text"
       },
       "password": {
          type: "text"
       }
    }});

And we need to modify the Revision model to have a reference to the User object - we want to store which User made that revision. Add a "user" property of type "object" to the Revision:

    var Revision = exports.Revision = store.defineEntity('Revision', {properties: {
      body: {
          type: "text"
      },
      ...cut for clarity...
      user: {
       type: "object",
       entity: "User"
      }
    }});


Remember what I told you about ringo-sqlstore and evolving the database scheme? It does not do it. We defined the mapping for these new properties, but the database on disk does not know about them. You have to delete the database file (or modify it - but that does not seem worth the effort for our test data) and let ringo-sqlstore recreate the whole database.

Saving author information
---------------------------

Okay, so now the database is prepared to store a User per Revision, and thanks to the "autologin" middleware we can rely on always having a User object attached to the session. Now we need logic to actually save the authoring User with each revision. We add a third argument to `Page.updateOrCreate()`, the `user`, and pass it to the revision constructor:

    Page.updateOrCreate = function(slug, obj, user) {
       var page = Page.getBySlug(slug);
       slug = obj.name.replace(/\s/g, '_')
       page.slug = slug;
       var revision = new Revision({
          name: obj.name,
          body: obj.body,
          created: new Date(),
          page: page,
          user: user
       });
       revision.save();
       ....

And of course the view has to pass that argument, so modify the POST edit view:

    app.post('/:slug/edit', function(request, slug) {
       try {
          var revisionId = model.Page.updateOrCreate(slug, request.postParams, request.session.data.user);
          request.session.volatile = "Revision #" + revisionId + " saved succesfully";
       } catch (e) {
          ...
          ...

Now the user should get saved with the revision. Try editing a page to test whether we broke something. Though even if you do not get any errors, there is also currently no way to see our precious new author information.

To make them visible, we need to change the "edit.html". We output the list of revisions as "id, user name". Add the following to our edit template (as always: within the `{% block content %}`):

    <ul>
       {% for rev in page.revisions.all %}
          <li>
             id{{rev._id}}, {{rev.user.name}}
          </li>
       {% endfor %}
    </ul>

We store revisions, now even with User information, but we do not make much use of it. In the next section, we optimize our revision storing by only storing differences, not the full text, and we allow reverting to older revisions.

## Next Step
[9. Java Integration](/tutorial/javaintegration/)