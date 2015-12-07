'use strict';
var tape = require('tape');
GLOBAL.DSCONFIG = {
    APP_ROOT: __dirname,
    COMPONENT_PREFIX: 'dsc',
};
var dsGlob = require('../../');
tape(function(test) {
    test.plan(3);
    dsGlob('dsc/*/partials/**.html', function(err, files) {
        test.ok(!err);
        test.notEqual(files.indexOf('dsc/index/partials/a.html', -1));
        test.notEqual(files.indexOf('dsc/index/partials/b.html', -1));
    });
});
