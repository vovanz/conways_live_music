var cells_factory = require('./cells/cells_factory.js');
var ExtendedSet = require('./collections/extended_set.js');

var a = cells_factory(1,2);
var b = cells_factory(3,2);
var c = cells_factory(1,2);
var d = cells_factory(1,3);

console.log(a != b);
console.log(a == c);

var test_set = new ExtendedSet();

test_set.add(a);

console.log(test_set.has(c));

var test_set2 = new ExtendedSet([b, c, d]);

console.log(ExtendedSet.union(test_set, test_set2));
console.log(ExtendedSet.intersect(test_set, test_set2));
