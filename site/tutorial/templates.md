Templates
------------

We have database logic to store and retrieve the pages, and a simple URL routing which calls the right view function. The next step is to put this together. Outputting plain text without help from a template engine is cumbersome. Luckily, we have Reinhardt.

Reinhardt is heavily inspired by Django's template language. If you know Django, this will look familiar to you:

    <title>{% block title %} Default Title {% endblock %}</title>
    <ul>
    {% for page in pages %}
      <li><a href="{{ page.url }}">{{ page.body }}</a></li>
    {% endfor %}
    </ul>

A Reinhardt environment
------------------------

Reinhardt is instantiated by creating an Environment. The environment holds the configuration of the template engine and exposes functions to render templates.

To create a simple Reinhardt Environment which loads its templates from a folder './templates/', we add this somewhere at the top of "main.js":

    var {Environment} = require('reinhardt');
    var env = new Environment({
       loader: module.resolve('./templates/')
    });

Now we need a template file to render, and we need to use the environment to actually render that template.


Template inheritance
---------------------

Before we go about writing our templates, one word about Reinhardt templates: the most powerful and also the most complex part of the template engine is "inheritance". It is so incredibly useful, that I assume you have read and understood [the relevant section from Django's excellent documentation](https://docs.djangoproject.com/en/1.4/topics/templates/#template-inheritance).

In short, you define a "skeleton" template which holds the common "blocks" of your site (e.g.: navigation, content, header, footer, etc). Then your actual templates can "extend" this skeleton template and subsitute some or all of the blocks defined in the skeleton.

Basic template setup
-----------------------------

Our skeleton template is "templates/base.html" and it has only one overwritable block, namely "content":

    <!DOCTYPE html >
    <html>
    <head>
        <title>{{page.name}} - Wiki</title>
    </head>
    <body>
        <div class="wrapper">
            {% block content %}
               Default content
            {% endblock %}
        </div>
    </body>
    </html>

Remember: the above is just our skeleton template. The template we actually render to display wiki pages is called "page.html". It extends the skeleton template and overwrites its `{% block content %}`. Inside this block, the template outputs the capitalized name of the page as well as its body. This is how our "page.html" looks like:

    {% extends "base.html" %}

    {% block content %}
    <h1>{{page.name|capfirst}}</h1>

    <div>
       {{page.body}}
    </div>

    {% endblock %}


Now that we have a template to use, we modify the view to actually render it with `env.renderResponse(template, context)`. The context object passed to the template contains only one property: the page.

    app.get('/:slug', function(request, slug) {
       var page = store.query('from Page where Page.slug=:slug limit 1', {slug: slug})[0];
       return env.renderResponse('page.html', {
          page: page
       })
    });

Did it work? If not: are the templates in the right directory? Did you instantiate an environment? Is the example data from the last section still in the DB? If everything is correct, you should get a HTML response from <http://localhost:8080/Home>.

## Next Step
[7. Processing Data](/tutorial/processingdata/)