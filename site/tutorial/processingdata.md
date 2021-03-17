A simple edit form
-------------

Displaying data is one thing, but editing and inserting data is more interesting. How do we go about that? The route for our "/edit" view is already defined but it does nothing interesting:

    app.get('/:slug/edit', function(request, slug) {
       return response.html('Edit ', slug);
    });

What it should do, is output a form, pre-filled with the current page. So we change the above view function to render a "edit.html" template with the current "page" in the context:

    app.get('/:slug/edit', function(request, slug) {
      var page = store.query('from Page where Page.slug=:slug limit 1', {slug: slug})[0];
      return env.renderResponse('edit.html', {
         page: page
      });
    });

Note the code duplication in the normal view and this edit view; in both cases we retrieve a page by slug with a long `store.query(....)`. This stinks. Let's extract this page-by-slug lookup into the model. Open up "model.js" and add the static function `Page.getBySlug`:

    Page.getBySlug = function(slug) {
       return store.query('from Page where Page.slug=:slug limit 1', {slug: slug})[0];
    }

... with this new helper method, we can rewrite the above view more concisely as:

    app.get('/:slug/edit', function(request, slug) {
      return env.renderResponse('edit.html', {
         page: model.Page.getBySlug(slug)
      });
    });

We no longer directly talk to the "store", instead I use "model.Page". So you can replace the `var {store} = require('model')` with the simpler:

    var model = require('./model');

That is nice and clean but we are not much closer to actually editing the page.

We have an edit view rendering a non-existing "edit.html" template. This "edit.html" should output a HTML form. The following template code does just that:

    {% extends "base.html" %}

    {% block content %}
    <h1> Edit page </h1>

    <form method="POST" action="./edit">
      <p>
         <label for="name">Page name</label>
         <input name="name" value="{{page.name}}">
      </p>
      <p>
         <label for="body">Page body</label>
         <textarea cols=80 rows=20 name="body">{{page.body}}</textarea>
      </p>
      <p>
         <input type="submit">
      </p>
    </form>
    {% endblock %}

If you access <http://localhost:8080/Home/edit> an edit form with the inputs already prefilled should show up.

But what happens if we open the edit form for a non-existing page? For example <http://localhost:8080/foobar/edit>? "INVALID" shows up in the form. This is what Reinhardt outputs if a property you try to access in a template is `undefined`.

In our case `{{page.name}}` and `{{page.body}}` are certainly `undefined` because the `page` object itself does not even exist. One way around this, is to make the `getBySlug()` return a *new* page if one for the given slug does not exist. That way, we always have a Page object and it is empty if new:

    Page.getBySlug = function(slug) {
      var page = store.query('from Page where Page.slug=:slug limit 1', {slug: slug})[0];
      return page || new Page({slug: slug});
    }

Note that we do not save the newly created page. We return the unsaved Page object.

Try opening the edit form for a non-existing page again. The `INVALID` messages should be gone: <http://localhost:8080/foobar/edit>.

It would be convinient if the "slug" we already specified in the URL would show up as the default "name" of the page. This can be done in the template with a default Reinhardt filter. Change the "name" part of the form to use the `{% firstof %}` tag, which outputs the first non-falsy variable:

    <p>
      <label for="name">Page name</label>
      <input name="name" value="{% firstof page.name page.slug %}">
    </p>

Opening <<http://localhost:8080/foobar/edit> should now present us a form with the slug "foobar" in the "name" input field.

Query- and POST-Parameters
----------------------------------

Okay, but we are *still* not saving the data anywhere. There is a "submit" button but pressing it just leads to a "Error: Unhandled request" page.

What we need is a `app.post()` view to handle the incoming data. As a first step, keep the POST view simple: let's just look at the request object we get from a POST.

    app.post('/:slug/edit', function(request, slug) {
       console.dir(request)
    });

If we press "submit" on the form again, we get greeted with "Error: No valid JSGI response: undefined" because we do not return anything, certainly no valid request.

But more interestingly: what did the `console.dir` output? Something like this:

    {
        jsgi: {},
        headers: {
            host: 'localhost: 8080',
            content-length: '17',
            content-type: 'application/x-www-form-urlencoded',
            referer: 'http: //localhost: 8080/foobar/edit',
        },
        pathInfo: '/foobar/edit',
        method: 'POST',
        env: {
           ...
        },
        input: {
          ...
        }
    }

We have a request with "method" type POST but where is the actual POST data? Stick to the rescue!

By adding the "params" middleware  Stick provides us with new request properties "queryParams", "postParams", and "params". First, configure our Stick application to use the "params" middleware:

    var app = exports.app = new Application();
    app.configure('route');
    app.configure('params');


Second, try submitting the form again to see how the output in the console changes. Three new properties should now be visible:

    ...
    params: {
      name: 'Home',
      body: 'Quamquamsintsubaqua'
    },
    queryParams: {

    },
    postParams: {
      name: 'Home',
      body: 'Quamquamsintsubaqua'
    }
    ...

The next steps are about saving this data to the store. We already met the ringo-sqlstore API in the last section. The tricky part is to have a nice logic so our code works for both cases: whether the page already exists and just needs updating or the page must be created from scratch.


<div class="knowmore">

The params middleware does *not* parse multipart MIME data such as file uploads. Use Stick's [upload middleware](http://ringojs.org/api/stick/stick/middleware/upload/) for that.

</div>

We need another static function on Page to provide the update-or-create logic. The function uses our `Page.getBySlug()` to either retrieve the existing page or get an unsaved stub. After that, the code is the same for both cases: the "name" is converted into a URL-friendly "slug", a new revision is created and both - the new Revision and the Page - are saved. This is pretty straight forward:

    Page.updateOrCreate = function(obj, name) {
       var page = Page.getBySlug(name);
       var slug = obj.name.toLowerCase().replace(/\s/g, '_')
       page.slug = slug;
       var revision = new Revision({
          name: obj.name,
          body: obj.body,
          created: new Date(),
          page: page
       });
       revision.save();
       page.revisions.invalidate();
       page.save();
       return;
    }

There is one new concept in the above code: `invalidate()`. The "revisions" collection on a page needs to be invalidated whenever it changes. Since we implicitely added a new revision to `page.revisions` when creating a new revision, we must invalidate it. This may seem cumbersome but it enables aggressive caching by ringo-sqlstore.

Time to use our new workhorse function in the POST view. Besides "updating or creating" the page, the view should also redirect back to the GET edit view (this is always good practice after a successfull POST):

    app.post('/:slug/edit', function(request, slug) {
       model.Page.updateOrCreate(slug, request.postParams);
       return response.redirect(request.pathInfo);
    });

There is no error handling whatsoever; in real life we should at least deal with the case of a failing save method. We partly do this later on - for now, I'll leave this as an exercise for the reader.

Reverse routing
-----------------

Two more things we should fix: an "edit" link on the wiki page would be nice. And the way we figure out where to redirect to after a POST - `request.pathInfo` - is not very transparent and certainly not good DRY practice.

To figure out the URL of a view, we should rather use Stick's reverse routing capabilities.

Let's look at our routes again. The edit view has this route:

    app.post('/:slug/edit', function(request, slug) {
    ...

Each route has an implicit name, which is derived from the path specification - '/:slug/edit' - by stripping out all placeholders and removing the leading slash; so in this case, the path name is `edit`.

Once we have the name, it is a simple matter of calling `urlFor(app, bindings)` where the `bindings` object holds the view name and any placeholder values. We arrive at the following:


    var {urlFor} = require('stick/helpers');
    ....
    app.post('/:slug/edit', function(request, slug) {
       model.Page.updateOrCreate(slug, request.postParams);
       var url = urlFor(app, {action: 'edit', slug: slug});
       return response.redirect(url);
    });

We could have written this even shorter: `urlFor()` uses the current request's values as defaults for the `bindings` argument. So for the above, a simple `urlFor(app)` would have done the same thing.

<div class="knowmore">
 Even for our simple application reverse routes already bring benefits. The DRY becomes even more obvious if you start using Stick's `mount` middleware which allows you to mount multiple applications (a wiki, a forum, a bug tracker,...) into one big application.
</div>

We are still missing the "edit" link on the wiki page. In our page view function, we pass that link as a context property to the template:

    app.get('/:slug', function(request, slug) {
       var page = model.Page.getBySlug(slug);
       return env.renderResponse('page.html', {
          page: page,
          editUrl: urlFor(app, {action: 'edit'})
       });
    });

... and we have to render the link somewhere in "page.html"; put this within the `{% block content %}`:

    <a href="{{editUrl}}">edit</a>

Voila! We got ourselves a minimal but functional wiki.

## Next Step
[8. Middleware & Sessions](/tutorial/sessions/)