# RingoJS 0.5

RingoJS 0.5 was released on May 19, 2010. Get it from the [download page](http://github.com/ringo/ringojs/downloads) on GitHub!

\0.5 is much better than [0.4][release 0.4] in most every respect. These are the highlights:

 * Increased coverage of [API documentation](/api/v0.5)
 * [Package support][Packages], including simple installation via [ringo-admin][Package Management]
 * Updated [Filesystem](/api/v0.5/fs) support, now covers full CommonJS Filesystem/A and Filesystem/A/0 except globbing
 * New [HTTP Client](/api/v0.5/ringo/httpclient) supporting both synchronous and asynchronous operation
 * Upgrade to [JSGI 0.3](http://wiki.commonjs.org/wiki/JSGI/Level0/A/Draft2)
 * Upgrade to Jetty 7 with improved support for [asynchronous JSGI](/api/v0.5/ringo/promise#defer)
 * Several new modules ([base64](/api/v0.5/ringo/base64), [promise](/api/v0.5/ringo/promise), [subprocess](/api/v0.5/ringo/subprocess), [zip](/api/v0.5/ringo/zip), [basicauth](/api/v0.5/ringo/middleware/basicauth))
 * Shared modules are now default, resulting in increased performance and less WTF moments
 * More command line and servlet options, including `production` switch to disable module reloading
 * Evolutionary improvements in [Storage] API

Thanks to everyone who contributed to this release with code, bug reports, or feedback:

 * Panagiotis Astithas
 * Andreas Bolka
 * Chris Langreiter
 * George Moschovitis
 * Peter Newhook
 * Simon Oberhammer
 * Oleg Podsechin
 * Robert Thurnher
 * Samuli Tuomola
 * Hannes Wallnöfer
 * Cheng-Chang Wu