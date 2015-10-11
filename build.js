var exec = require('child_process').exec;

var fs = require('fs');
var browserify = require('browserify');
var babelify = require("babelify");


function buildJS(debug) {
    var b = browserify([], {debug: debug});
    b.transform(babelify.configure({
        optional: ['runtime']
    }));
    b.add('./src/js/main.js');
    b.bundle().pipe(fs.createWriteStream('./dist/bundle.js'));
    console.log('browserifying complete')
}

function buildLESS(debug) {
    var logger = function (error, stdout, stderr) {
        console.log('less compiled');
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    };
    exec('lessc ' + (debug ? '--source-map-map-inline' : '') + ' ./src/less/main.less > ./dist/styles.css', logger);
}

buildJS(false);
buildLESS(false);

module.exports = {
    buildJS: buildJS,
    buildLESS: buildLESS
};