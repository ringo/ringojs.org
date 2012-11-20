# RingoJS 0.7

RingoJS 0.7 was released on January 31, 2011.

## Changes from 0.6

A list of changes from [release 0.6]:

 * Remove `fs-base` module and fold into `fs`.
 * Do not exit script execution until no more asynchronous ringo/scheduler and ringo/httpclient threads are running.
 * Automatically switch to asynchronous mode if a callback is provided in ringo/httpclient convenience functions (get(), post(), etc).
 * Fix ringo/httpclient tests and include them in the main test suite.
 * Binary Streams now have a forEach() method.
 * It is now possible to address resources outside a repository root with `require()` or `module.resolve()` using relative paths (starting with "./" or "../").
 * Added `--packages=DIR` and `-n`/`--no-packages` command line options to set packages directory and disable packages, respectively.
 * Add lots of new functionality to the [ringo/utils/dates](/api/master/ringo/utils/dates/) module.
 * Include Maven POM build.

## Contributors

The following people directly contributed code to this release:

 * Andreas Bolka
 * Don Brown
 * James Cook
 * Robert Gaggl
 * Maksim Lin
 * Philipp Naderer
 * Simon Oberhammer
 * Tim Schaub
 * Robert Thurnher
 * Hannes Wallnöfer
