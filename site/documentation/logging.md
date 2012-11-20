# Logging

The [ringo/logging](http://ringojs.org/api/master/ringo/logging) module provides a rich and fine-grained logging API. It uses [Simple Logging Facade for Java][slf4j] (SLF4J) as abstraction layer for various Java logging frameworks, e.g. java.util.logging, log4j and logback, allowing the end user to plug in the desired logging framework at deployment time.

By default, RingoJS comes with and uses [Apache log4j][log4j]. The default log4j configuration for RingoJS is in `modules/config/log4j.properties`. Web apps can override this by providing their own configuration in `config/log4j.properties`. Using this file, setting log levels for individual loggers/modules is straightforward.

[slf4j]: http://www.slf4j.org/
[log4j]: http://logging.apache.org/log4j/

All logger methods take a variable number of arguments. If the first argument passed to any of the logging methods is a string containing any number of curly bracket pairs (`{}`), the logger will interpret it as format string and use any following arguments to replace the curly bracket pairs. If an argument is an Error or Java Exception object, the logger will render a stack trace for it and append it to the log message. If the first string does not contain `{}` placeholders, or the number of arguments exceeds the number of placeholders, arguments are simply concatenated.

    var log = require("ringo/logging").getLogger(module.id);
    log.info("Hello {}", "world", 1, 2, 3);
    // 0    [main] INFO  <shell>  - Hello world 1 2 3
