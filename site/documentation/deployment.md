The easiest ways to deploy RingoJS web applications are via [Google App Engine](/documentation/google_appengine) or using the [ringojs-daemon] package on Debian or Ubuntu systems.

Note that Google App Engine does not currently support all RingoJS APIs, especially asynchronous APIs or those relying on threads. 

## Google App Engine

Google App Engine requires some special directory layout for applications to be deployed. You can find detailed instructions on the [Google App Engine](/documentation/google_appengine) page.

## Red Hat OpenShift

Download the OpenShift example from GitHub and deploy your RingoJS application to the cloud: [OpenShift Template]

[OpenShift Template]: https://github.com/oberhamsi/ringojs-openshift-example

## Heroku 

To deploy RingoJS on [Heroku](http://heroku.com), follow the directions included with the [Heroku RingoJS Buildpack](https://github.com/jockm/heroku-buildpack-ringojs-jdk7).

## Debian/Ubuntu

To deploy RingoJS on Debian or Ubuntu, install both the `ringojs` and `ringojs-daemon` Debian packages. The daemon package installs a start script that can be configured in `/etc/default/ringojs`.

Deploying on your own system will allow you to use the full RingoJS API, including asynchronous and thread-based features.

[app engine sdk]: http://code.google.com/intl/de/appengine/downloads.html
[ringojs-daemon]: /downloads

## Java Servlet

To deploy a RingoJS application in a servlet container, use `ringo-admin` to create the application structure:

    ringo-admin create -w myapp

The resulting directory can be deployed as a servlet on most common Java web containers.
