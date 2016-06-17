# Changelog for RingoJS 0.12

Release date: 17th June 2016

## General
 * Java 8 is required, dropped official support for other versions
 * Updated to Rhino 1.7.7
 * Updated to Jetty 9.3
 * Dropped POSIX wrappers from `fs` module and switched to Java NIO.2
 * Package loader automatically loads JAR files defined in the package descriptor

## Security
 * `ringo/utils/http` supports first-party only cookies
 * Added cookie path check for CTL characters
 * Stricter implementation of RFC 2231 in MIME parser
 * Added two missing unsafe characters to `escapeHtml` in `ringo/utils/strings` (via Mathias Bynens)

## Core and Modules
 * Rewrite of the `fs` module using Java NIO.2
 * Removed `ringo/jsdoc`, `ringo/parser`, `ringo/markdown`, and `ringo/mustache`
 * Server-Sent event support via `ringo/jsgi/eventsource`
 * `ringo/jsgi/connector` changed `handleRequest()` to not expect a module exporting a property  containing the handler function (eg `exports.app`), but also allow  using `module.exports` to export the handler
 * `ringo/httpclient` dropped callbacks since it has never been async
 * `ringo/httpserver` now uses IPv4 127.0.0.1 instead of localhost as default, initializer now respects `jetty.xml`
 * HTTP query parameter parsing: adds support for multi-key parsing, e.g. `?a=1&a=2` becomes an array `a=["1", "2"]`; empty parameters are supported now instead of being dropped
 * `AsyncResponse` uses Servlet 3.1 asynchronous response writes instead of continuations
 * Removed Jetty Continuation support
 * HTTP server's `addWebSocket()` now accepts an optional `onCreate` callback function
 * `ringo/utils/http` fixed to run on Google App Engine
 * `ringo/utils/http` supports complex objects in `urlEncode()`
 * Added more MIME types to the MIME parser
 * Multiple HTTP header support in various modules
 * Resolve `ModuleLoader.java` file descriptor leak points
 * Better `worker.toString()` for easier tracking of individual threads
 * Added response.stream() method to JSGI helper
 * Added a shutdown hook to save the shell history to disk
 * Console module now prints to stderr for .error() and .warn()

## Documentation
 * Improved the module documentation, added a lot of examples
 * Removes old `ringo-doc` command

## Contributors
 * Robert Gaggl
 * Philipp Naderer
 * Simon Oberhammer
 * sclee15
