# Workers

Multi-threading is hard if its done with threads.
To introduce a good level of abstraction and to hide implementation details, Ringo offers "shared-nothing" workers for multi-threading.
A worker has its own private set of modules and an isolated scope, tied together in a single JVM thread.
Each worker also gets its own single-threaded event loop that behaves just like the event loop in the browser or in node / io.js.
They are inspired by W3C Web Workers and their communication model via the `postMessage()` method and the `onmessage` event handler.
In contrast to their relatively heavy-weight browser counterpart, Ringo's workers are JVM threads and therefore easier to create and more responsive.
To further improve performance Ringo keeps free workers in a queue and only allocates new workers if all existing workers are busy.
Workers help to keep multi-threaded JavaScript free from any common threading pitfalls, like synchronization or locking.

Every worker has its own incoming message queue and can only process one single message at a time.
If you are familiar with the concept of *Actors* in frameworks like [Akka](http://akka.io/), this might sound familiar.

## Creating a worker

A new worker is created by using the `Worker()` constructor of the `ringo/worker` module.
The constructor accepts exactly one argument, which has to be a fully resolved module id.
This creates a new instance of the given module wrapped inside a worker and provides it with a set of modules isolated from all other workers.
To do this, the module and all referenced modules will be reloaded and reinitialized at the beginning.
Thus, each worker operates in its private module environment, making concurrent programming much more predictable than with shared state multi-threading.

    // Module "ringo/worker" exports the Worker constructor
    var {Worker} = require('ringo/worker');
    var workerInstance = new Worker('someModuleId');

## Message passing

Messages passed to a worker don't need any JSON serialization, because all workers share the same native prototypes and constructors.
This is a big difference from the W3C spec, where all messages are serialized into a JSON string and this costs performance.
The `postMessage()` method can be used to send a message to a worker, which handles the incoming message in its `onmessage` event handler.
The `onmessage` handler is directly called by the worker's thread and doesn't need to be exported by the worker's module.
A running worker can post back a message to its event source by calling `event.source.postMessage()` in its event handler.

This example show a minimal module which can receive messages and posts back to the event's source:

    function onmessage(event) {
      console.log('Got a message:' + event.data);
      // Post a message back to the event source
      event.source.postMessage('Processed.');
    }

### Putting everything together

In the following example a worker is created in the main script and a message is passed to it.
It is important to use `module.resolve` to pass in the correctly resolved path to the `Worker` constructor.
Otherwise the constructor will not find the module and throws an exception.
After the worker finished its calculation, the result will be printed by the `onmessage` callback in the main script.
To illustrate that the main script finishes *before* the the worker has finished with its calculation, a simple debug message is printed on the console.

    // main.js
    var {Worker} = require('ringo/worker');

    var workerInstance = new Worker(module.resolve('./calculator'));

    workerInstance.onmessage = function(event) {
      console.log('The result is: ' + event.data.result);
    };

    workerInstance.postMessage({
      a: 5,
      b: 3
    });

    console.log('main script finished');

The calculator module itself is straightforward and has only the `onmessage` method:

    // calculator.js
    function onmessage(event) {
      console.log('Received message: ' + JSON.stringify(event.data));

      var a = event.data.a;
      var b = event.data.b;
      var result = 0;

      // 'Complex' stuff ...
      while (result < 90000000) {
        result += Math.abs(a) + Math.abs(b);
      }

      event.source.postMessage({
        'result': result
      });
    };

When calculator worker receives a message from the main script, it extracts the two operands into `a` and `b`.
Then a loop simulates a complex calculation. Since it takes a while to sum up until 9,000,0000, the main script
finishes before the calculator jumps out of the loop. At the end the worker posts back the result and terminates.
If we start the program with `ringo main.js` the output will look like this:

    PS C:\worker-demo> ringo .\main.js
    main script finished
    Received message: {"a":5,"b":3}
    The result is: 90000000

## Shared state

It's a good practice to avoid any shared state in an application. If an application needs to share data over multiple workers,
it can use module singletons. Ringo shares the global object with all standard constructors and prototypes, but `global` should
be used in a read-only way.