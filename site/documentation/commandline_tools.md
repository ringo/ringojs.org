# Command line tools

Ringo comes with a command line tool `ringo` to run script files and to enter an interactive shell. It's recommended
to add the `/bin` directory of the Ringo installation to the `PATH` system variable. To start an interactive shell,
also known as REPL (Read-Eval-Print-Loop), launch the `ringo` command line tool without any arguments.

<script type="text/javascript" src="https://asciinema.org/a/14076.js" id="asciicast-14076" data-speed="2" async></script>

## Executing a command line script

Writing command line scripts with Ringo is straightforward. Every arbitrary JavaScript file can be passed as `[script-file]`
argument to the `ringo` command:

`ringo [script-file] [script-arg1] [script-arg2] ...`

Ringo loads the script file and provides the argument via the system module's `args` array. The first element in the
`args` array is the script file's name.

### Modules of particular interest for command line applications

  * [system](/api/master/system/) &ndash; provides access to the system environment
  * [ringo/shell](/api/master/ringo/shell/) &ndash; preloaded module in every Ringo REPL
  * [ringo/args](/api/master/ringo/args/) &ndash; parser for command line options
  * [ringo/term](/api/master/ringo/term/) &ndash; ANSI terminal color and style
  * [ringo/subprocess](/api/master/ringo/subprocess/) &ndash; spawning separate processes

## Detecting invocation as main script

To make a script work both as a command and as a module, use this boilerplate code:

    function main(args) {
        // your code
    }

    // is this the main module executed?
    if (require.main === module) {
        main(require('system').args);
    }

This will call function `main` only if the script is run as a command line script. Otherwise it will act like an
ordinary module. The `require` and `module` objects used in this boilerplate code are provided by Ringo.

## Passing Java and Ringo options

In addition to the command specific options, all commands will pass any options prefixed by `-J` to the underlying java runtime. For example, use the folloging command to run ringo on the server HotSpot VM with a stack size of 64 kb:

    ringo -J-server -J-Xss64k

The app-specific commands (`ringo-web`, `ringo-doc`, `ringo-admin`) additionally pass all options prefixed with `-R` to the ringo command. For example, the following command will run `ringo-web` in debugger mode:

    ringo-web -R-d

## Available command line tools

Ringo comes with a number of command line tools. You can invoke all tools with the `-h` or `--help` flag to learn more about their options and arguments.

### ringo

`ringo` starts the Ringo runtime or shell. If called with one or more command line arguments it will try to run the first argument as script. If called without arguments, it starts an interactive shell (aka REPL).

The ringo command accepts a number of options. To learn more about them run ringo with the `-h` or `--help` switch.

### ringo-web

`ringo-web` starts the Ringo web server. This command runs `ringo` with `ringo/httpserver` as main module.

If an argument passed to `ringo-web` is interpreted as the path of the application to run. If the argument is a directory, it is assumed to contain a module called `config` exporting a [JSGI] app as `app`. If run without arguments, the application is assumed to be in the current working directory.

`ringo-web` takes a couple of options for things like setting the server port, host address, virtual host etc. By default ringo-web listens on port 8080.

### ringo-doc

`ringo-doc` is a tool to generate API documentation for a set of Ringo modules.

### ringo-admin

`ringo-admin` provides commands to create new Ringo applications or install Ringo packagers.

