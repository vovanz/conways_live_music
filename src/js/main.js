var $ = require('jquery');

var cells_factory = require('./cells/cell.js').cells_factory;
var CellsSet = require('./cells/cells_set.js');

var View = require('./view.js');
var Player = require('./player.js');
var Life = require('./life.js');
var Controller = require('./controller.js');

$(() => {
    var player = new Player(20, () => {
        var start_set = new CellsSet();

        var glider = (shift) => {
            return [
                cells_factory(1+shift, 0+shift),
                cells_factory(2+shift, 1+shift),
                cells_factory(0+shift, 2+shift),
                cells_factory(1+shift, 2+shift),
                cells_factory(2+shift, 2+shift)
            ]
        };

        for(let i = -10; i < 3; i++) {
            start_set.update(glider(i*5))
        }

        var life = new Life(start_set);
        var view = new View('#grid', 20, 20);
        var controller = new Controller(life, view, player, 20);

        setInterval(() => {
            controller.heartbeat();
        }, 200)
    });
});