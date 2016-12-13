Our aim is to provide an off-browser JavaScript platform that has the right mix of features and simplicity to be pleasant to work with and easy to deploy.

### Productivity

We want to make developing with Ringo fun and productive, and that shows on many levels.

Maybe the single most important productivity feature in Ringo is its auto-reloading module loader. It will pick up any changes as you code on a web applications without restarting. And while it is possible to disable reloading for deployment, it is so fast that you can usually leave it on if you want.

Another area we've put a lot of effort in is error reporting. In Ringo you will virtually always get file name and line number information as well as a full JavaScript stack trace with your errors. What you will usually not see (unless you enable it using the -V or --verbose option) are endless Java stack traces. In addition, you'll get detailed descriptions of syntax errors and warnings for missing var declarations, which are hard to debug and can alter the behaviour of JavaScript code in bad ways.

Another major productivity boost is Ringo's Java interoperability. Using the [LiveConnect feature of the Rhino JavaScript engine](https://developer.mozilla.org/de/docs/Rhino) gives you instant access to the gazillion of Java libraries out there. Just put it on your classpath and start using it.

### Stability

While the Ringo [API](https://ringojs.org/api) is still changing, the runtime itself is very solid. Ringo is still a young project, but it is the result of over 10 years of experience of running [server-side JavaScript on top of the Java virtual machine](http://helma.org/). All the underlying components such as Rhino, Jetty, and the JVM itself are mature and solid technologies that have proven themselves in server deployments for years. Unless you do something wrong, Ringo should not crash on you.

<a name="pragmatism"></a>
### Pragmatism

Ringo takes a pragmatical and non-dogmatic stance on things like I/O paradigms. Blocking and asynchronous I/O both have their strengths and weaknesses in different areas.

In a local environment where file system and database latency are low and under your own control, the simplicity and performance of one-thread-per-request paradigm using blocking IO really shines.

On the other hand, if your application operates in a more global environment (making HTTP requests to hosts outside your local network) or is using any kind of long connections (think AJAX or Comet), that's where nonblocking I/O comes into its own.

Ringo supports both paradigms and can adapt to your needs very easily. While standard web applications use a synchronous, one-thread-per-connection model, both HTTP server and client can be operated asynchronously, providing easy scalability to thousands of simultaneous connections. There are also add-on [packages] that build on and extend these asynchronous features.

### Random Links

* [DTSTTCPW](http://c2.com/xp/DoTheSimplestThingThatCouldPossiblyWork.html)
* "***Seek simplicity, and distrust it.***" -- [Alfred North Whitehead](http://en.wikipedia.org/wiki/Alfred_North_Whitehead)
* [Coding conventions](http://javascript.crockford.com/code.html) (to be applied reasonably)
* [Recommended read](http://steve-yegge.blogspot.com/2008/10/universal-design-pattern.html) (again, reasonably)