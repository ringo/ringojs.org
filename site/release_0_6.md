# RingoJS 0.6

RingoJS 0.6 was released on September 30, 2010.

 * [API Documentation](http://ringojs.org/api/v0.6/)
 * [Downloads](http://github.com/ringo/ringojs/downloads)

Here are the major changes since [release 0.5]:

 * Significant improvements in the following modules
      - [ringo/httpclient](/api/v0.6/ringo/httpclient/)
      - [ringo/httpserver](/api/v0.6/ringo/httpserver/)
      - [ringo/parser](/api/v0.6/ringo/parser/)
      - [ringo/subprocess](/api/v0.6/ringo/subprocess/)
 * Moved core/* module s to ringo/utils/* namespace, no more extending of standard JS objects.
 * Improved jsdoc support, new ringo-doc command line tool for creating static API documentation.
 * CommonJS compliant [unit testing](/api/v0.6/assert).
 * Fixes and added tests for skins (templates)
 * Improvements in webapp framework:
     - New [static](/api/v0.6/ringo/middleware/static/) middleware for serving files
     - Improved and redesigned [Request](/api/v0.6/ringo/webapp/request/) and [Response](/api/v0.6/ringo/webapp/response/) objects
     - Redesigned skeleton application
     - Redesigned error/notfound pages and middleware
     - [AsyncResponse](/api/v0.6/ringo/webapp/async/) for fully streaming, asynchronous responses
     - [WebSocket](/api/v0.6/ringo/webapp/websocket/) support out of the box
 * Allow Ringo to run with modules bundled in ringo.jar file
 * Add static API documentation for core JavaScript modules and Java classes

A full list of commits since 0.5 is  [available on GitHub](http://github.com/ringo/ringojs/compare/v0.5.0...v0.6.0).

The following people directly contributed code to this release:

 * Andreas Bolka
 * Robert Gaggl
 * George Moschovitis
 * Simon Oberhammer
 * Robert Thurnher
 * Hannes Wallnöfer
 * Garry Yao

A lot more contributed ideas, bug reports and code on the [mailing list](http://groups.google.com/group/ringojs). Thanks to everybody!
