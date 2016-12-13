# RingoJS 0.4

The first release under the new name **RingoJS**. Since 0.3, most notably [CommonJS] compliance was pushed on and the [web application][web framework] modules fleshed out or improved. Lower level enhancements include optimizations regarding code caching, resource loading and bringing in the new [ECMAScript 5](http://ejohn.org/blog/ecmascript-5-objects-and-properties/) and [JavaScript 1.8](https://developer.mozilla.org/en/New_in_javascript_1.8) features from [Rhino].

Other highlights of this release:

 * New `unittest` module; we are now shipping with [235 tests](http://ringojs.org/demo/testing).
 * New `jsdoc` module; powering the [API docs](http://ringojs.org/api/) web app.
 * POSIX support; using JRuby's [jnr-posix](http://github.com/wmeissner/jnr-posix/blob/master/src/org/jruby/ext/posix/POSIX.java) libraries.
 * New admin script for creating web app scaffolding; also simplifies Google App Engine deployment.
 * New [logging](http://ringojs.org/demo/logging) module; based on log4j/SLF4J.
 * Lots of new JSGI [middleware]; gzip, etag, transaction, profiler, ...
 * New CLI arguments parser in pure JS.


Pre-built downloads for Linux, Mac and Windows: <http://github.com/ringo/ringojs/downloads>

[Our](http://ringojs.org/wiki/Community/) new site, fully [powered](http://ringojs.org/wiki/Colophon/) by RingoJS, is <https://ringojs.org/>.

RingoJS 0.4 also contains some bleeding-edge features. We are fleshing out the details on those, but they are usable:

 * Fine-grained sandboxing for applications.
 * Storage overhaul (Storable API functional with file-, mem-, and googlestore implementations available).
 * Multi-engine setups.
 * Support for serving virtual hosts.