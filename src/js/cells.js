var ExtendedSet = require('./collections/extended_set.js');


var X = Symbol();
var Y = Symbol();
var factory_sign = Symbol();


var cells_by_x = new Map();
var cells_factory = function (x, y) {
    if (!cells_by_x.has(x)) {
        cells_by_x.set(x, new Map())
    }
    if (!cells_by_x.get(x).has(y)) {
        cells_by_x.get(x).set(y, new Cell(x, y, factory_sign))
    }
    return cells_by_x.get(x).get(y)
};


class Cell {
    constructor(x, y, sign) {
        if (!(Number.isInteger(x)) || !(Number.isInteger(y))) {
            throw new Error('You must specify correct coordinates')
        }
        if (sign != factory_sign) {
            throw new Error('Cells cannot be created directly')
        }

        this[X] = x;
        this[Y] = y;
    }

    get x() {
        return this[X]
    }

    get y() {
        return this[Y]
    }

    set x(value) {
        throw new Error('Cells are immutable')
    }

    set y(value) {
        throw new Error('Cells are immutable')
    }

    get neighbours() {
        let neighbours = new ExtendedSet();
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let cell = cells_factory(i, j);
                if (cell != this) {
                    neighbours.add(cell);
                }
            }
        }
        return neighbours
    }
}

module.exports = {
    cells_factory: cells_factory,
    is_cell: function (obj) {
        return obj instanceof Cell
    }
}
;