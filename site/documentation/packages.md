# Packages

Ringo follows the [CommmonJS packages specification](http://wiki.commonjs.org/wiki/Packages/1.0). There are two different approaches to install new packages:

rp - Ringo Package Manager
----

An easy way to manage packages and their dependencies is the evolving Ringo package manager [rp](https://github.com/grob/rp). The main benefits of rp over `ringo-admin` is that rp downloads dependencies defined in the packages descriptors. rp can install any package available in its online registry available at <http://packages.ringojs.org>.

Install rp itself:

    $ ringo-admin install grob/rp

This will make the new `rp` command available in your $RINGO_HOME/bin directory:

    $ rp

`ringo-admin install`
-----------------------------

A tool to simply download and install any package ships with Ringo in the form of the `ringo-admin install` command. The install task takes a URL of a zip file containing the package to install as argument.

To install a package from the web:

    ringo-admin install http://site.com/foo/foo.zip

There is a convenient shortcut for installing packages from a Github repository that allows you to just specify the Github user and repository name:

    ringo-admin install ringo/stick

This will fetch and install the current zipball of the repository's master branch, e.g. `http://github.com/ringo/stick/zipball/master`.

What's a package?
--------------------

A package is a wrapping of modules, code and other assets. Each package must provide a package descriptor, "package.json", with the following fields:

    {
       "name": "FooBar",
       "version": "0.1",
       "description": "Description of foo is bar",
       "homepage": "http://example.com",
       "keywords": [
           "example",
           "foobar"
       ],
       "author": "Max Mustermann",
       "contributors": [
           "Contributor X"
       ],
       "bugs": "http://github.com/hns/stick/issues",
       "licenses": [
           {
               "type": "MIT",
               "url": "https://github.com/hns/stick/blob/master/LICENSE"
           }
       ],
       "engines": {
           "ringojs": ">= 0.9"
       },
       "main": "lib/stick.js"
    }


