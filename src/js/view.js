var $ = require('jquery');
var cells_factory = require('./cells.js').cells_factory;

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
        this.width = width;
        this.cell_views = new Map();
        this.grid = $(selector);
        this.cols = [];
        for (let x = 0; x < width; x++) {
            let col = this.add_col(x);
            for (let y = 0; y < height; y++) {
                this.create_cell(col, x, y)
            }
            this.cols.push(col)
        }
    }

    set_active_col(x) {
        this.grid.find('.col.active').removeClass('active');
        this.cols[x].addClass('active');
        this.active_col = x;
    }

    inc_active_col(x) {
        if(typeof this.active_col != 'undefined') {
            this.active_col = 0
        } else {
            this.active_col++
        }
        if (this.active_col >= this.width) {
            this.active_col = 0;
        }
        return this.active_col
    }

}

module.exports = View;