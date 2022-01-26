# Modules in Ringo

Ringo implements the [CommonJS Modules](http://wiki.commonjs.org/wiki/Modules/1.1) specification. In short this means:

  * Every JavaScript file is treated a module living in its own top-level scope.
  * Any function or property attached to a module's `exports` object will be exposed.
  * The `require()` function returns a module's `exports` object.
    * If the given [identifier string](#identifiers) starts with `./` or `../` Ringo's module loader searches for a file and tries to load it.
    Therefore `require('./foo')` advices Ringo to load the file `./foo.js` as module.
    * Otherwise Ringo looks for the module in every folder of the [module path](#modulepath).

The CommonJS module specification is also the foundation behind Node's module system, so for Node developers modules
in Ringo are quite familiar.

## Anatomy of a module

In Ringo every JavaScript file is treated as a module. When a module is
executed, Ringo provides it with the means to import functionality from and
export functionality to other modules.

An example should make things clearer. A simple module in the file `simplemath.js` might look like
the following. It exposes the function `add`, but not the private `adder` function:

    // simplemath.js
    var adder = function(a, b) {
        return a + b;
    };
    exports.add = function(a, b) {
        return adder(a, b);
    };

You can `require()` it and then access `add` as `simplemath.add()`:

    >> var simplemath = require('./simplemath');
    >> simplemath.add(3,4)
    7

But you can *not* access the private "adder" function:

    >> simplemath.adder(2,2)
    ReferenceError

Ringo also provides a `module` object to each module with the following
properties:

 * `id` - the canonical id of the module
 * `path` - the file path of the module resource
 * `uri` - the URL of the module resource
 * `exports` - assigning to this property allows modules to replace the
    default exports object.

Modules are executed in their own private scope. Thus, everything defined in
a module, which is not explicitly exported, is private to the module and invisible
to other modules. Variables (unintentionally) declared without `var` will be only
*global to the module*. This keeps the global scope isolated from the potential
module scope leaks. The global object is accessible through the implicit `global`
variable. Good application design avoids the global variable! Otherwise shared global
state is introduced, which is a fundamental anti-pattern in Ringo.

<h2 id="identifiers">Module identifiers</h2>

The string that identifies a module is called a module id.

The module id corresponds to the file name of the module with the `.js`
extension omitted.

Module ids starting with `'./'` or `'../'` are called relative ids. Relative ids
are looked up relative to the location of the current module following common
file system semantics.

A module id not starting with `'./'` or `'../'` is called an absolute id and is
resolved against the module path.

<h2 id="modulepath">The module path</h2>

The module path is a list of standard locations in which Ringo will look for
modules.

The module path can be set in the following ways:

 * Setting the `RINGO_MODULE_PATH` environment variable.

 * Setting the `ringo.modulepath` Java system property.

 * Using the `-m` or `--modules` option to the `ringo` command-line tool.

 * Using the `module-path` servlet init parameter with JsgiServlet.

 * Adding or removing elements to the `require.paths` Array-like property
   from within Ringo.

## Packages

*Note: `ringo-admin` is the recommended [package management tools for Ringo](../package_management).*

Packages provide a means of bundling several modules and other resources into
one unit. Packages are directories that contain a `package.json` package descriptor file.
The `main` property in the `package.json` descriptor is recognized by Ringo's module loader as
the main entry point for a module:

    {
        "main": "lib/main.js"
    }

If a module id resolves directly to a package directory and `package.json`
defines a `main` property, Ringo will try to load the specified resource.
The value of the `main` property must be a path relative to the package root.

If a module id resolves to a directory that does not contain a `package.json`
file, or `package.json` does not define a `main` property, Ringo will try to
load file `index.js` in that directory.

If part of a module id resolves to a package directory, Ringo will try to
resolve the remaining part of the id against the `lib` directory of that
package. The location of the `lib` directory can be overridden using the
`directories.lib` property in package.json.

    {
        "directories": {
            "lib": "new-lib"
        }
    }

## Caching and reloading

Modules are cached after they are loaded for the first time. Ringo tries to
resolve module ids to a canonical path in order to not load the same module
twice, but it is possible under rare circumstances that this fails and a module
is loaded twice.

By default, Ringo's module loader checks if the module or any module it depends
on has changed each time it is required. If so, the module is loaded again.

To disable module reloading run ringo with the `-p` or `--production` option,
or set the `production` servlet init parameter to `true`.

## Ringo module extensions

The CommonJS modules specification was kept deliberately small. Ringo provides
some extra niceties for exporting and importing stuff. The downside to using
these is that your code is tied to Ringo, but it's relatively easy to convert
the code to "pure" CommonJS, and there's also a [command line tool](https://github.com/hns/commonize)
for that purpose.

One Ringo extension is the `include` function. This is similar to `require`, but
instead of returning the other module's exports object as a whole it directly
copies each of its properties to the calling module's scope, making them
usable like they were locally defined.

`include` is great for shell work and quick scripts where typing economy is
paramount, and that's what it's meant for. It's usually not a great idea to use
it for large, long lived programs as it conceals the origin of top-level
functions used in the program.

For this purpose, it's more advisable to use `require` in combination with
JavaScript 1.8 destructuring assignment to explicitly include selected
properties from another module in the local scope:

    var {foo, bar} = require("some/module");

The above statements imports the "foo" and "bar" properties of the API exported
by "some/module" directly in the calling scope.

On the exporting side, Ringo provides an `export` function that takes a variable
number of local variable names to be exported from the current module.
Internally, this just copies the given variables to the module's exports object,
so it's just a way to keep a module's exports in one place.

    export("foo", "bar", "baz");