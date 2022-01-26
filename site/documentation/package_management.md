# Package management

A package is a wrapping of modules, code and other assets. Each package must provide a [package descriptor](../package_descriptors),
`package.json`, which contains various metadata about the package. This information is used by tools to install or
update them. Ringo follows the [CommmonJS packages specification](http://wiki.commonjs.org/wiki/Packages/1.0).
The recommended approach to install new packages is `ringo-admin install`.

## Packages and Module Lookup

By default packages reside in the `packages` folder of an application for application-specific dependencies, or in the `{$ringo-home}/packages` folder for system-wide packages. It’s best practice not to store any application code into any of these two `packages` folders. The default Ringo configuration adds both `{$ringo-home}/packages` (called the system module path) and `{$current-working-directory}/packages` (called the user module path) to its module lookup. You can provide a custom user module search path with the `-m` command line option.

For example, if you start an application’s main script inside its directory `/home/username/my-app/` with `ringo main.js` and the main script calls `require("foo");`, then Ringo will look in the following package folders for the `foo` module:

1. `/home/username/my-app/packages/foo/`
1. `/path/to/ringojs/packages/foo/`

If you start the script with `ringo -m /my/private/stuff/ main.js`, Ringo’s lookup changes to:

1. `/my/private/stuff/foo/`
1. `/path/to/ringojs/packages/foo/`

To include also the standard user module path, you have to call `ringo -m ./packages/;/my/private/stuff/ main.js`, Ringo’s lookup changes to:

1. `/home/username/my-app/packages/foo/`
1. `/my/private/stuff/foo/`
1. `/path/to/ringojs/packages/foo/`

## ringo-admin install

`ringo-admin install` is a simple command to download and install any package. The basic mode takes an URL of a zip file
containing the package to install as argument.

    ringo-admin install http://site.com/foo/bar.zip

There is a convenient shortcut for installing packages from a Github repository that allows you to just specify the
Github user and repository name:

    ringo-admin install [github-user]/[repository]

This will fetch and install the current zipball of the repository's master branch,
e.g. `https://github.com/[github-user]/[repository]/zipball/master`.

## rp - Ringo Package Manager (Deprecated)

An easy way to manage packages and their dependencies has been the Ringo package manager [rp](https://github.com/grob/rp).
rp can install any package available in its online registry <http://packages.ringojs.org>.
Look in the [rp wiki on Github](https://github.com/grob/rp/wiki) for a more detailed documentation.
