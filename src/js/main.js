var CellsSet = require('./cells/cells_set.js');
var Cell = require('./cells/cell.js');

var cs1 = new CellsSet([
    new Cell(1,2),
    new Cell(1,3),
    new Cell(1,5),
    new Cell(3,2),
    new Cell(1,2)
]);
var cs2 = new CellsSet([
    new Cell(1,10),
    new Cell(1,3),
    new Cell(1,5),
    new Cell(3,20),
    new Cell(1,15)
]);

let cell;
console.log('union:');
for(cell of CellsSet.union(cs1, cs2)) {
    console.log(cell)
}
console.log('intersect:');
for(cell of CellsSet.intersect(cs1, cs2)) {
    console.log(cell)
}

window.Cell = Cell;

