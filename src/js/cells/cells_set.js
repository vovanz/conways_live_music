var assert_cell = require('./cell.js').assert_cell;

var SIZE = Symbol();

class CellsSet {
    constructor(cells) {
        this.clear();
        this.update(cells)
    }

    clear() {
        this.cells_by_x = new Map();
        this[SIZE] = 0
    }

    update(cells) {
        if (cells) {
            for (let cell of cells) {
                this.add(cell)
            }
            return this
        }
    }

    diff_update(cells) {
        if (cells) {
            for (let cell of cells) {
                this.delete(cell)
            }
            return this
        }
    }

    add(cell) {
        assert_cell(cell);
        if (!this.cells_by_x.has(cell.x)) {
            this.cells_by_x.set(cell.x, new Set())
        }
        if (!this.cells_by_x.get(cell.x).has(cell)) {
            this.cells_by_x.get(cell.x).add(cell);
            this[SIZE]++
        }
    }

    has(cell) {
        assert_cell(cell);
        if (!this.cells_by_x.has(cell.x)) {
            return false
        }
        return this.cells_by_x.get(cell.x).has(cell)
    }

    delete(cell) {
        assert_cell(cell);
        if (!this.has(cell)) {
            return false
        }
        this.cells_by_x.get(cell.x).delete(cell);
        if (this.cells_by_x.get(cell.x).size == 0) {
            this.cells_by_x.delete(cell.x)
        }
        this[SIZE]--;
        return true
    }

    get size() {
        return this[SIZE]
    }

    static union(...cells_sets) {
        let result = new CellsSet();
        for (let cells_set of cells_sets) {
            result.update(cells_set)
        }
        return result
    }

    static intersect(base_set, ...cells_sets) {
        let result = new CellsSet(base_set);
        for (let cells_set of cells_sets) {
            for (let obj of result) {
                if (!cells_set.has(obj)) {
                    result.delete(obj)
                }
            }
        }
        return result
    }
}

CellsSet.prototype[Symbol.iterator] = function* () {
    let x, cells;
    for ([x, cells] of this.cells_by_x) {
        for (let cell of cells) {
            yield cell
        }
    }
};

module.exports = CellsSet;