# Packages for RingoJS

**Note that packages written for Ringo 0.7 and earlier will usually not work out of the box with Ringo >=0.8!**

The reason is that we simplified package loading. Packages are no longer added to the module search path, so you usually have to add a "main" property to the package.json file pointing to your package's main module.

Installing packages on RingoJS is explained in [Package Management](documentation/package_management). Feel free to add missing or new packages, and add new categories if the existing ones don't fit.

### Networking

 * [ringo-evented](http://github.com/polgfred/ringo-evented) evented networking library based on Netty
 * [ringo-cometd](http://github.com/hns/ringo-cometd) - CometD Bayeux for Ringo web apps
 * [ringo-mail](http://github.com/robi42/ringo-mail) - Send email using `javax.mail`
 * [ringo-xmpp](http://github.com/hns/ringo-xmpp) - Write server-side Jabber/XMPP components
* [forthwith](https://github.com/jabr/forthwith) - A shared, browser-server workspace inspired by now.js.

### Database

 * [ringo-sqlstore](http://github.com/grob/ringo-sqlstore) - object/relational mapper implemented in JavaScript
 * [ringo-hibernate](http://github.com/robi42/ringo-hibernate) - Hibernate object/relational storage implementation
 * [berkeleystore](http://github.com/hns/berkeleystore) - Zero setup embedded store based on Berkeley DB
 * [cassandrastore](http://github.com/hns/cassandrastore) - Client for the Cassandra distributed database
 * [mongodbstore](http://github.com/rist/mongodbstore) - MongoDB storage implementation
 * [narwhal-mongodb](http://github.com/sergi/narwhal-mongodb) - Wraps MongoDB's Java driver. Note: to work with Ringo edit `packages/mongodb/package.json`; change the line that reads `"jars": ["mongo-1.2.jar"]` to `"jars": ["jars/mongo-1.2.jar"]`.
 * [redis-ringojs-client](http://github.com/ngv/redis-client) - A native Ringo client for [Redis](http://code.google.com/p/redis/)
 * [sql-ringojs-client](http://github.com/ngv/sql-ringojs-client) A port of Helmas database module.
 * [ctlr-sqlite](https://github.com/emilis/ctlr-sqlite) Sqlite driver for RingoJS with API similar to ADOdb for PHP.

### Authentication
 * [ringojs-authentication](http://github.com/ngv/ringojs-authentication) Includes a client for authenticating user via ActiveDirectory
 * [ringo-oauth](https://github.com/oberhamsi/ringo-oauth) OAuth implementation for ringo webapps

### Graphics

 * [ringo-processing](http://github.com/chl/ringo-processing) - Write Processing sketches in (modern) JavaScript

### Parsers

 * [lexer](https://github.com/aaditmshah/lexer "aaditmshah/lexer") - An elegant armor-plated JavaScript lexer modelled after flex. Easily extensible to tailor to your need for perfection.
 * [jetson](http://github.com/hns/jetson) - Streaming JSON parser for RingoJS
 * [wraps-tagsoup](http://github.com/chl/wraps-tagsoup) - Use TagSoup to parse HTML into an E4X XML object

### Tools
 * [commonize](http://github.com/hns/commonize) - Converts RingoJS modules to portable CommonJS code
 * [geoip](http://bitbucket.org/oberhamsi/geoip/) - Lookup Location by IP (wrapper around maxmind.com geo DB java API)
 * [ringo-modulr](http://github.com/hns/ringo-modulr) - Client-side CommonJS module implementation
 * [ringo-cijoe](http://github.com/robi42/ringo-cijoe) - A shameless copycat of @defunkt's [CIJoe](http://github.com/defunkt/cijoe)
