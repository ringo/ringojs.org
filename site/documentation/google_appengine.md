# Google App Engine

Ringo runs fine on [Google App Engine] for Java. There are some limitations on App Engine compared to running on a dedicated Server. For example, asynchronous or long running connections are currently not supported. On the other hand, App Engine provides many interesting [proprietary APIs].

## Local Setup

Google App Engine for Java requires applications to be packaged as Java web applications. `ringo-admin` can create App Engine boiler plate code for use using the `create` command with the `-g` or `--google-appengine` switch:

    ringo-admin create --google-appengine /path/to/appdir

To run the application locally launch the `dev_appserver` script from the [App Engine SDK] for Java, passing it the application directory as argument:

    dev_appserver.sh appdir

## Deployment

To deploy an application, you first need to let the deployment tool know the id of the App Engine site to deploy to. You do this by editing the `application` element in file `WEB-INF/appengine-web.xml`. For example, if you want to deploy to example.appspot.com, the application element would look like this:

    <application>example</application>

Once you have done this you can upload the application using the `appcfg` command line tool from the SDK.

    appcfg.sh update appdir

This will as for your Google accout credentials and deploy the application on Google's infrastructure.

## Tips & Tricks

Note that in order to use the App Engine Storage API and other App Engine APIs you have to copy the `appengine-api-1.0-sdk-x.y.z.jar` file from the App Engine SDK's `/lib/user/` directory to the `WEB-INF/lib/` directory of your application.

One potential problem that may affect low traffic sites on Google App Engine for Java is slow application spin-up. Ringo's app engine boilerplate comes with precompilation enabled, which should should help. Startup time can further be improved by running Rhino in interpreted mode. To do this, add the following lines to the ringo servlet definition in `WEB-INF/web.xml` to set the optlevel parameter to `-1`:

    <init-param>
      <param-name>optlevel</param-name>
      <param-value>-1</param-value>
    </init-param>

While this will make Ringo run somewhat slower the improved startup time and reduced memory usage will outweigh the performance hit unless your application is _very_ CPU intensive.

To use other packages than the standard modules drop them into `WEB-INF/packages` directory. So if you're using e.g. Stick as web framework, this is the right place for it.

[google app engine]: http://code.google.com/intl/de/appengine/
[app engine sdk]: http://code.google.com/appengine/downloads.html#Google_App_Engine_SDK_for_Java
[proprietary APIs]: http://code.google.com/intl/de/appengine/docs/java/overview.html
