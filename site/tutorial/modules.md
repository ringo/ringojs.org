JavaScript Modules
-------------------------

Ringo follows the [CommonJs] Standard. You will first notice this when dealing with modules. There are multiple JavaScript module patterns out there but in RingoJs you should only use this one:

  * Every file is a module living in its own top-level scope. No special syntax needed
  * Any function or other property, which you attach to `exports` in your module, will be exposed
  * `require('foobar')` returns an object holding all exposed properties of the module "foobar"

An example should make things clearer. A simple module in the file `foobar.js` might look like the following. I want to exposes the function `add` but not the private `adder`:

    // foobar.js
    var adder = function(a, b) {
        return a + b;
    };
    exports.add = function(a, b) {
        return adder(a, b);
    };

You can `require()` it and then access `add` as `foobar.add`:

    >> var foobar = require('foobar');
    >> foobar.add(3,4)
    7

But you can *not* access the private "adder" function:

    >> foobar.adder(2,2)
    ReferenceError

See [Modules in RingoJs] or the post [RingoJS Modules and how to fix the Global Object](http://hns.github.com/2010/07/30/modules.html) for more details.

