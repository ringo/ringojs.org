[Stick] is a modular JSGI middleware composition layer and application framework based on the [Modular JSGI] spec.

<https://github.com/hns/stick>    
<http://hns.github.com/stick>

[Stick]: http://hns.github.com/stick/

## Stick Tutorial for Windows

Step 1: Download the latest release of Ringo: http://ringojs.org/downloads

Step 2: Unzip the binary distribution file. In this example it's located at `E:\tutorial\ringojs-0.8`

Step 3: Run `ringo-admin` to install packages for Ringo. For stick run the following command:

    PS E:\tutorial\ringojs-0.8\bin> .\ringo-admin install hns/stick

Step 4: ringo-admin is now downloading the package from github.com and places it into the `packages` directory:

    Downloading http://github.com/hns/stick/zipball/master
    [... lots of files ...]
     + E:\tutorial\ringojs-0.8\\packages\stick\lib/middleware/session.js
     + E:\tutorial\ringojs-0.8\\packages\stick\lib/middleware/static.js
     + E:\tutorial\ringojs-0.8\\packages\stick\lib/middleware/upload.js
     + E:\tutorial\ringojs-0.8\\packages\stick\lib/stick.js
     + E:\tutorial\ringojs-0.8\\packages\stick\package.json
     + E:\tutorial\ringojs-0.8\\packages\stick\test/stick_test.js
     + E:\tutorial\ringojs-0.8\\packages\stick\update-docs.sh
    Done

Step 5: Now you have installed Stick. To run the example application execute the `ringo` start script with the module search path pointing inside the Stick example directory:

    PS E:\tutorial\ringojs-0.8\bin> .\ringo -m E:\tutorial\ringojs-0.8\packages\stick\examples\ demo.js
    0    [main] INFO  org.eclipse.jetty.util.log  - jetty-7.4.1.v20110513
    45   [main] INFO  org.eclipse.jetty.util.log  - started o.e.j.s.ServletContextHandler{/,null}
    60   [main] INFO  org.eclipse.jetty.util.log  - Started SelectChannelConnector@0.0.0.0:8080 STARTING
    61   [main] INFO  ringo.httpserver  - Server on http://localhost:8080 started.

Step 6: Open http://localhost:8080/ :-)

### Run your own application

Step 7: Create a file `main.js` inside the directory `E:\tutorial\myapp\` and paste:

    var {Application} = require("stick");    

    var app = Application();    

    app.configure("route");
    var response = require('ringo/jsgi/response');    

    app.get("/", function(req) {
       return response.html("<html><h1>vicstick is up and running!</h1><p>*drum drum drum*</p></html>");
    });    

    if (require.main === module) {
       
       require("ringo/httpserver").Server({
          app: app, // a JSGI application
          port: 8080  // the port to listen for incoming requests
       }).start();
       
    }

Step 8: Start your application with:

    PS E:\tutorial\myapp> ..\ringojs-0.8\bin\ringo -m . main.js