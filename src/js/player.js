var cells_factory = require('./cells/cell.js').cells_factory;

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function get_shift(a) {
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
        return 10
    }

}

var get_audio_name = function (y) {
    let a = 20 - y;
    let oct = Math.floor(a / 5);
    let shift = get_shift(a % 5);
    let b = oct * 12 + shift;
    return 'audio/jobro__piano-ff-' + pad(b + 10, 3) + '.wav'
};

class Player {
    create_audio(y) {
        if (!this.audios.has(y)) {
            let audio = new Audio(get_audio_name(y));
            audio.load();
            this.loading++;
            audio.oncanplaythrough = () => {
                this.loading--;
                if (this.loading == 0) {
                    this.onready()
                }
            };
            this.audios.set(y, audio);
        }
    }


    constructor(height, onready) {
        this.audios = new Map();
        this.onready = onready;
        this.loading = 0;
        for (let y = 0; y < height; y++) {
            this.create_audio(y);
        }
    }

    play_cells(x, cells) {
        let volume = 1 / cells.size;
        volume = Math.sqrt(volume);
        volume = Math.sqrt(volume);
        for (let cell of cells) {
            let y = cell.y;
            if (this.audios.has(y)) {
                let audio = this.audios.get(y);
                audio.pause();
                audio.currentTime = 0;
                audio.volume = volume;
                audio.play();
            }
        }

    }

}

module.exports = Player;