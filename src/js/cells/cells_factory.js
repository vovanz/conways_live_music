var X = Symbol();
var Y = Symbol();

class Cell {
    constructor(x, y) {
        if (!(Number.isInteger(x)) || !(Number.isInteger(y))) {
            throw new Error('You must specify correct coordinates')
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
}

var cells_by_x = new Map();

module.exports = function (x, y) {
    if (!cells_by_x.has(x)) {
        cells_by_x.set(x, new Map())
    }
    if (!cells_by_x.get(x).has(y)) {
        cells_by_x.get(x).set(y, new Cell(x, y))
    }
    return cells_by_x.get(x).get(y)
};