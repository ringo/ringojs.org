# Packages

Ringo follows the [CommmonJS packages specification](http://wiki.commonjs.org/wiki/Packages/1.0).
There are two different approaches to install new packages:

## rp - Ringo Package Manager

An easy way to manage packages and their dependencies is the evolving Ringo package manager [rp](https://github.com/grob/rp).
The main benefits of rp over `ringo-admin` is that rp downloads dependencies defined in the packages descriptors.
rp can install any package available in its online registry available at <http://packages.ringojs.org>.

Install rp itself:

    $ ringo-admin install grob/rp

This will make the new `rp` command available in your $RINGO_HOME/bin directory:

    $ rp

## ringo-admin install

`ringo-admin install` is a simple command to download and install any package. The basic mode takes an URL of a zip file
containing the package to install as argument.

    ringo-admin install http://site.com/foo/bar.zip

There is a convenient shortcut for installing packages from a Github repository that allows you to just specify the
Github user and repository name:

    ringo-admin install [github-user]/[repository]

This will fetch and install the current zipball of the repository's master branch,
e.g. `http://github.com/[github-user]/[repository]/zipball/master`.

## What is a package?

A package is a wrapping of modules, code and other assets. Each package must provide a package descriptor,
`package.json`, with the following fields:

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
       "bugs": "http://github.com/foo/bar/issues",
       "licenses": [
           {
               "type": "MIT",
               "url": "https://github.com/foo/bar/blob/master/LICENSE"
           }
       ],
       "engines": {
           "ringojs": ">= 0.11"
       },
       "main": "lib/stick.js"
    }


