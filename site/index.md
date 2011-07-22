# Ringo

Ringo is a CommonJS based JavaScript runtime written in Java and based on the Mozilla Rhino
JavaScript engine.

<span class="large">[Download the final Ringo 0.8 release](/downloads)!</span>

Our primary goal is to build a stable, high-performance runtime for server-side use.
The following code is all you need to create a simpe web app:

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

But Ringo lets you do more than web applications. It allows you to
seamlessly use any Java class or library simply by dropping it into the classpath.
The following code shows how to build a simple desktop application with Swing:

    var {JFrame, JButton} = javax.swing;

    function main() {
        var frame = new JFrame("Hello World!");
        var button = new JButton("Bye bye");
        button.addActionListener(function(e) {
            system.exit();
        });
        frame.add("Center", button);
        frame.setSize(300, 300);
        frame.setVisible(true);
    }

    if (require.main == module)
        main();

See [the Wiki](/wiki) or [documentation page](/documentation) to learn
more about Ringo!
