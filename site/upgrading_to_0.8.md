Ringo 0.8 has several incompatible changes. Here are some tips and tricks to make upgrading easier.

 * **Removal of ringo/webapp/, ringo/middleware, ringo/skin**
    * ringo/webapp/mime -> ringo/mime
    * ringo/webapp/response -> ringoj/jsgi/response
    * ringo/skin -> ringo/mustache (different templating)
    * ...

 * **Removal of ringo/functional/** this can easily be replaced using the ES5 function.bind method. To bind only arguments but not the this.object as in `bindArguments` just pass `null` or `undefined` as first argument to bind().

 * **Individual packages no longer on the module path**
    * package.json 'main' property must point to entry point module
    * intra-package require()s should use relative module ids

 * **Native Storable implementation removed, replaced by ringo-storable**. [ringo-storable](https://github.com/hns/ringo-storable) is largely compatible to the native Storable host object. See [ringo-sqlstore](https://github.com/grob/ringo-sqlstore) and [ringo-filestore](https://github.com/hns/ringo-filestore) for store implementations built on ringo-storable. If your store is not available, please get in touch with us.

 - **Renamed servlet init parameters and default values.** The `config` and `app` servlet init parameters were renamed to `app-module` and `app-name`, and the default value for `app-module` (i.e. the default name of the module exporting the JSGI web app) changed from "config" to "main". If you update an existing application you should probably change the parameter names, but not the values (unless you change the app).

- **New ringo-admin create options.** Options in ringo-admin create tool changed. To create a Google Appengine app now use the -g/--google-appengine switch. There's a new
-w/--java-webapp option to create a standard Java web archive application (similar to Appengine, but without the GAE-specific bits).
Finally, there's a new option called -a/--app-source [DIR] to override the source of the app to package.

- **ringo-admin install options changed.** The -p/--packages option in ringo-admin install is now called -d/--directory. 
