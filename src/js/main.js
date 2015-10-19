var $ = require('jquery');

var cells_factory = require('./cells/cell.js').cells_factory;
var CellsSet = require('./cells/cells_set.js');

var View = require('./view.js');
var Player = require('./player.js');
var Life = require('./life.js');
var Controller = require('./controller.js');

$(() => {
    var glider = [
        cells_factory(10, 10),
        cells_factory(11, 11),
        cells_factory(9, 12),
        cells_factory(10, 12),
        cells_factory(11, 12)
    ];

    var life = new Life(new CellsSet(glider));
    var view = new View('#grid', 20, 20);
    var player = new Player(20, 20);
    var controller = new Controller(life, view, player, 20);

    setInterval(() => {
        controller.heartbeat();
    }, 200)
});