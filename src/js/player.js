var cells_factory = require('./cells/cell.js').cells_factory;

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function get_penta(a) {
    if (a == 0) {
        return 0
    }
    if (a == 1) {
        return 3
    }
    if (a == 2) {
        return 5
    }
    if (a == 3) {
        return 7
    }
    if (a == 4) {
        return 11
    }

}

var get_audio_name = function (y) {
    let a = 20 - y;
    let oct = Math.floor(a / 5);
    let shift = get_penta(a % 5);
    let b = oct*12 + shift;
    return 'audio/jobro__piano-ff-' + pad(b+10, 3) + '.wav'
};

class Player {
    create_cell(col, x, y) {
        let cell = cells_factory(x, y);
        let audio = new Audio(get_audio_name(y));
        audio.load();
        col.set(cell, audio);
    }

    constructor(width, height) {
        this.cols = [];
        for (let x = 0; x < width; x++) {
            let col = new Map();
            for (let y = 0; y < height; y++) {
                this.create_cell(col, x, y)
            }
            this.cols.push(col);
        }
    }

    play_cells(x, cells) {
        for (let cell of cells) {
            if (this.cols[x].has(cell)) {
                this.cols[x].get(cell).play();
                console.log(cell);
            }
        }
    }

}


module.exports = Player;