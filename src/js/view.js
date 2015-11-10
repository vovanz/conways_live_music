var $ = require('jquery');
var cells_factory = require('./cells/cell.js').cells_factory;
var assert_cell = require('./cells/cell.js').assert_cell;


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

    constructor(selector, width, height) {
        this.cell_views = new Map();
        this.grid = $(selector);
        this.cols = [];
        for (let x = 0; x < width; x++) {
            let col = this.add_col(x);
            for (let y = 0; y < height; y++) {
                this.create_cell(col, x, y)
            }
            this.cols.push(col);
        }
    }

    show_alive(cell) {
        assert_cell(cell);
        if (this.cell_views.has(cell)) {
            this.cell_views.get(cell).addClass('alive')
        }
    }


    show_dead(cell) {
        assert_cell(cell);
        if (this.cell_views.has(cell)) {
            this.cell_views.get(cell).removeClass('alive')
        }
    }

    highlight_active_col(x) {
        this.grid.find('.col.active').removeClass('active');
        this.cols[x].addClass('active');
    }
}

module.exports = View;