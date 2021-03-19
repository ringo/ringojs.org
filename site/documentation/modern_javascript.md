# JavaScript Support

[RingoJS 2.0.0](https://ringojs.org/documentation/release_2_0_0/) is the first release based on Rhino’s EcmaScript 6 (ES6) engine mode.
It ships with a new and fully re-written HttpServer module, which is mostly compatible with the previous implementation.

Developers must be careful if they use modern JavaScript features or are porting code from other JavaScript runtimes, e.g. Node.
Rhino only implements a subset of the full standard. The most notable additions to previous releases are:

* `let` and `const`, though `const` is not block-, but function-scoped
* arrow functions, e.g. `(x, y) => { ... }`
* `for..of` loops for Arrays and iterables
* octal and binary literals, e.g. `0o10` and `0b10`
* destructuring of arrays and objects, e.g. `let [a, b] = [1, 2]` and `let {x} = { x: 10 }`
* keyed collections built-in objects `Map`, `Set`, `WeakMap`, `WeakSet`
* symbols with the `Symbol` built-in object
* static `Object` methods `Object.assign`, `Object.is`, `Object.getOwnPropertySymbols`, `Object.setPrototypeOf`, `Object.getPrototypeOf`, `Object.getOwnPropertyDescriptor`, `Object.getOwnPropertyNames`, `Object.seal`, `Object.freeze`, `Object.preventExtensions`, `Object.isSealed`, `Object.isFrozen`, `Object.isExtensible`, `Object.keys`
* new `String` methods `codePointAt`, `normalize`, `repeat`, `startsWith`, `endsWith`, `includes`
* basic support for typed arrays

Edge cases might be missing or will not be implemented by the engine. If your code throws a syntax or runtime error,
the corresponding language feature might be implemented in parts only. Classes and generators are not supported.
The Rhino-team tracks implemented language features and the level of conformity [in a compatibility table](http://mozilla.github.io/rhino/compat/engines.html).

## Update policy

There are no plans to migrate to another JavaScript engine with a higher compatibility level. Ringo will be based on Rhino for the foreseeable future.
Ringo follows the Rhino releases as soon as possible. New minor releases may be triggered by a new engine release with additional language features included.

## Reserved keywords

In addition to [ECMAScript keywords][ESkeywords], the following keywords are reserved as top-level package names: 

* `java`
* `javax`
* `org`
* `com`
* `edu`
* `net`
* `android`

They cannot be used as identifiers.

[ESkeywords]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#reserved_keywords_as_of_ecmascript_2015
