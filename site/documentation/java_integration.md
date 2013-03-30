# Java Integration

Ringo's underlying JavaScript engine Rhino provides full access to any kind of Java class that has been loaded into the Runtime Environment. A feature that gives Ringo developers (nearly) the full power of Java at their fingertips, and let's them take advantage of available Java libraries within their application. You can call a class' static methods, access constants, instantiate new objects, and so forth.

There are three ways to integrate your Java _classes_ (class files) and _libraries_ (jar files) with Ringo:

1. Drop the Java class or library into [the classpath](http://docs.oracle.com/javase/6/docs/technotes/tools/findingclasses.html).
1. Drop the Java library (jar file) in the Ringo `lib` directory.
1. Add the Java library (jar file) or package (directory) to the classpath.

Dropping the Java class or library into the classpath allows seamless integration with Ringo (i.e. explicit declaration of which Java classes and libraries are to be added to the classpath is not required). An alternate way to seamlessly integrate libraries with Ringo is to drop the jar file in the `lib` directory. All the jar files in this directory are included in the classpath by default.

Finally, libraries and packages may be explicitly added to the classpath at runtime by calling the global `addToClasspath(pathName)` function in Ringo. The `addToClasspath()` function takes a single argument: the `pathName`, which is the absolute path name of the library or package to be added to the classpath. To add path names in the module path using the same lookup rules as the module loader, use the `module.resolve(pathName)` function. It takes a single argument: the `pathName`, which is the given path name in the module path and returns its absolute path.

_To add a library to the classpath, use:_

    addToClasspath(module.resolve("./library.jar"));

_To add a package to the classpath, use:_

    addToClasspath(module.resolve("./package"));

## Best Practice

It's generally a good practice to explicitly add specific libraries and packages to the classpath by using the `addToClasspath()` function in your Ringo modules, for the following reasons:

*   End-users and programmers who download your package don't need to manually set their classpath to point to your libraries and packages.
*   End-users and programmers who download your package don't need to manually copy your libraries into the Ringo lib directory.
*   Explicitly adding specific libraries and packages to the classpath throws an exception if the path is invalid or incorrect.
*   Explicitly adding specific libraries and packages to the classpath serves as a form of documentation for programmers.

## Examples

The first example shows how your application can use standard Java classes and methods:

    // Packages is a top-level variable by Rhino to
    // to access Java packages in your JS code
    var user = new Packages.com.yourbusiness.User();
    user.setUsername("Bill");
    
    // Rhino provides a shortcut for java.* Packages
    var log10 = java.lang.StrictMath.log10(1517.19234);

To load a whole package you can use `importPackage(package)`:

    // Add the Jena library to the classpath
    addToClasspath("../lib/jena.jar");
    
    // Import a whole package from the loaded library
    importPackage(com.hp.hpl.jena.query);
    
    // Use the com.hp.hpl.jena.query.Query class
    var query = new Query();
    query.executeStatement("...");

  [JVM]: http://en.wikipedia.org/wiki/Java_Virtual_Machine
  [ENV]: http://en.wikipedia.org/wiki/Environment_variable

For more information about Rhino's Java integration look at [this article](https://developer.mozilla.org/en-US/docs/Scripting_Java).
