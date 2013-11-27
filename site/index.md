Ringo is a CommonJS-based JavaScript runtime written in Java and based on the Mozilla Rhino
JavaScript engine. It takes a pragmatical and non-dogmatic stance on things like I/O paradigms.
Blocking *and* asynchronous I/O both have their strengths and weaknesses in different areas.

[Download the current Ringo 0.10 release!](/download)


Our aim is to provide an off-browser JavaScript platform that has the right mix of features
and simplicity to be pleasant to work with and easy to deploy. The primary goal is to build
a stable, high-performance runtime for server-side use. The following code is all you need to
create a simple web app:

    exports.app = function(req) {
        return {
            status: 200,
            headers: {"Content-Type": "text/plain"},
            body: ["Hello World!"]
        };
    };

    if (require.main == module)
        require("ringo/httpserver").main(module.id);

Simply save the code above as "server.js" and run it by executing `ringo server.js`.
Like most Ringo apps, this app will automatically reload, picking up any changes you make
without requiring a restart.

But Ringo lets you do more than write web applications. It allows you to
seamlessly use any Java class or library simply by dropping it into the classpath.
This makes it easy to integrate Ringo into existing Java environments and reusing existing
Java code works without lots of effort or porting issues.

[Get Started](/get_started) or the [documentation page](/documentation) to learn
more about Ringo!
