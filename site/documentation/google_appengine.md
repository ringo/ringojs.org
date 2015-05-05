# Google App Engine

[Google App Engine] is a cloud PaaS (Platform-as-a-Service) product by Google.
It allows building auto-scalable applications on top of the Google Cloud platform and provides fully managed services to developers.
Ringo runs fine on App Engine for Java. There are some limitations on App Engine compared to running on a
dedicated server. For example, asynchronous or long running connections are currently not supported by App Engine itself.
On the other hand it provides many interesting [proprietary APIs].

It's no problem for Ringo to integrate and call the provided Java services.
Storing entities into the App Engine Datastore, sending mails with the Mail API, or accessing the Memcache service is easy.
Developers can use the normal Java integration Ringo has to call these services.
It's also possible to use Datastore persistence frameworks like Objectify to make storing entities even easier.

## Local Setup

Google App Engine for Java requires applications to be packaged as Java web applications. `ringo-admin` can create
App Engine boiler plate code for use using the `create` command with the `-g` or `--google-appengine` switch:

    ringo-admin create --google-appengine /path/to/appdir

To run the application locally launch the `dev_appserver` script from the [App Engine SDK] for Java, passing it the
application directory as argument:

    dev_appserver.sh appdir

![Sample application running in browser](/documentation/images/appengine-demoapp.png)

## Deployment

To deploy an application, you first need to let the deployment tool know the id of the App Engine site to deploy to.
You do this by editing the `application` element in file `WEB-INF/appengine-web.xml`. For example, if you want to deploy
to example.appspot.com, the application element would look like this:

    <application>example</application>

Once you have done this you can upload the application using the `appcfg` command line tool from the SDK.

    appcfg.sh update appdir

This will as for your Google accout credentials and deploy the application on Google's infrastructure.

## Tips & Tricks

Note that in order to use the App Engine Storage API and other App Engine APIs you have to copy the
`appengine-api-1.0-sdk-x.y.z.jar` file from the App Engine SDK's `/lib/user/` directory to the `WEB-INF/lib/` directory
of your application.

One potential problem that may affect low traffic sites on Google App Engine for Java is slow application spin-up.
Ringo's app engine boilerplate comes with precompilation enabled, which should should help. Startup time can further be
improved by running Rhino in interpreted mode. To do this, add the following lines to the ringo servlet definition in
`WEB-INF/web.xml` to set the optlevel parameter to `-1`:

    <init-param>
      <param-name>optlevel</param-name>
      <param-value>-1</param-value>
    </init-param>

While this will make Ringo run obviously slower, the improved startup time and reduced memory usage will outweigh the
performance hit. Using the interpreted mode should be only considered if the application starts and stops instances
at a high number and the load is not predictable.

To use other packages than the standard modules drop them into `WEB-INF/packages` directory. So if you're using e.g.
Stick as web framework, this is the right place for it.

[Google App Engine]: https://cloud.google.com/appengine/
[app engine sdk]: https://cloud.google.com/appengine/downloads/
[proprietary APIs]: https://cloud.google.com/appengine/docs/
