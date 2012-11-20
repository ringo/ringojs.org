# Get Started

This is a short guide on how to install RingoJS.

## Ringo requires Java SE 5

We recommend Java SE 6 or higher to run Ringo, which you find at [the Oracle download page](http://www.oracle.com/technetwork/java/javase/downloads/jdk6-jsp-136632.html) or on Debian simply `apt-get install openjdk-6-jre`.

## Option 1: Download the latest release

Download the latest Ringo release from the [download page](download). For convinience, you should add the `/bin` directory to the `PATH` environment variable. Ringo is now ready to use.

## Option 2: Install Ringo from Git

Instead of installing a Ringo release as described in Option 1, you can also use the current git master. This requires more tools since you have to build Ringo.

In addition to Java you will need [Apache Ant](http://ant.apache.org/) and the [Apache Ivy plugin](http://ant.apache.org/ivy/) for Ant. You can get those tools from their respective websites, or by using your favourite package manager (e.g. on Debian use `apt-get install ant ivy`).

Clone the Git repository with:

    $ git clone git://github.com/ringo/ringojs.git

Change to the ringojs directory you just checked out and run ant with the "update" and "jar" target to fetch all dependencies and then build Ringo:

    $ ant update jar

## Ready to use

See [First Steps](first_steps) for a short introduction on what you can do with Ringo or the [Documentation](documentation) page for an overview of all help resources.