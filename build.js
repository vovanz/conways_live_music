var browserify = require('browserify');
var babelify = require("babelify");
var b = browserify();

b.transform(babelify);
b.add('./src/js/main.js');
b.bundle().pipe(process.stdout);
