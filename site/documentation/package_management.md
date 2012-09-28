# Package Management

RingoJS comes with a simple tool for installing [packages](/packages). It can be run using the `ringo-admin` command with `install` as first argument. The install task takes a URL of a zip file containing the package to install as argument.

To install a package from the web:

    ringo-admin install http://site.com/foo/foo.zip

There is a convenient shortcut for installing packages from a Github repository that allows you to just specify the Github user and repository name:

    ringo-admin install robi42/ringo-hibernate

This will fetch and install the current zipball of the repository's master branch, e.g. `http://github.com/robi42/ringo-hibernate/zipball/master`.