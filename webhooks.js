var config = require('./config').webHookConfig.jsdoc;
var jsdoc = require('./jsdoc/doc');

exports.git = function git(req) {
    try {
        jsdoc.renderRepository(config.repository, config.exportDirectory, true);
        return {status: 200, headers: {}, body: ['kthxbye']};
    } catch (e if e instanceof SyntaxError) {
        return {status: 400, headers: {}, body: ['gnah!']};
    }
};
