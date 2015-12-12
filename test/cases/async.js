'use strict';
var tape = require('tape');
var path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, '..', 'config');
var dsGlob = require('../../');
tape(function(test) {
    test.plan(3);
    dsGlob('dsc/*/partials/**.html', function(err, files) {
        test.ok(!err);
        test.notEqual(files.indexOf('dsc/index/partials/a.html'), -1);
        test.notEqual(files.indexOf('dsc/index/partials/b.html'), -1);
    });
});
