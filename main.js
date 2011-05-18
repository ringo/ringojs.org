#!/usr/bin/env ringo

if (require.main == module) {
    require("ringo/httpserver").main(module.directory);
}
