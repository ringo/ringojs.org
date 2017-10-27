# Changelog for RingoJS 1.2.0

Release date: 27 October 2017

## Features & Changes

* updated to Jetty 9.4.7 to prepare JDK 9 support, enables native ALPN/SSL provider, Hazelcast session management, better HTTP2 support, see [commit](https://github.com/ringo/ringojs/commit/a1583486ced3944df100bcba0b07ffad39bcf72f)
* updated to Rhino 1.7.7.2, see [#380](https://github.com/ringo/ringojs/issues/380)
* added new helpers `setHeaders()` and `setContentType()` in the JSGI response module, see [#371](https://github.com/ringo/ringojs/issues/371)
* switched to Java NIO.2 in file system utils `ringo/utils/files`, see [#376](https://github.com/ringo/ringojs/issues/376)
* enabled permissions on a temporary file, see [#379](https://github.com/ringo/ringojs/issues/379)
* added optional custom separator and equals delimiter in `http.urlEncode()`, see [#375](https://github.com/ringo/ringojs/issues/375)

## Bugfixes

* `ringo/term` required both `write` and `writeln` imported to be functional, which has been resolved, see [#377](https://github.com/ringo/ringojs/issues/377)
* a file test failed on Windows [commit](https://github.com/ringo/ringojs/commit/f0e4d242f73ae56c5990072d89bb109e4e5e6892)
* fixed the standard `log4j.properties`, see [#372](https://github.com/ringo/ringojs/issues/372)
* fixed file-based streams if using `response.stream()`, auto-closing now, see [commit](https://github.com/ringo/ringojs/commit/21cacc46b4acfd916aeaf659d5daa17ea7f5a40e)

## Contributors

* Robert Gaggl
* Philipp Naderer-Puiu