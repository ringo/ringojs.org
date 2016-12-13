Whetting Your Appetite
===============================

Ringo is a JavaScript environment based on the [Rhino JavaScript engine](https://developer.mozilla.org/de/docs/Rhino).

Compared to a browser environment, the JavaScript we have in Ringo is more modern and it comes with CommonJS compliant module and package support.

When writing Ringo code you should make use of Ringo's standard library; all modules in the standard library are written in Javascript. They are either pure JavaScript or thin wrappers around existing Java libraries. This means you can always dig into the code and look at how we do things without switching languages.

The [API documentation](https://www.ringojs.org/api/master/) has a good overview of all modules available in the standard library with a short explanation of what they do.

Modern JavaScript
--------------------

Ringo supports all [JavaScript 1.7](https://developer.mozilla.org/en-US/docs/JavaScript/New_in_JavaScript/1.7) and [1.8](https://developer.mozilla.org/en-US/docs/JavaScript/New_in_JavaScript/1.8) features.

For example, one feature we regularly use is destructuring assignment. It is best explained through an example:

    var a = 1;
    var b = 2;
    [a, b] = [b, a];

After executing this code, `b` is 1 and `a` is 2. This works for objects too; you can write the following:

    var {foo} = {foo:1, bar:2};

After executing the above `foo` is 1. A common use for destructuring assignment is loading only singles classes or functions from a module, for example:

    var {ZipFile} = require('ringo/zip');

The above code will only load the class "ZipFile" from the module "ringo/zip".

Interactive JavaScript shell
----------------------------------

These code examples cry for being tried out. The Ringo shell makes this easy. Start ringo without any parameters to drop into the shell:

    $ ringo
    >>

The shell greets you with two `>>`.


<div class="mustknow">

When I write `$ ringo` I mean "start your Ringo". You will have to figure out how to do this on your system. If you are on Windows, the actual call might be longer, more similar to the following:

    C:\ringojs\bin\ringo

</div>

A classic hello world:

    $ ringo
    >> console.log('Hello World');
    Hello World

"console" is one of the few globals always available in Ringo. "console" is for logging and debugging, and I use it in this tutorial to inspect new objects. We can use `console.dir()` to inspect the properties of any object:

    >> console.dir(console)
    { log: [Function],
      error: [Function],
      warn: [Function],
      info: [Function],
      trace: [Function],
      assert: [Function],
      time: [Function],
      timeEnd: [Function],
      dir: [Function] }



<div class="knowmore">

See the API [documentation on globals](https://www.ringojs.org/api/master/globals/) for a complete list of global variables and functions provided by Ringo.

</div>

A more real-life example: let's query twitter's JSON API and inspect what we get back. We load the `ringo/httpclient` module and use its `get()` method to retrieve the response:

    $ ringo
    >> var httpclient = require('ringo/httpclient');
    >> var url = 'https://api.twitter.com/1/statuses/user_timeline.json?screen_name=ringojs&count=1';
    >> var result = httpclient.get(url);
    >> console.dir(result);
    {
      connection: [sun.net.www.protocol.https.HttpsURLConnectionImpl sun.net.www....],
      done: true,
      content: '[{"created_at":"Fri Jun 29 11:18:32 +00002012","id":218664746029821952,"id_s....]'
      contentBytes: [ByteArray 1804]
     }

If you are unsure what methods a module provides, type until the "." and press TABulator to see all options. For example:

    assert(    dir(       error(     info(      log(       time(      timeEnd(   trace(     warn(
    >> console. // I hit TAB here

<div class="knowmore">

If I mention or use a module withouth explaining it much and you feel lost, it is a good idea to look it up in the [API documention](https://ringojs.org/api/master/).

</div>

## Modules

If you do not know CommonJS modules or modules from Node, then you should read the [Modules in Ringo](https://www.ringojs.org/documentation/modules) introduction.

## Next Step …
You are now prepared for the next step of the tutorial:<br>
[2. Installing Packages](/tutorial/dependencies/)