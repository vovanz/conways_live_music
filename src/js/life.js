var CellsSet = require('./cells/cells_set.js');

class Life {
    constructor(cells_set) {
        this.state = cells_set;
        this.born = cells_set;
        this.died = new CellsSet()
    }

    next_state() {
        this.born = new CellsSet();
        this.died = new CellsSet();
        for (let cell of this.state) {
            let alive_neighbours = CellsSet.intersect(cell.neighbours, this.state);
            if (alive_neighbours.size < 2 || alive_neighbours.size > 3) {
                this.died.add(cell)
            }
            this.born.update(cell.neighbours)
        }
        for (let cell of this.born) {
            let alive_neighbours = CellsSet.intersect(cell.neighbours, this.state);
            if (alive_neighbours.size != 3) {
                this.born.delete(cell)
            }
        }
        this.prev_state = this.state;
        this.state = CellsSet.union(this.state, this.born).diff_update(this.died);
        return this.state
    }

    revert() {
        if (typeof this.prev_state != 'undefined') {
            this.state = this.prev_state
        }
    }
}

module.exports = Life;