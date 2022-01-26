# package.json descriptors

Each package must provide a package descriptor with the name `package.json`. The descriptor holds metadata and detailed
information about the package. It's used by tools like `ring-admin install` to install the package and
to resolve dependencies. The `package.json` file must be valid JSON, not just a JavaScript object literal.

## Example

    {
       "name": "FooBar",
       "version": "0.1",
       "description": "Description of foo is bar",
       "homepage": "https://example.com",
       "keywords": [
           "example",
           "foobar"
       ],
       "author": "Max Mustermann",
       "contributors": [
           "Contributor X"
       ],
       "bugs": "https://github.com/foo/bar/issues",
       "licenses": [
           {
               "type": "MIT",
               "url": "https://github.com/foo/bar/blob/master/LICENSE"
           }
       ],
       "engines": {
           "ringojs": ">= 3.0.0"
       },
       "dependencies": {
           "ringo-sqlstore": ">= 0.5",
           "reinhardt": ">= 0.3",
           "stick": ">= 0.4",
           "gestalt": "=> 0.1"
       },
       "directories": {
           "lib": "myLibFiles"
       },
       "main": "lib/foobar.js"
    }

## Package descriptor details

### name

**Required** A string how your package is called. It should be easy to remember and significant, since it will be used
as argument for the `require()` function. The name of a package must be unique inside a registry. To ensure compatibility
and easy readability it must match this regular expression: `/^[a-z0-9\._\-]+$/` Some guidelines:

* Do not use "js" or "ringo" or "ringojs" in the name.
* Do not use any parts of existing trademarks.
* Check the [existing packages](http://packages.ringojs.org/) and avoid similar names.

### version

**Required** A version string following [semantic versioning](http://semver.org/). Semantic versioning communicates the
 kinds of changes between different releases. It consists of three parts `MAJOR.MINOR.PATCH` and every publication of a
 package should come with a unique version string. If your package is not yet stable, and anything may change at any
 time, use `0.x.x` as version schema. Change the

* `MAJOR` version when you make incompatible API changes
* `MINOR` version when you add functionality in a backwards-compatible manner
* `PATCH` version when you make backwards-compatible bug fixes or minor changes

The version string must be parsable by [ringo-semver](https://github.com/grob/ringo-semver/) to ensure dependency
resolution.

## author / contributors

**Required** A package has to provide an author, or contributors, or both. The author is a simple string property in the
format `Firstname Lastname <mail@example.com> (http://example.com)`, or an object containing a `name`,
`email` (optional), and `web` (optional) property. The contributors array contains a list of author-like strings.

## maintainers

This optional property contains an array of maintainers for the package. This is useful to show which people are
involved in the active development.

## description

A short meaningful and concise description of the package. This will be displayed in the overview.

## bugs

This string property should point to an URL where bugs and issues can be submitted to the maintainers.

## licenses

An array of licenses which apply for the given package. This helps users to identify requirements to use the package.
It is recommended to follow the [SPDX License List](http://spdx.org/licenses/) identifiers.

## engines

This object property indicates which JavaScript engines are required to run the package. It is helpful to see which
release of Ringo is required to install the package, but their are no hard checks against it.

## dependencies

A package should define it's dependencies in an object that maps a package name to a version using semantic versioning.
The `ringo-admin` client tries to resolve all dependencies and installs them together with the package.

## directories.lib

If part of a module id resolves to a package directory, Ringo will try to resolve the remaining part of the id against
the `lib` directory of that package. The location of the `lib` directory can be overridden using the
`directories.lib` property in the descriptor.

## main

A relative path from the package root directory to the main module of this package. For a package named `foo` with the
main module `./lib/main.js`, then Ringo will load this main module path on `require('foo')`.