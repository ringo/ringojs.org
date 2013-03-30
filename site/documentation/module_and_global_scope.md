# Module and Global Scope

Scope can be one of the more confusing aspects in JavaScript. (A quick Google
search suggests that the main area of confusion is actually the
this-object in the presence of multiple nested functions. The best way to think
about the this-object is as just another function parameter with special
passing and naming convention. But I'm digressing.)

Scope defines how variable names are looked up. In JavaScript there is a
top-level scope - the global object - and each function gets its own scope,
sometimes called the activation object. These scopes are arranged in a
chain with the nested function's scope using its surrounding scope as parent,
and name lookups moving up the scope chain from child to parent.

Thus, JavaScript is largely [lexically scoped][lexical scope], meaning that
functions can access variables defined in their surroundings. This is good,
because it gives us [closures], one of the things that make JavaScript great.

## Global Scope Flaws in JavaScript

Lexical scope in JavaScript is not without flaws, however. Maybe the biggest
problem is in fact the global object, which is the top level scope shared by all
scripts. If multiple scripts execute in the same context, they all run in the
same top level scope. If they define top level variables with the same name,
the last script wins. This is illustrated in the following diagram:

![scriptscope]

To work around this problem, various workarounds have been adopted, from
using only a single global variable using a special name such as "$" or "_"
to shunning the global scope all together by putting all code within closures.

## Global and Module Scope in Ringo

Ringo solves this problem on a fundamental level by giving each module its
own top level scope to run in. The global object is still there, but it's not
in the scope chain. Instead, it is the prototype of all the module scopes, as
illustrated in the following diagram:

![modulescope]

As can be seen, the global object is no longer the place where variables are
allocated. Regardless of with or without `var`, top level variables will be
created in the module's own scope. The global object with all the standard
objects such as `Object`, `Array`, or `String` is still there, though, providing
an environment that is totally compatible with the one found in browsers.

[lexical scope]: http://en.wikipedia.org/wiki/Scope_(programming)#Lexical_versus_dynamic_scoping
[closures]: http://en.wikipedia.org/wiki/Closure_(computer_science)
[scriptscope]: http://hns.github.com/images/scriptscope.png
[modulescope]: http://hns.github.com/images/modulescope.png