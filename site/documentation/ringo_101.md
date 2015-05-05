# Ringo 101

## Ringo is a JavaScript platform

The [ECMA specification](https://people.mozilla.org/~jorendorff/es6-draft.html) for JavaScript describes the language as
<q>an object-oriented programming language for performing computations and manipulating computational objects within a host environment</q>.
Every application written in JavaScript needs a host environment, which provides environment-specific objects and APIs
to perform I/O.
Ringo provides such an environment for JavaScript and ships with a set of modules to make application development easier.
Since its nature as a <q>general purpose programming language</q>, JavaScript can be used to solve a wide range of problems and Ringo helps you to do so.
With Ringo it's easy to write command line tools, sophisticated Web applications, or even GUI applications based on Java's UI technologies.

Scripting languages like JavaScript need an engine to interpret und execute programs. Ringo has not its own engine.
Instead it uses [Mozilla Rhino](https://github.com/mozilla/rhino), a JavaScript implementation in Java.
The initial development of Rhino started back in the Netscape days and has continued until now.
The basic idea is to compile JavaScript programs into Java bytecode, which can be executed by a Java virtual machine (JVM).
Rhino also provides easy access to the Java standard class library and every other Java class.
This makes it easy to integrate existing Java libraries into new JavaScript applications.
For example: Instead of writing its own I/O system, Ringo uses existing Java I/O classes and wraps them to provide easier access from JavaScript.
