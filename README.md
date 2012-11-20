This is the application running on <http://ringojs.org/>.

To run this app locally, you need to have `ringojs` and the ringo packages:

  * ringo/stick
  * ringo/simplesite
  * oberhamsi/ringobot
  * hns/ringo-cometd

The Jetty and log4j configuration files are set up to run within a
Debian service configuration. The easiest is to just move them apart
to use the default configurations:

    mv config config-disabled

After that, you can start the app with:

    ringo main.js --contentdir ./site/
