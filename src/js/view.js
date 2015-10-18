var $ = require('jquery');
var cells_factory = require('./cells/cells_factory.js');

class View {
    create_cell(row, x, y) {
        let cell_view = $('<div />');
        let cell = cells_factory(x, y);
        cell_view.addClass('cell');
        cell_view.appendTo(row);
        this.cell_views.set(cell, cell_view);
    }

    add_row(y) {
        let row = $('<div />');
        row.addClass('row');
        row.appendTo(this.container);
        return row
    }

    constructor(selector, width, height) {
        this.cell_views = new Map();
        this.container = $(selector);
        console.log(this.container);
        for (let y = 0; y < height; y++) {
            let row = this.add_row(y);
            for (let x = 0; x < width; x++) {
                this.create_cell(row, x, y)
            }
        }
    }
}

module.exports = View;