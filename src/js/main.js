var $ = require('jquery');
var cells_factory = require('./cells/cell.js').cells_factory;
var View = require('./view.js');
var Life = require('./life.js');
var CellsSet = require('./cells/cells_set.js');

$(() => {
    var glider = [
        cells_factory(10, 10),
        cells_factory(11, 11),
        cells_factory(9, 12),
        cells_factory(10, 12),
        cells_factory(11, 12)
    ];

    var life = new Life(new CellsSet(glider));
    var view = new View('#grid', life, 20, 20);

    setInterval(function () {
        view.inc_active_col()
    }, 200);
});