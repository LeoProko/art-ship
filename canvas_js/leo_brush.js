class LeoBrush {
    constructor(art_ship) {
        this.art_ship = art_ship;
    }
    // --------------------

    // Calligraphy brush
    #get_calligraphy_stroke(stroke) {
        let calligraphy_stroke = [];
        let dens = this.art_ship.ratio(50);
        let first_stroke_dens = dens / this.art_ship.random(1, 15);
        let x = stroke[0][0] + this.art_ship.random(-first_stroke_dens, first_stroke_dens);
        let y = stroke[0][1] + this.art_ship.random(-first_stroke_dens, first_stroke_dens);
        calligraphy_stroke.push([x, y]);
        for (let i = 1; i < stroke.length; i++) {
            let width_drop = this.art_ship.abs(stroke[i][0] - stroke[i - 1][0]);
            let height_drop = this.art_ship.abs(stroke[i][1] - stroke[i - 1][1]);
            let total_drop_tg;
            if (width_drop !== 0)
                total_drop_tg = height_drop / width_drop;
            else
                total_drop_tg = 1;
            let total_drop_angle = Math.atan(total_drop_tg);
            let stroke_dens = this.art_ship.remap(total_drop_angle, 0, Math.PI / 2, dens / 15, dens);
            x = stroke[i][0] + this.art_ship.random(-stroke_dens, stroke_dens);
            y = stroke[i][1] + this.art_ship.random(-stroke_dens, stroke_dens);
            calligraphy_stroke.push([x, y]);
        }
        return calligraphy_stroke;
    }

    calligraphy(coordinates, red = 0, green = 0, blue = 0) {
        if (coordinates.length === 1) {
            coordinates.push(coordinates[0]);
        }
        let lines_num = this.art_ship.ratio(10);
        while (lines_num--) {
            coordinates = this.#get_calligraphy_stroke(coordinates);
            this.art_ship.curve(coordinates);
            this.art_ship.stroke(1, red, green, blue, 0.3);
        }
    }
    // --------------------
}