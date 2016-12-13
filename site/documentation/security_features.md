# Security Features

Ringo leverages the security features of the Java virtual machine.

## Policy Files

Using the `-p` or `--policy` command line option you can specify a [policy file]. Ringo will then enable JVM security features by installing a system-wide `SecurityManager`.

The policy file allows you to define fine-grained [permissions] depending on the source of the executing code. Thus, you can specify different permissions for different module or jar repositories, depending on your level of trust in the person providing the code.

Ringo comes with an [example policy file] located in `lib/ringo.policy`. It gives full permissions to Ringo's own code but limits the permissions for installed packages to the bare minimum required to run [Tusk], Jack, and most other packages.

Note how you can use `${}` to reference java system properties. For example, use `${ringo.home}` to refer to code resources located in your Ringo installation.

## Permissions

When the JVM security infrastructure checks whether an action is to be allowed or not, it examines the whole stack of currently executing code and looks for the least privileged piece of code running. The action is only allowed if each and every piece of code on the stack has the permission to execute it.

Let's look at an example to see how this works in practice. Let's assume your application runs code provided by untrusted users. You only give this code permission to access files within a sandbox:

    grant codeBase "/lib/untrusted/-" {
        permission java.io.FilePermission
                "/var/sandbox/-", "read,write,delete";
        ...
    }

Now this code could use some trusted Ringo module like `fs` or `rp` to try to access files outside its sandbox. But because the security infrastructure considers the whole stack it will find the untrusted code as originator of the action and reject it.

Also, since the security manager spans the whole JVM, it doesn't matter if code tries to access a resource directly (e.g. through the file system API) or indirectly (say, trying to parse a template file).

## Privileged Actions

Sometimes, trusted code may have to access a protected resource on behalf of untrusted code in order fulfil its job. For example, trusted code may have to consult a central configuration file that the code which triggered the activity may itself not have the permission to access.

For this case, Ringo provides the global `privileged()` function. It takes a single function object as argument and executes it with the permissions of the currently executing code, isolating it from possibly less trusted code in the call stack.

Of course, the `privileged()` function needs to be applied very carefully. It should only be used in a way that is fully controlled by the trusted code and not exposed to or parametrizable from untrusted outside code.

In a nutshell, using `privileged()` to access a specific (hard-coded) resource to act upon is generally OK, while using it to access a resource provided by calling code or returning the resource to calling code is usually not.

[policy file]: http://java.sun.com/j2se/1.4.2/docs/guide/security/PolicyFiles.html
[permissions]: http://java.sun.com/j2se/1.4.2/docs/guide/security/permissions.html
[example policy file]: https://github.com/ringo/ringojs/blob/master/lib/ringo.policy
