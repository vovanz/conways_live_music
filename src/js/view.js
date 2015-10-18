var $ = require('jquery');
var cells_factory = require('./cells/cells_factory.js');

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
        col.appendTo(this.container);
        return col
    }

    constructor(selector, width, height) {
        this.cell_views = new Map();
        this.container = $(selector);
        this.cols = [];
        console.log(this.container);
        for (let x = 0; x < width; x++) {
            let col = this.add_col(x);
            for (let y = 0; y < height; y++) {
                this.create_cell(col, x, y)
            }
            this.cols.push(col)
        }
    }
}

module.exports = View;