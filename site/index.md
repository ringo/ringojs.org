<div class="frontpageTeaser">
<img src="/static/ringo-mascot.svg" alt="" id="frontpage-mascot" style="float: left; margin-right: 2.25rem;" width="140">
<h1 style="margin-bottom: 1rem;">Multi-threaded JavaScript on the JVM</h1>

Ringo is a JavaScript platform built on the JVM and optimized for server-side applications.
It takes a non-dogmatic stance on things like I/O paradigms. Ringo ships with a large set of
built-in modules and follows the CommonJS standard.
</div>

<div id="nutshell">

## Ringo in a Nutshell

<ul class="technologyList clearfix">
    <li data-shows="tab1">Stability</li>
    <li data-shows="tab2">Flexibility</li>
    <li data-shows="tab3">Security</li>
    <li data-shows="tab4">Open Source</li>
</ul>

<ul class="technologyDetails">
    <li class="tab1">Ringo is powered by the Mozilla Rhino JavaScript engine, which is embedded in Java 6 as
    the default Java scripting engine and powers thousands of applications. Ringo itself enhances Rhino to run
    multi-threaded code. Ringo's core modules are well tested and documented.</li>
    <li class="tab2">Applications can be deployed on nearly every JVM-based platform. Production-level Ringo
    applications run on large clustered servers, inside Linux containers, on cheap Raspberry Pi micro-computers,
    and on top of cloud platforms like Google App Engine.</li>
    <li class="tab3">Ringo allows you to apply the Java security model on JavaScript applications.
    Developers can provide own security policies and control which resources can be accessed by untrusted code.
    JavaScript applications can be locked into a sandbox to isolate them from the OS.</li>
    <li class="tab4">Ringo and all of its modules are released as open source software and the
    code is hosted on Github. It’s possible to fork, modify and distribute it in source or binary form.
    If you have a very specific question, you can look up the according code and see the detailed implementation.</li>
</ul>
</div>

<script>
$(".technologyDetails li").hide();
$(".technologyDetails .tab1").show();
$(".technologyList li[data-shows=tab1]").addClass("selected");
$(".technologyList").on("mouseenter", "li", function(event) {
    var $this = $(this);
    $(".technologyList .selected").removeClass("selected");
    $this.addClass("selected");
    $(".technologyDetails li").hide();
    $(".technologyDetails ." + $this.data("shows")).show();
});
</script>

### Creating a simple web application

Our aim is to provide an off-browser JavaScript platform that has the right mix of features
and simplicity to be pleasant to work with and easy to deploy. The primary goal is to build
a stable, high-performance runtime for server-side use. The following code is all you need to
create a simple web app:

```
exports.app = function(req) {
  return {
    status: 200,
    headers: {"Content-Type": "text/plain"},
    body: ["Hello World!"]
  };
};

if (require.main == module) {
  require("ringo/httpserver").main(module.id);
}
```

Simply save the code above as "server.js" and run it by executing `ringo server.js`.
Like most Ringo apps, this app will automatically reload, picking up any changes you make
without requiring a restart.

### Command-line Scripting

A very useful feature is the integrated REPL (Read-Eval-Print-Loop). You can enter it by starting
`ringo` without any arguments from the command-line. This brings up a Ringo environment which can be
used for debugging, testing, or just playing around with the runtime. Since the deep Java integration,
it's possible to write CLI tools in JavaScript accessing arbitrary Java libraries.

<script type="text/javascript" src="https://asciinema.org/a/14076.js" id="asciicast-14076" data-speed="2" async></script>

## Integrated into the Java Ecosystem

But Ringo lets you do more than write web applications. It allows you to
seamlessly use any Java standard class or external library simply by dropping it into the
classpath. This makes it easy to integrate Ringo into existing Java environments and reusing
existing Java code works without lots of effort or porting issues.

[Get Started](/get_started) or the [documentation page](/documentation) to learn
more about Ringo!
