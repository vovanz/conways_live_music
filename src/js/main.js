var $ = require('jquery');

var cells_factory = require('./cells/cell.js').cells_factory;
var CellsSet = require('./cells/cells_set.js');

var View = require('./view.js');
var Player = require('./player.js');
var Life = require('./life.js');
var Controller = require('./controller.js');

$(() => {
    var start_set = new CellsSet();

    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            if (Math.random() <= 0.3) {
                start_set.add(cells_factory(i, j))
            }
        }
    }

    var life = new Life(start_set);
    var view = new View('#grid', 20, 20);
    var player = new Player(20, 20);
    var controller = new Controller(life, view, player, 20);

    setInterval(() => {
        controller.heartbeat();
    }, 200)
});