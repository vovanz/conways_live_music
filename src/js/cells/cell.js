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

    equal(cell) {
        if (!Cell.is_cell(cell)) {
            throw new TypeError('Cell required, got ' + (typeof cell) + ' instead')
        }
        return (this.x == cell.x) && (this.y == cell.y)
    }
}

Cell.is_cell = function (obj) {
    return obj instanceof Cell
};

module.exports = Cell;