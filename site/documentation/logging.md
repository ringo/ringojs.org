# Logging

The [ringo/logging](https://ringojs.org/api/master/ringo/logging) module provides a rich and fine-grained logging API. It uses [Simple Logging Facade for Java][slf4j] (SLF4J) as abstraction layer for various Java logging frameworks, e.g. java.util.logging, log4j and logback, allowing the end user to plug in the desired logging framework at deployment time.

By default, RingoJS comes with and uses [Apache log4j 1.x][log4j]. The default log4j configuration for RingoJS is in `modules/config/log4j.properties`. Web apps can override this by providing their own configuration in `config/log4j.properties`. Using this file, setting log levels for individual loggers/modules is straightforward. Another way is to call `setConfig()` and provide custom logging properties.

    var logging = require("ringo/logging");
    var loggingConfig = module.resolve("/path/to/log4j.properties");
    logging.setConfig(getResource(loggingConfig));
    var log = logging.getLogger(module.id);

[slf4j]: http://www.slf4j.org/
[log4j]: http://logging.apache.org/log4j/

All logger methods take a variable number of arguments. If the first argument passed to any of the logging methods is a string containing any number of curly bracket pairs (`{}`), the logger will interpret it as format string and use any following arguments to replace the curly bracket pairs. If an argument is an Error or Java Exception object, the logger will render a stack trace for it and append it to the log message. If the first string does not contain `{}` placeholders, or the number of arguments exceeds the number of placeholders, arguments are simply concatenated.

    var log = require("ringo/logging").getLogger(module.id);
    log.info("Hello {}", "world", 1, 2, 3);
    // 0    [main] INFO  <shell>  - Hello world 1 2 3

## Example `log4j.properties`

The following properties show how you can use the `log4j.category.` prefix. It overrides the default log level from `INFO` to `DEBUG` for the modules `main`, `myapp/utils/database`, `myapp/utils/search`, and the built-in http server and client.

```
log4j.reset = true
log4j.rootLogger = INFO, console

log4j.appender.console = org.apache.log4j.ConsoleAppender
log4j.appender.console.layout = org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern = %-4r [%t] %-5p %c %x - %m%n

# Sets log4j categories for module names you're working on to DEBUG level:
log4j.category.main = DEBUG
log4j.category.myapp.utils.database = DEBUG
log4j.category.myapp.utils.search = DEBUG
log4j.category.ringo.httpserver = DEBUG
log4j.category.ringo.httpclient = DEBUG
```
