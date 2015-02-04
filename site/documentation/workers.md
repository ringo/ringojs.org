# Workers and multithreading

Multi-threading is hard if its done with threads.
To introduce a good level of abstraction and to hide implementation details, Ringo offers "shared-nothing" workers for parallel execution.
A worker has its own private set of modules and an isolated scope, tied together in a single JVM thread.
Each worker also gets its own single-threaded event loop that behaves just like the event loop in the browser or in node / io.js.
They are inspired by W3C Web Workers and their communication model via the `postMessage()` method and the `onmessage` event handler.
In contrast to their relatively heavy-weight browser counterpart, Ringo's workers are JVM threads and therefore easier to create and more responsive.
To further improve performance Ringo keeps free workers in a queue and only allocates new workers if all existing workers are busy.
Workers help to keep multi-threaded JavaScript free from any common threading pitfalls, like synchronization or locking.

Every worker has its own incoming message queue and a worker's event loop running a single thread can process exactly one message at a time.
If you know the concept of *Actors* from toolkits like [Akka](http://akka.io/), this might sound familiar.

## Creating a worker

A new worker is created by using the `Worker()` constructor of the `ringo/worker` module.
The constructor accepts exactly one argument, which has to be a fully resolved module id.
This creates a new instance of the given module wrapped inside a worker and provides it with a set of modules isolated from all other workers.
To do this, the module and all referenced modules will be reloaded and reinitialized at the beginning.
Thus, each worker operates in its private module environment, making concurrent programming much more predictable than with shared state multi-threading.

    // Module "ringo/worker" exports the Worker constructor
    var {Worker} = require('ringo/worker');
    var workerInstance = new Worker(module.resolve('./someModuleId'));

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

## Shared state

It's a good practice to avoid any shared state in an application. This makes it easier to scale it and prevents critical code paths.
If an application needs to share data over multiple workers, it can use module singletons with the `module.singleton()` method.
The following example shows how a module could share a common database connection pool for all of its instances:

    // there exists exactly one connection pool for all instances of this module
    var connectionPool = module.singleton("connectionpool", function() {
      return new ConnectionPool({
        "url": "jdbc:postgresql://localhost/dbname",
        "driver": "org.postgresql.Driver",
        "username": "dbuser",
        "password": "dbpassword"
      });
    });

    // and every instance of this module can access it
    var connection = connectionPool.connect();


Ringo also shares the global object with all standard constructors and prototypes, but `global` should be used in a read-only way.
Since there are module singletons, avoid the global object to store data.

    // quick and very dirty
    global.config = {
      title: "RingoJS"
    };

## Putting everything together

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

The following sequence diagram roughly shows how the the different modules are executed in separate workers. The JVM starts the
*main-worker* (1) which is only responsible for the execution of the main script we load with the `ringo` command.
The main script posts a new message (2) to a calculator worker, in this case *worker-1*.
It executes the computation and posts back the result, but not to the original *main-worker*,
because the main script is already fully executed and its worker is terminated.
Calling `postMessage()` will always put the message into an event-loop and returns immediately.
So (3) creates a new worker *worker-2* with its own event-loop and puts a message in the loop.
Then *worker-2* pulls the message and runs the last `console.log()`.
Since no worker is active anymore, which also means that all JVM threads are dead and no thread is in the waiting or running state,
the JVM shuts down.

<img src="../images/worker-threads.svg" style="width: 100%; max-width: 550px;" alt="A worker thread sequence diagram" title="" />

## Workers in web apps

Not only application developers can create workers and execute JavaScript in parallel, Ringo also uses them internally at many places.
For every incoming HTTP request the JsgiServlet looks for a free worker in an internal pool of workers.
If all workers are busy a new worker is created, otherwise an idle worker is pulled out of the pool and reactivated.
After a worker has been found, it gets assigned with the web application module and runs it.
This means that Ringo provides a truly multi-threaded web server executing JavaScript web applications.

## Scopes are always single-threaded

Calling a function originating from one worker in another worker basically breaks the single-threaded-ness of the scope in which the function was defined.
This throws an exception at runtime indicating this violation. Instead use message passing with `postMessage()`.