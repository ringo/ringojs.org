# Package management

A package is a wrapping of modules, code and other assets. Each package must provide a [package descriptor](../package_descriptors),
`package.json`, which contains various metadata about the package. This information is used by tools to install or
update them. Ringo follows the [CommmonJS packages specification](http://wiki.commonjs.org/wiki/Packages/1.0).
There are two different approaches to install new packages: rp and `ringo-admin`. Since rp has more capabilities and
is connected to the [Ringo Package Registry](http://packages.ringojs.org), it's the recommended tool to use.

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

## rp - Ringo Package Manager

An easy way to manage packages and their dependencies is the evolving Ringo package manager [rp](https://github.com/grob/rp).
The main benefit of rp over `ringo-admin` is that rp downloads dependencies defined in the packages descriptors.
rp can install any package available in its online registry <http://packages.ringojs.org>.

To install rp itself you can use the built-in `ringo-admin` tool:

    $ ringo-admin install grob/rp

This makes the `rp` command available in your `$RINGO_HOME/bin` directory. If called without a command rp
will output the list of available commands:

<pre><code class="hljs nohighlight">$ rp
Available commands:
  cache - Manage the local registry catalog cache
  config - Configure RingoJS package management client
  createuser - Creates a registry account
  email - Change registry account email address
  help - Display available commands
  install - Install a package or package dependencies
  list - Lists installed packages
  owner - Lists and manages package owners
  password - Change registry account password
  publish - Publishes a package
  search - Search for packages in registry
  uninstall - Uninstalls a package
  unpublish - Removes a published package in the registry
  update - Updates installed packages
</code></pre>

To install a package locally in the current working directory use `rp install [packagename]` and rp will look for the
given package name in the registry. If it's found and can be installed, rp creates a `packages` folder and puts the
package inside `packages/[packagename]`. To install a packages in `$RINGO_HOME` add the `--global` option to the install
command. This makes the downloaded package globally available and is useful to load a package in command line tools.
Using rp to install packages does not require an account for the registry. Though publishing a package or becoming a
co-owner of a package requires a registered user.

Look in the **[rp wiki on Github](https://github.com/grob/rp/wiki)** for a more detailed documentation.

### rp for npm users

For node and npm users installing packages with rp should be quite familiar. There are some differences between the npm
package manager and rp:

* `rp` only works with Ringo
* `rp` is used like the `npm` command
* The `packages` folder is equivalent to `node_modules`
* `packages.ringojs.org` is the main package repository

## ringo-admin install

`ringo-admin install` is a simple command to download and install any package. The basic mode takes an URL of a zip file
containing the package to install as argument.

    ringo-admin install http://site.com/foo/bar.zip

There is a convenient shortcut for installing packages from a Github repository that allows you to just specify the
Github user and repository name:

    ringo-admin install [github-user]/[repository]

This will fetch and install the current zipball of the repository's master branch,
e.g. `https://github.com/[github-user]/[repository]/zipball/master`.
