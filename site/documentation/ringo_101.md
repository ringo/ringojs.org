# Ringo 101

First things first! [Download Ringo](https://ringojs.org/get_started/),
install it on your system and play around with the [Ringo REPL shell](https://ringojs.org/documentation/commandline_tools/).
If you already know JavaScript or Node.js, this will feel very similar.
Though, Ringo runs on top of the Java Virtual Machine (JVM) and therefor integrates well into the Java ecosystem.
This is similar to other JVM-based languages like Scala or Clojure, but now with JavaScript.


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

Ringo executes JavaScript on a server or a dedicated machine, not inside a web browser context.
This is the major difference if you already know JavaScript from your HTML-based applications.
There is nothing like a `window` object and you don’t have a DOM to manipulate HTML objects.
Though, a lot of things will be as you know them from the browser.
You can debug to the console using `console.log()`, but there is also a dedicated logging module available for more sophisticated logging.

One of the biggest advantages of Ringo is the module system.
Instead of structuring your code by yourself, Ringo already has an easy to use module system.
It’s based on CommonJS modules, which is a specification for server-side JavaScript environments to keep code interchangeable.
If you know modules from Node.js, you also know how to write a module in Ringo.
A module encapsulates JavaScript methods and variables and isolates them from other modules.

## Multi-threaded JavaScript

Typical command line applications and web applications don’t require any special knowledge on Ringo’s multi-threading model.
Using Ringo does not mean explicit multithreading and beginners don’t need to write parallel JavaScript code.
Though, if a program requires special parallel execution, or runs computational expensive tasks in the background,
a developer can choose to use multithreading.

Instead of running every program inside a single-threaded event loop, Ringo uses JVM threads to execute JavaScript in parallel.
To isolated threads from each other, every running program or module is wrapped by a worker.
The worker is the execution context of the program and has its own set of modules and data.
This isolates workers from each other and prevents typical multi-threading issues like concurrent modifications of shared data.
Ringo’s workers are influenced by the W3C Web Worker APIs and use asynchronous message passing for inter-worker communication.
Like W3C Web Workers, each Ringo worker has its own event loop that is guaranteed to run in a single thread,
meaning that scheduled functions and external events will only be processed as soon as no other code is running.
While Ringo workers each have their own set of modules to work on, they do share the global object with its standard constructors
and prototypes. This is safe because the global object in Ringo plays de facto a read-only role.

## Who is behind Ringo?

Ringo is developed by a number of contributors and was started by [Hannes Wallnöfer](https://hns.github.io/) around 2010.
At the moment it is maintained by the people you can find on [the team page](https://github.com/orgs/ringo/people).
One of the major users of Ringo is the Austrian public broadcasting corporation [ORF](http://orf.at).

