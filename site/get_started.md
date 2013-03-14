# Get Started

This is a short guide on how to install Ringo on your system.

## Ringo runs on the Java VM

The only essential requirement to run Ringo is Java. The oldest supported release is Java 5. We recommend Java 6 or higher to run Ringo, which you find at [the Oracle download page](http://www.oracle.com/technetwork/java/javase/downloads/index.html) or on Debian simply `apt-get install openjdk-7-jre`.

## Download the latest release

This is the recommended and straight forward way to install Ringo. Download the latest release from the [download page](download). For convinience, you should add the `/bin` directory to the `PATH` environment variable.

See [First Steps](first_steps) for a short introduction on what you can do with Ringo or the [Documentation](documentation) page for an overview of all help resources.

## Advanced: Install Ringo from Git

Instead of installing a Ringo release as described in before, you can also use the current git master. This requires more tools and knowledge about Java development since you have to build Ringo by yourself.

In addition to Java you will need [Apache Ant](http://ant.apache.org/) and the [Apache Ivy plugin](http://ant.apache.org/ivy/) for Ant. You can get those tools from their respective websites, or by using your favourite package manager (e.g. on Debian use `apt-get install ant ivy`).

Clone the Git repository with:

    $ git clone git://github.com/ringo/ringojs.git

Change to the ringojs directory you just checked out and run ant with the "update" and "jar" target to fetch all dependencies and then build Ringo:

    $ ant update jar

See [First Steps](first_steps) for a short introduction on what you can do with Ringo or the [Documentation](documentation) page for an overview of all help resources.
