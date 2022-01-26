# Get Started

This is a short guide on how to install Ringo on your system. The only essential requirement is the Java Platform, Standard Edition. We recommend Java LTS releases 11 or 17 to run Ringo. You can download Java from:

 * [OpenJDK via Adoptium](https://adoptium.net/) (free; Linux, macOS, Windows)
 * [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) (commonly requires a commercial license)

## Installing Ringo

### Download the latest Ringo release

This is the recommended and straight forward way to install Ringo. Download the latest precompiled release from the
[download page](/download). For convinience, you should add the `/bin` directory to the `PATH` environment variable.

### Hombrew on Mac OS X

If you use the &#127866;Homebrew package manager, you can use the `ringojs` formula:

```
brew install ringojs
```

## Starting the Ringo shell

If you added Ringo to your `PATH` variable, run `ringo` without arguments:

    $ ringo

This should start a shell session with a `>>` prompt. Use the `include`, `require`, or `import` functions to load any RingoJS module.

    >> var fs = require('fs');
    >> var file = fs.read('README.md');
    >> print (file);

Tips:

  * Hitting `Tab` will try to auto-complete your current input.
  * You can scroll through your session history using the Up and Down keys
  * Ringo supports most of JavaScript 1.8 and ECMAScript 5.
  * ES6 support has been improved in RingoJS 3.0

## Running the examples

Pass any JavaScript file to ringo to run in:

    $ ringo examples/httpserver.js

This will start the RingoJS demo app on port 8080. Access the app in your browser by going to <http://localhost:8080/>

Tips:

  * You can also run an application and the shell at the same time by adding the `-i` or `--interactive` option before the application name
  * Use Ringo's `-h` or `--help` options for more information on available options.
  * Start the debugger with `-d` to get a better insight into your application.

## Starting your own application

To start hacking on your own RingoJS application, use the ringo-admin create script to create a new app:

    $ ringo-admin create [app directory]

If you don't pass the app directory on the command line the script will prompt you for it. Once the application has been created you can start it by running its main.js script:

    $ ringo [app directory]/main.js

## Packages for Ringo

To install additional Ringo packages you can either use the `ringo-admin install` command. See the help page on [packages](/documentation/packages) for more details.
