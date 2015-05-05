# Changelog for RingoJS 0.11

Release date: 22 December 2014

## Core and Modules

 * Dropped Narwhal support
 * `addToClasspath()` throws an exception if it fails
 * Changed `redirect()` and `notModified()` to return the JsgiResponse instance instead of a plain JS
 * Added missing `removeAllListeners()` proxy method to JavaEventEmitter
 * Added `y64encode`, `y64decode`, `isInt`, `isFloat`, `isUpperCase` and `isLowerCase` to `ringo/utils/strings`
 * Minor improvements in the fs module
 * Removed UTC based calculation for `dates.diff()`
 * Added charset to JsModuleLoader's `getReader()` call
 * Allow setting of session cookie domain and path too
 * `module.resolve()` was broken on windows
 * Made httpserver more configurable

## Documentation
 * Improved the module documentation, added a lot of examples
 * Droped Maven's `pom.xml`: no longer maintained
 * Building a RingoJS-package for distribution now requires an empty /packages directory
 * Fixed JavaDoc errors

## General
 * Switched to Jetty 8
 * Improved the Google App Engine skeleton
 * Dependencies: Instead of .orbit dependency: use direct download for Jetty
 * Adds new ant build target `jsdocs`

## Contributors
 * Manfred Andres
 * Robert Gaggl
 * Philipp Naderer
 * Simon Oberhammer
 * Kwang Yul Seo