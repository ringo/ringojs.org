# Install Ringo from Git

Instead of installing a precompiled Ringo release, you can also use the current git master. This requires more
tools and knowledge about Java development since you have to build Ringo by yourself.

In addition to Java you will need [Apache Ant](http://ant.apache.org/) and the [Apache Ivy plugin](http://ant.apache.org/ivy/) for Ant.
You can get those tools from their respective websites, or by using your favourite package manager.
The minimum requirement to resolve all dependencies is Ivy's 2.4 release.

Clone the Git repository with:

    $ git clone git://github.com/ringo/ringojs.git

Change to the ringojs directory you just checked out and run ant with the "update" and "jar" target to fetch all
dependencies and then build Ringo:

    $ ant update jar