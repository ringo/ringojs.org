# Changelog for RingoJS 1.2.1

Release date: 10 November 2017

This release fixes a major bug introduced with the update to Rhino 1.7.7.2, so we switched back to 1.7.7.1.

## Changes

* Updated to SLF4J to 1.7, [commit](https://github.com/ringo/ringojs/commit/5e968b216ac46234b7ccab4249893ab356576de8)

## Bugfixes

* Revert back to Rhino 1.7.7.1, [commit](https://github.com/ringo/ringojs/commit/017844fc1b2d2d78891d1ecbf3598f2360d5bf50)
* Dropped `Xbootclasspath` which allows Ringo to run on JDK9, [commit](https://github.com/ringo/ringojs/commit/dc8b8cca485b9ec7d1c21740d5e1170c34432723), [#381](https://github.com/ringo/ringojs/issues/381)

## Signed Checksums

Beginning with RingoJS 1.2.1 the release checksums are signed by Philipp Naderer-Puiu with fingerprint `DE2A A9A1 B018 6C2F 622F  D9EF 3F47 C28B 23EB 3072`.

## Contributors

* Robert Gaggl
* Philipp Naderer-Puiu
* Simon Oberhammer
