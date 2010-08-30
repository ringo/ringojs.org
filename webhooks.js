var config = require('./config').webHookConfig;
var jsdoc = require('./jsdoc/doc');
var {command} = require('ringo/subprocess');

exports.git = function git(req) {
    try {
        var {ref} = JSON.parse(req.params.payload);
        if (ref in config.refs) {
            // update git
            command("/usr/bin/git","--git-dir=" + config.git.pullDirectory , "fetch", "origin");
            command("/usr/bin/git","--git-dir=" + config.git.pullDirectory , "reset", "--hard", "origin/master");
            // render docs
            jsdoc.renderRepository(config.jsdoc.repository, config.jsdoc.exportDirectory, true);
        }
        return {status: 200, headers: {}, body: ['kthxbye']};
    } catch (e) {
        print (e);
        return {status: 400, headers: {}, body: ['gnah!']};
    }
};
