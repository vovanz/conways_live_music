var exec = require('child_process').exec;

var fs = require('fs');
var browserify = require('browserify');
var babelify = require("babelify");

var jsp = require("uglify-js").parser;
var pro = require("uglify-js").uglify;

function buildJS(debug) {
    try {
        var b = browserify([], {debug: debug});
        b.transform(babelify.configure({
            optional: ['runtime']
        }));
        b.add('./src/js/main.js');
        if (!debug) {
            b.transform({
                global: true
            }, 'uglifyify')
        }
        b.bundle().pipe(fs.createWriteStream('./dist/bundle.js'));
        console.log('browserifying complete')
    } catch (err) {
        console.log(err);
    }
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
    exec('lessc ' + (debug ? '--source-map-map-inline ' : '--compress ') + ' ./src/less/main.less > ./dist/styles.css', logger);
}

module.exports = {
    buildJS: buildJS,
    buildLESS: buildLESS
};