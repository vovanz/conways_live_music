var ExtendedSet = require('./collections/extended_set.js');

class Life {
    constructor(cells_set) {
        this.state = cells_set;
    }

    next_state() {
        this.born = new ExtendedSet();
        this.died = new ExtendedSet();
        for (let cell of this.state) {
            let alive_neighbours = ExtendedSet.intersect(cell.neighbours, this.state);
            if (alive_neighbours.size < 2 || alive_neighbours > 3) {
                this.died.add(cell)
            }
            let all_neighbours = cell.neighbours;
            let dead_neighbours = all_neighbours.diff_update(alive_neighbours);
            for (let dead_neighbour of dead_neighbours) {
                let parents = ExtendedSet.intersect(dead_neighbour.neighbours, this.state)
                if (parents.size == 3) {
                    this.born.add(dead_neighbour)
                }
            }
        }
        this.prev_state = this.state;
        this.state = new ExtendedSet(this.state);
        this.state.update(this.born);
        this.state.diff_update(this.died);
        return this.state
    }
}