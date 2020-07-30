# Changelog for RingoJS 2.0.0

Release date: 27 July 2020

Ringo’s 2.0.0 release marks an important milestone in the supported JavaScript language features. We bumped the default language version of the underlying Rhino JavaScript engine to EcmaScript 6. Even if [not all features of EcmaScript 6 are supported](https://mozilla.github.io/rhino/compat/engines.html), it’s still a significant step forward.

With 2.0.0 the HttpServer module has been completely rewritten. It supports a fluent configuration style and has renamed misguiding configuration options. The module is battle-tested by the @orfon team in various production environments.

## Breaking Changes

* Default Rhino language version is `ES6` [commit](https://github.com/ringo/ringojs/commit/e6038d75)
* Updated to Rhino 1.7.12 [commit](https://github.com/ringo/ringojs/commit/109cc886288e1b60a9ea2ee51ba90f27992d0fd3)
* Updated to Jetty 9.4.30.v20200611 [commit](https://github.com/ringo/ringojs/commit/aca6aa74)
* Switched to new `httpserver` module by @grob [commit](https://github.com/ringo/ringojs/commit/3bea8a2d)
* Removed fs.workingDirectory(), fixes #393 [commit](https://github.com/ringo/ringojs/commit/8f9f38b5)

## New Features

* Added supportsFileAttributeView() to file utils [commit](https://github.com/ringo/ringojs/commit/b1c99efb)
* Hardened default ssl configuration [commit](https://github.com/ringo/ringojs/commit/d709501d)
* HttpClient's user agent includes its corresponding Ringo version [commit](https://github.com/ringo/ringojs/commit/1a055d52)

## Bugfixes

* Fixed `JAVA_HOME_DIRS` to work in Docker builds [commit](https://github.com/ringo/ringojs/commit/f1a99c6f)
* Adds AdoptOpenJDK's `HOME_DIR` to deb package rules [commit](https://github.com/ringo/ringojs/commit/d404077d)
* Updates debian package configuration [commit](https://github.com/ringo/ringojs/commit/602ed06c)
* Fixed #404 to improve compatibility with the new HttpServer module [commit](https://github.com/ringo/ringojs/commit/9b0af31a)
* Adds additional test for new date methods [commit](https://github.com/ringo/ringojs/commit/1dced8fd)
* Removes GAE workaround, fixes #367 [commit](https://github.com/ringo/ringojs/commit/6ee770fe)
* Dates test need to run in local time [commit](https://github.com/ringo/ringojs/commit/3d075007)
* Adds java.time helpers, fixes 394 [commit](https://github.com/ringo/ringojs/commit/753d9f24)
* Harmonizes toISOString() with Date [commit](https://github.com/ringo/ringojs/commit/ae73d929)
* POSIX permissions won't work on Windows [commit](https://github.com/ringo/ringojs/commit/93f235ec)
* Fixed classloader error with Java 9+ [commit](https://github.com/ringo/ringojs/commit/b21d8908)
* Changed order of module scope modifications [commit](https://github.com/ringo/ringojs/commit/acbdb413)
* Only set executable permissions on non-Windows filesystems, as `fs .changePermissions()` throws on Windows [commit](https://github.com/ringo/ringojs/commit/c31e9b4e)

## Contributors

* Robert Gaggl
* Philipp Naderer-Puiu
* Simon Oberhammer
