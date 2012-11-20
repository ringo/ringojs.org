# Get Started

This is a short guide on how to install RingoJS. See [Documentation](documentation) for an overview of documentation resources.

## Ringo requires Java SE

We recommend the Java SE 6 or higher to run Ringo, which you find at [the Oracle download page](http://www.oracle.com/technetwork/java/javase/downloads/jdk6-jsp-136632.html) or on Debian simply `apt-get install openjdk-6-jre`. However, the minimal required version is Java SE 5.

## Download the latest release

Download the latest Ringo release from the [download page](download). On Debian systems you can install the `.deb` or unpack the archive you downloaded. After that don't forget to add the `/bin` directory to the `PATH` environment variable. Ringo is now ready to use.

## Starting the Ringo shell

Run the ringo script in the bin directory without arguments:

    $ ./bin/ringo

This should start a shell session with a `>>` prompt. Use the `include`, `require`, or `import` functions to load any [RingoJS modules](http://ringojs.org/api/).

    >> var fs = require('fs');
    >> var file = fs.open('README.md');
    >> var lines = [line for (line in file)]; 

Tips:

  * Hitting `Tab` will try to auto-complete your current input. 
  * You can scroll through your session history using the Up and Down keys
  * Ringo supports most of JavaScript 1.8 and ECMAScript 5.

## Running the demo webapp

Simply pass the main file of the app to the ringo command:

    $ ./bin/ringo apps/demo/main.js

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

If you don't find what you are looking for please tell us on the [mailing list][group] or in the [IRC channel][irc]!

[group]: http://groups.google.com/group/ringojs
[irc]: irc://freenode.org/ringojs
