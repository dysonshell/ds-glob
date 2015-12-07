'use strict';
var tape = require('tape');
process.env.APP_ROOT = __dirname;
process.env.DS_COMPONENT_PREFIX = 'dsc';
var dsGlob = require('../../');
tape(function(test) {
    test.plan(2);
    var files = dsGlob.sync('dsc/*/partials/**.html');
    test.notEqual(files.indexOf('dsc/index/partials/a.html', -1));
    test.notEqual(files.indexOf('dsc/index/partials/b.html', -1));
});
