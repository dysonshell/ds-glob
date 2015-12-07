'use strict';

var _ = require('lodash');
var glob = require('glob');
var co = require('co');

// config
var APP_ROOT = (GLOBAL.DSCONFIG && GLOBAL.DSCONFIG.APP_ROOT) || process.env.DSCONFIG_APP_ROOT;
var DSC = (GLOBAL.DSCONFIG && GLOBAL.DSCONFIG.COMPONENT_PREFIX) || process.env.DSCONFIG_COMPONENT_PREFIX || 'dsc';
DSC = DSC.replace(/\/+$/, '') + '/';

var dsGlob = exports = module.exports = function (pattern, cb) {
    if (pattern.indexOf(DSC) !== 0) {
        return cb(new Error('dsGlob() only finds you files starting with `${process.env.DSCONFIG_COMPONENT_PREFIX}/`.'));
    }
    co(function *() {
        cb(null, _.uniq(
            (yield glob.bind(glob, pattern, {
                cwd: APP_ROOT
            }))
            .concat((yield glob.bind(glob, 'node_modules/@' + pattern, {
                cwd: APP_ROOT
            })).map(removeLeading))))
    }).catch(cb);
}
dsGlob.sync = function (pattern) {
    if (pattern.indexOf(DSC) !== 0) {
        throw new Error('dsGlob() only finds you files starting with `${process.env.DSCONFIG_COMPONENT_PREFIX}/`.');
    }
    return _.uniq(
        glob.sync(pattern, {
            cwd: APP_ROOT
        })
        .concat(glob.sync('node_modules/@' + pattern, {
            cwd: APP_ROOT
        }).map(removeLeading)))
}

function removeLeading(filePath) {
    return filePath.replace(/^node_modules\/@/, '');
}
