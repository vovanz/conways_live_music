var exec = require('child_process').exec;

var fs = require('fs');
var browserify = require('browserify');
var babelify = require("babelify");

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
        if (debug) {
            b.bundle().pipe(fs.createWriteStream('./dist/bundle.js'));
        } else {
            var stream = fs.createWriteStream('./dist/tmp.js');
            b.bundle().pipe(stream);
            stream.on('close', function () {
                var logger = function (error, stdout, stderr) {
                    console.log('uglification complete');
                    console.log(stdout);
                    console.log(stderr);
                    if (error !== null) {
                        console.log('exec error: ' + error);
                    }
                };
                exec('uglifyjs ./dist/tmp.js > ./dist/bundle.js ; rm ./dist/tmp.js', logger)
            });
        }
        console.log('browserifying complete');
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
    exec('lessc ' + (debug ? '--source-map-map-inline ' : '--clean-css="--s1 --advanced --compatibility=ie8" ') + ' ./src/less/main.less > ./dist/styles.css', logger);
}

module.exports = {
    buildJS: buildJS,
    buildLESS: buildLESS
};