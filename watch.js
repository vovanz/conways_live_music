var watch = require('watch');
var exec = require('child_process').exec;

watch.watchTree('./src/js/', function (f, curr, prev) {
    exec('node ./build.js > ./dist/bundle.js')
});

watch.watchTree('./src/less/', function (f, curr, prev) {
    exec('less ./src/less/main.less > ./dist/styles.css')
});
