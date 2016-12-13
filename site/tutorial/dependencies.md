Packages for Web development
===============================

Ringo is not particularly tied to web application development even if the focus of this tutorial might make it seem that way.

Because of the inherent modularity of Ringo and its tight standard library, we have to install a couple of packages before we get started with coding our wiki.

Stick, ringo-sqlstore and Reinhardt
--------------------------------------

My library of choice for URL routing is [Stick](https://github.com/hns/stick). Stick also provides us with modules for parsing file-uploads, query parameters, session support, and more.

    stickApplication.get('/Home', function() {
       return response.html('Hello World!');
    });

<div class="knowmore">

Ringo ships with a Httpserver, which follows the [JSGI](http://wiki.commonjs.org/wiki/JSGI) standard, so we could implement a web framework ourselves in JavaScript. We look at how this could be done in the next section of the tutorial. But we will soon rely on Stick to provide some basic scaffolding.

Stick's original author presumably thought it is funny to describe Stick as a "JSGI middleware composition layer and application framework" - which is the technically correct elaboration on "web framework on top of JSGI".

</div>

Another library we want in our tool-belt is [ringo-sqlstore](https://github.com/grob/ringo-sqlstore). A light-weigt ORM for defining our database models, issuing queries and generally [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)ing data.

    sqlStore.query('from Author where Author.name=:name', {name: 'Simon'});

The final piece in our package-puzzle is a template engine. We use [Reinhardt](https://github.com/oberhams/reinhardt) for this tutorial. It is heavily inspired by Django's template language.

    {% for story in stories %}
    <h2>
      <a href="{{ story.getUrl }}">
        {{ story.headline|upper }}
      </a>
    </h2>

Install!
----------

The packages are easy to install with the `ringo-admin` command. `ringo-admin install` understands shortened Github URLs, so we can install the Packages with the following commands:

    ringo-admin install ringo/stick
    ringo-admin install grob/ringo-sqlstore
    ringo-admin install oberhamsi/reinhardt

## Let’s get on with the code …
[3. A Ringo-based web application](/tutorial/httpserver/)