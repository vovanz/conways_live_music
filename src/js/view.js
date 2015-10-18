var $ = require('jquery');
var cells_factory = require('./cells/cell.js').cells_factory;
var is_cell = require('./cells/cell.js').is_cell;


class View {
    create_cell(col, x, y) {
        let cell_view = $('<div />');
        let cell = cells_factory(x, y);
        cell_view.addClass('cell');
        cell_view.appendTo(col);
        this.cell_views.set(cell, cell_view);
    }

    add_col(x) {
        let col = $('<div />');
        col.addClass('col');
        col.appendTo(this.grid);
        return col
    }

    constructor(selector, life, width, height) {
        this.life = life;
        this.width = width;
        this.active_col = -1;
        this.cell_views = new Map();
        this.grid = $(selector);
        this.cols = [];
        for (let x = 0; x < width; x++) {
            let col = this.add_col(x);
            for (let y = 0; y < height; y++) {
                this.create_cell(col, x, y)
            }
            this.cols.push(col);
            this.update_alive(x);
        }
        this.life.next_state();
    }

    show_alive(cell) {
        if (!is_cell(cell)) {
            throw new TypeError('Cell required, got ' + (typeof cell) + ' instead')
        }
        if (this.cell_views.has(cell)) {
            this.cell_views.get(cell).addClass('alive')
        }
    }

    update_alive(x) {
        if (this.life.born.cells_by_x.has(x)) {
            for (let cell of this.life.born.cells_by_x.get(x)) {
                this.show_alive(cell)
            }
        }
    }

    show_dead(cell) {
        if (!is_cell(cell)) {
            throw new TypeError('Cell required, got ' + (typeof cell) + ' instead')
        }
        if (this.cell_views.has(cell)) {
            this.cell_views.get(cell).removeClass('alive')
        }
    }

    update_dead(x) {
        if (this.life.died.cells_by_x.has(x)) {
            for (let cell of this.life.died.cells_by_x.get(x)) {
                this.show_dead(cell)
            }
        }
    }

    highlight_active_col() {
        this.grid.find('.col.active').removeClass('active');
        this.cols[this.active_col].addClass('active');
    }

    set_active_col(x) {
        this.update_alive(this.active_col);
        this.update_dead(this.active_col);
        this.active_col = x;
        this.highlight_active_col();
        return this.active_col
    }

    inc_active_col() {
        let x = this.active_col + 1;
        if (x >= this.width) {
            this.life.next_state();
            x = 0;
        }
        return this.set_active_col(x)
    }

}

module.exports = View;