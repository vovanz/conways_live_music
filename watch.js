var watch = require('watch');
var build = require('./builder.js');

watch.watchTree('./src/js/', function (f, curr, prev) {
    build.buildJS(true)
});

watch.watchTree('./src/less/', function (f, curr, prev) {
    build.buildLESS(true)
});
