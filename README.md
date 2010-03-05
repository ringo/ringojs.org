This is the application running on <http://ringojs.org/>.

To run this app locally, first fetch the dependent apps (demo and jsdoc from
ringojs, and ringowiki) with:

    git submodule init
    git submodule update

The Jetty and log4j configuration files are set up to run within a
Debian service configuration. The easiest is to just move them apart
to use the default configurations:

    mv config config-disabled

After that, you can start the app with:

    ringo main.js
