var $ = require('jquery');
var cells_factory = require('./cells/cells_factory.js');
var View = require('./view.js');

$(() => {
    var view = new View('#grid', 20, 20);

    var cells = [
        cells_factory(10, 10),
        cells_factory(11, 11),
        cells_factory(9, 12),
        cells_factory(10, 12),
        cells_factory(11, 12)
    ];
    for (let cell of cells) {
        view.cell_views.get(cell).addClass('alive');
    }
    view.cols[9].addClass('active');
});