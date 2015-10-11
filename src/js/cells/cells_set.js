var Cell = require('./cell.js');

class CellsSet {
    constructor(cells) {
        this.clear();
        this.update(cells)
    }

    clear() {
        this.cells_by_x = new Map()
    }

    update(cells) {
        if (cells) {
            let cell;
            for (cell of cells) {
                this.add(cell)
            }
        }
    }

    diff_update(cells) {
        if (cells) {
            let cell;
            for (cell of cells) {
                this.delete(cell)
            }
        }
    }

    add(cell) {
        if (!Cell.is_cell(cell)) {
            throw new TypeError('Cell required, got ' + (typeof cell) + ' instead')
        }
        if (!this.cells_by_x.has(cell.x)) {
            this.cells_by_x.set(cell.x, new Map())
        }
        this.cells_by_x.get(cell.x).set(cell.y, cell)
    }

    has(cell) {
        if (!Cell.is_cell(cell)) {
            throw new TypeError('Cell required, got ' + (typeof cell) + ' instead')
        }
        if (!this.cells_by_x.has(cell.x)) {
            return false
        }
        return this.cells_by_x.get(cell.x).has(cell.y)
    }

    delete(cell) {
        if (!Cell.is_cell(cell)) {
            throw new TypeError('Cell required, got ' + (typeof cell) + ' instead')
        }
        if (!this.cells_by_x.has(cell.x)) {
            return false
        }
        if (!this.cells_by_x.get(cell.x).has(cell.y)) {
            return false
        }
        this.cells_by_x.get(cell.x).delete(cell.y);
        if (this.cells_by_x.get(cell.x).size == 0) {
            this.cells_by_x.delete(cell.x)
        }
        return true
    }
}

CellsSet.prototype[Symbol.iterator] = function* () {
    let x, cells;
    for ([x, cells] of this.cells_by_x) {
        let y, cell;
        for ([y, cell] of cells) {
            yield cell
        }
    }
};

CellsSet.union = function (...cells_sets) {
    let result = new CellsSet();
    let cells_set;
    for (cells_set of cells_sets) {
        result.update(cells_set)
    }
    return result
};

CellsSet.intersect = function (base_cells_set, ...cells_sets) {
    let result = new CellsSet(base_cells_set);
    let cells_set;
    for (cells_set of cells_sets) {
        let cell;
        for (cell of result) {
            if (!cells_set.has(cell)) {
                result.delete(cell)
            }
        }
    }
    return result
};


module.exports = CellsSet;