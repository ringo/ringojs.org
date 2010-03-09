This is the application running on <http://ringojs.org/>.

To run this app locally, you will also need RingoJS and ringowiki. The
ringojs.org app assumes that the ringowiki and ringojs.org apps are placed in
RingoJS's apps directory.

So to get things going:

    git clone git://github.com/ringo/ringojs.git
    cd ringojs/apps
    git clone git://github.com/ringo/ringowiki.git
    git clone git://github.com/ringo/ringojs.org.git
    cd ringojs.org

The Jetty and log4j configuration files are set up to run within a
Debian service configuration. The easiest is to just move them apart
to use the default configurations:

    mv config config-disabled

After that, you can start the app with:

    ringo main.js
