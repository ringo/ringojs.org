
## Starting the Ringo shell

Run the ringo script in the bin directory without arguments:

    $ ./bin/ringo

This should start a shell session with a `>>` prompt. Use the `include`, `require`, or `import` functions to load any RingoJS module.

    >> var fs = require('fs');
    >> var file = fs.read('README.md');
    >> print (file);

Tips:

  * Hitting `Tab` will try to auto-complete your current input.
  * You can scroll through your session history using the Up and Down keys
  * Ringo supports most of JavaScript 1.8 and ECMAScript 5.

## Running the examples

Pass any JavaScript file to ringo to run in:

    $ ./bin/ringo examples/httpserver.js

This will start the RingoJS demo app on port 8080. Access the app in your browser by going to <http://localhost:8080/>

Tips:

  * You can also run an application and the shell at the same time by adding the `-i` or `--interactive` option before the application name
  * Use Ringo's `-h` or `--help` options for more information on available options.
  * Start the debugger with `-d` to get a better insight into your application.

## Starting your own application

To start hacking on your own RingoJS application, use the ringo-admin create script to create a new app:

    $ ./bin/ringo-admin create [app directory]

If you don't pass the app directory on the command line the script will prompt you for it. Once the application has been created you can start it by running its main.js script:

    $ ./bin/ringo [app directory]/main.js

## Packages for Ringo

To install additional Ringo packages you can either use the bare bones `ringo-admin install` command or the more advanced [rp](https://github.com/grob/rp) Ringo package manager.

See the help page on [packages](documentation/packages) for more details.

## Community help

If you don't find what you are looking for please tell us on the [mailing list][group] or in the [IRC channel][irc]!

[group]: http://groups.google.com/group/ringojs
[irc]: irc://freenode.org/ringojs
