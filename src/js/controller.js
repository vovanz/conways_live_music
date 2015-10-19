class Controller {
    constructor(life, view, player, width) {
        this.life = life;
        this.view = view;
        this.player = player;
        this.width = width;
        this.active_col = -1;
        for (let cell of this.life.state) {
            this.view.show_alive(cell);
        }
        this.life.next_state();
    }

    update_alive(x) {
        if (this.life.born.cells_by_x.has(x)) {
            for (let cell of this.life.born.cells_by_x.get(x)) {
                this.view.show_alive(cell)
            }
        }
    }

    play_cells(x) {
        if (this.life.prev_state.cells_by_x.has(x)) {
            this.player.play_cells(x, this.life.prev_state.cells_by_x.get(x))
        }
    }

    update_dead(x) {
        if (this.life.died.cells_by_x.has(x)) {
            for (let cell of this.life.died.cells_by_x.get(x)) {
                this.view.show_dead(cell)
            }
        }
    }

    heartbeat() {
        this.update_alive(this.active_col);
        this.update_dead(this.active_col);
        this.active_col++;
        if (this.active_col >= this.width) {
            this.life.next_state();
            this.active_col = 0;
        }
        this.play_cells(this.active_col);
        this.view.highlight_active_col(this.active_col);
    }
}

module.exports = Controller;