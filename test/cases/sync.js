'use strict';
var tape = require('tape');
var path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, '..', 'config');
var dsGlob = require('../../');
tape(function(test) {
    test.plan(2);
    var files = dsGlob.sync('dsc/*/partials/**.html');
    test.notEqual(files.indexOf('dsc/index/partials/a.html'), -1);
    test.notEqual(files.indexOf('dsc/index/partials/b.html'), -1);
});
