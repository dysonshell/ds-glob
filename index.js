'use strict';

var _ = require('lodash');
var glob = require('glob');
var co = require('co');
var config = require('config');

// config
var APP_ROOT = config.dsAppRoot;
var DSC = config.dsComponentPrefix || 'dsc';
DSC = DSC.replace(/^\/+/, '').replace(/\/+$/, '') + '/';

var dsGlob = exports = module.exports = function (pattern, cb) {
    if (pattern.indexOf(DSC) !== 0) {
        return cb(new Error('dsGlob() only finds you files starting with `${config.dsComponentPrefix}/`(`'+DSC+'`).'));
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
        throw new Error('dsGlob() only finds you files starting with `${config.dsComponentPrefix}/`(`'+DSC+'`).');
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
