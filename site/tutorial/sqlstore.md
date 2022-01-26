Object mapping and querying
=============================

In this section, we define our database models and try out ringo-sqlstore's query language. The code in this section is unrelated to the previous ones - that is a feature! We are forced to be modular, and our database logic works without Stick. Because we do not have a web interface for inputing data, we use the Ringo shell to input and test our models.

In a later section, we are going to connect the web routing from the last section with our database logic to produce a dynamic web site.

Instantiating a Store
----------------------

Open a fresh JavaScript file "model.js" where we put our Store instance and any database models. This tutorial uses a [H2](http://h2database.com/) database. H2 is convinient because it ships with ringo-sqlstore and does not require us to setup a database server.

All we need for a H2 store is a file location where H2 can put its data. Assuming that file is "/tmp/tutorial-wiki/data", our instantiation code looks like this:

    var {Store} = require("ringo-sqlstore");
    var connectionPool = module.singleton("connectionPool", function() {
        return Store.initConnectionPool({
            "url": "jdbc:h2:file:/tmp/tutorial-wiki/data",
            "driver": "org.h2.Driver"
        });
    });
    var store = exports.store = new Store(connectionPool);

<div class="knowmore">

 If you want to connect to a MySQL / Postgres database, for example, you have to adapt the `"jdbc:..."` string and the driver name to fit your setup; depending on the database, additional paramters like "username" and "password" might also be needed. Don't forget to put the JDBC driver JARs into Ringo's classpath.

</div>

Once we have a store instance, we can start defining the database "models". Those are called "entities" in Ringo-speak.

Creating database models
----------------------------

Our wiki surely needs a "Page" entity but we do not attach much information to it besides the "slug". The actual content of the page is stored in another entity "Revision" for easier versioning. So this is the whole Page definition:

    var Page = exports.Page = store.defineEntity('Page', {properties: {
        slug: {
           type: "text"
        },
    }});
    store.syncTables();


Time to start a Ringo shell and put something in our database. Assuming you put all of the above - the store instantiation and the Page entity - into `model.js`, we start an interactive Ringo session and load our "model" module:

    $ ringo
    >> var model = require('./model')
    >> var p = new model.Page({'slug': 'Home'})
    >> p.save()
    >> console.dir(p)
    >> // FIXME sqlstore entity "p" should expose all its properties: id and slug

Why is this working? Where did we create the necessary Page table? The store did that for us; the store can not evolve a database schema but it creates tables if they do not yet exist.

Another thing to note is the "id" mapping, which is not visible in our definition but is by default automatically created by ringo-sqlstore.

<div class="knowmore">

The ringo-sqlstore documentation holds much more information about [possibly property types](https://github.com/grob/ringo-sqlstore/wiki/Mapping) and mapping definitions.

</div>

Querying
--------------

If you did not get any errors from the above, we should now have a first Page stored in our database! Let's verify this by trying to retrieve it.

The store instance has a `query()` method which accepts query strings very similar to standard SQL. This query language is provided by ringo-sqlstore and independent from the underlying database.

For example, to retrieve the Page with slug "Home", we write:

    >> model.store.query('from Page where Page.slug="Home"')
    [ [Storable Page] ]

It works, but the output is ugly. At least we can see it is an Array containg one Storable of type "Page". We can improve this by adding a "toString" function to our Page prototype:

    Page.prototype.toString = function() {
       return "Page#" + this.slug;
    }

... then reload the module by re-requiring it, and issue the query again:

    >> var {store} = require('./model')
    >> store.query('from Page where Page.slug="Home"')
    [ Page#Home ]

Much nicer.

<div class="knowmore">

   Did we just pass unescaped data to the database? No! ringo-sqlstore parses the query and will put the literals (like "Home" in the query above) into a paramater array to use with a prepared statement.

</div>

Database relations: "Collections" and "Objects"
------------------------------

Now, the more complex Revision entity: that is the entity where the actual page content, the text and name, lives:

    var Revision = exports.Revision = store.defineEntity('Revision', {properties: {
        body: {
            type: "text"
        },
        name: {
            type: "text"
        },
        created: {
            type: "timestamp"
        }
    }});

 But the Revision is not connected to the Page, yet. We need a one-to-one relation from Revision to Page. ringo-sqlstore makes it easy to define relations because besides the normal field types - text, integer, timestamp, etc. - it also supports two special types: "object" and "collection":

  *  A "collection" is useful for one-to-many relations
  * the "object" type provides one-to-one relations

Look at the mapping for "page" at the bottom of our Revision definition:

    var Revision = exports.Revision = store.defineEntity('Revision', {properties: {
        body: {
            type: "text"
        },
        name: {
            type: "text"
        },
        created: {
            type: "timestamp"
        },
        page: {
            type: "object",
            entity: "Page"
        }
    }});

A one-to-one relation - a "object" mapping - needs to know which kind of entity it references. We specify this with the "entity" property, which has the value "Page" in this example. If you do not specify any additional mapping information, then the Page entity is by default referenced by its id. That is want we want here.

Back into the shell to create a test Revision:

    >> var {Revision} = require('./model')
    >> var revision = new Revision({body: "Quamquam sint sub aqua", name: "Home", created: new Date()})
    >> revision.save()

To connect the revision to the page, we first retrieve the Page instance and assign it to `revision.page`. We could also have done this when construction the revision above, but we will just save the revision again:

    >> var {store} = require('./model');
    >> var pages = store.query('from Page where Page.slug="Home"')
    >> revision.page = pages[0]
    Page#Home
    >> revision.save()

The property "page" on a Revision always gives us the full Page object we hooked it up with; not just the id of the Page. This means we can get the 'slug' from the page attached to a revision by simply querying for the Revision and then using plain property access to access the page properties:

    >> var revision = store.query('from Revision')[0];
    >> revision.page.slug
    'Home'

one-to-many Relations
-----------------

Back to the Page entity. We need a list of revisions for each page and this is were our first one-to-many relation appears. We create a new property "revisions" of type "collection". Each collection needs a query which fills it with entities. Take a look at the code first:

    var Page = exports.Page = store.defineEntity('Page', {properties: {
        slug: {
           type: "text"
        },
        revisions: {
            type: "collection",
            query: "from Revision where Revision.page = :id order by Revision.id desc"
        }
    }});

Note the special ":id". This is a placeholder in the query. ":id" is replaced with the id of the page we are operating on. Now we can finally access revisions from a page:


    >> var {store} = require('./model')
    >> var pages = store.query('from Page');
    >> pages[0]
    Page#Home
    >> pages[0].revisions
    [Collection revisions]
    >> pages[0].revisions.length
    1
    >> pages[0].revisions.get(0).body
    'Quamquam sint sub aqua'

The collection "revisions" behaves like an Array, except the direct access with \[0\] does not work. We have to use "revisions.get(0)".

<div class="knowmore">

 More information about the query language can be found in ringo-sqlstore's [Query documentation](https://github.com/grob/ringo-sqlstore/wiki/Query).

</div>

Interlude: Object.defineProperties
-----------------------------------

We have a clean model setup to store pages and multiple revisions per page. But accessing the current content of a page is cumbersome. It would be nice to easily access the current body of a page without going through `page.revisions.get(0).body`.

<div class="mustknow">

This assumes you now how to define [getters and setters in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties).

</div>

To get easier access to the body of a Page, we define a JavaScript getter which returns the body text:

    Object.defineProperties(Page.prototype, {
        "body": {
            get: function() {
                var currentRevision = this.revisions.get(0);
                return currentRevision.body;
            }
        },
        "name": {
            get: function() {
                var currentRevision = this.revisions.get(0);
                return currentRevision.name;
            }
        }
    });

Since I was already at it, I also added a property "name". We really don't want to display the "slug" to the user unless we have to.

These two entities should be enough to start filling our wiki.

## Next Step
[6. Templates with Reinhardt](/tutorial/templates/)