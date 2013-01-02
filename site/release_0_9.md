# Changelog for RingoJS 0.9

Release date: 2 January 2013

## New features and major changes

 * new [ringo/worker](http://ringojs.org/api/master/ringo/worker/) module; a Worker API based on W3C Web Workers
    * <http://hns.github.com/2011/11/16/workers.html>
    * worker examples in /examples/ directory of ringo release
 * new [net](http://ringojs.org/api/master/net/) module; provides support for networking using TCP and UDP sockets.
 * [shutdown hooks](http://ringojs.org/api/master/ringo/engine/#addShutdownHook) in `ringo/engine`
 * new layout and design for JsDoc tool `ringo-doc`
 * split ringo.jar into ringo-core.jar (java classes) and ringo-modules.jar (js modules)
 * [ringo/httpclient](http://ringojs.org/api/master/ringo/httpclient/) now based on java.net.URL (ringo/httpclient API unchanged but `Client` constructor removed)
 * pluggable module loaders; more info: <https://github.com/ringo/ringojs/commit/20eee6739da7c69bf93c19d544abc2896df6b7a5>
 * Java and JavaScript [EventAdapters](http://ringojs.org/api/master/ringo/events/)

## Other changes and bugfixes

* [system](http://ringojs.org/api/master/system/) module is no longer preloaded
* remove obsolete and/or obscure global functions: doctest, loadClass, readFile, readUrl, runCommand, toint32, trycatch, enterAsyncTask, exitAsyncTask
* `setTimeout()` / `setInterval()` are now global; ringo/scheduler removed
* `Semaphore` moved into new module `ringo/concurrent`
* return absolute path in `module.resolve()` if resource is a file
* `ringo/promise` callbacks return a promises chain (as they're supposed to)
* renamed `ringo/promise` exports `defer` to `Deferred` and `promises` to `PromiseList`
* `ringo_config` property renamed to `app` in JSGI request
* `fs.touch()` now creates an empty file if no directory or file at the given path exists
* `fs.listDirectoryTree()`, `fs.listTree()`, `fs.Path.listPaths()` return sorted results
* force String return values for `fs.owner()` and `fs.group()`
* avoid unwanted reconfiguration in `ringo/logger`
* `global` works now with sealed globals
* updated mustache.js to support dot notation
* ringo-admin could not remove downloaded files on Windows
* -m/--modules option accepts multiple paths seperated with path.seperator

## Contributors

  * Andreas Bolka
  * Jim Cook
  * Robert Gaggl
  * Philipp Naderer
  * Simon Oberhammer
  * Tim Schaub
  * Hannes Wallnöfer

