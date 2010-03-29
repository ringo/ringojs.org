#!/usr/bin/env ringo

if (require.main == module.id) {
    require("ringo/webapp").main(module.directory);
}
