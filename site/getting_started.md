# Getting Started

This is a short guide on how to install RingoJS. See [First Steps] on how to start using Ringo or [Documentation] for an overview of documentation resources.

Which Version
-------------

We try to release often - at least every 2 months - but Ringo is moving fast and with the Git version you will always get the newest features. All Ringo developers use the Git version for their projects and the git master is usually quite stable.

*But*, using the most recent Git version means you should keep an eye on the Ringo [mailing list](http://groups.google.com/group/ringojs) - big changes that might break your code will be discussed on the list beforehand.

## Ringo requires Java 1.5+

We recommend the Java Sun Package. Either download it from [the Oracle download page](http://www.oracle.com/technetwork/java/javase/downloads/jdk6-jsp-136632.html) or on Debian simply `apt-get install sun-java6-jdk`

## Option 1: Get the latest official release

Download the latest Ringo release:

  * [Debian Package](http://github.com/downloads/ringo/ringojs/ringojs_0.7-1_all.deb)
  * [Zip](http://github.com/downloads/ringo/ringojs/ringojs-0.7.zip)
  * [Tar.gz](http://github.com/downloads/ringo/ringojs/ringojs-0.7.tar.gz)

Install the `.deb` or unpack the archive you downloaded. Ringo is now ready to use. See [First Steps] for a mini intro on what you can do with Ringo.

## Option 2: Install from Git

In addition to Java you will need [Apache Ant](http://ant.apache.org/) to create the jar files and the [Apache Ivy](http://ant.apache.org/ivy/) plugin for Ant, to fetch required dependencies. You can get those tools from their respective websites, or by using your favourite package manager (e.g. on Debian use `apt-get install ant ivy`).

Clone the Git repository with:

    $ git clone git://github.com/ringo/ringojs.git

Change to the `ringojs` directory you just checked out and run `ant` with the `update` target to fetch the required dependencies:

    $ ant update

Finally, run the `jar` target to build RingoJS itself:

    $ ant jar

After this completes, you'll now have a file called `lib/ringo.jar`.

Ringo is now ready to use. See [First Steps] for a mini intro on what you can do with Ringo.
