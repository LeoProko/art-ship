class LeoBrush {
    constructor(art_ship) {
        this.art_ship = art_ship;
    }
    // --------------------

    // Calligraphy brush
    #get_calligraphy_stroke(stroke) {
        let calligraphy_stroke = [];
        let thickness = this.art_ship.ratio(70);
        let x = stroke[0][0] + this.art_ship.random(-thickness, thickness);
        let y = stroke[0][1] + this.art_ship.random(-thickness, thickness);
        calligraphy_stroke.push([x, y]);
        for (let i = 1; i < stroke.length; i++) {
            if (stroke[0] === undefined) {
                break;
            }
            let width_deviation = this.art_ship.abs(stroke[i][0] - stroke[i - 1][0]);
            let height_deviation = this.art_ship.abs(stroke[i][1] - stroke[i - 1][1]);
            let total_deviation_tg;
            if (width_deviation !== 0)
                total_deviation_tg = height_deviation / width_deviation;
            else
                total_deviation_tg = 1;
            let total_deviation_angle = Math.atan(total_deviation_tg);
            let stroke_deviation = this.art_ship.remap(total_deviation_angle, 0, Math.PI / 2, thickness / 20, thickness);
            x = stroke[i][0] + this.art_ship.random(-stroke_deviation, stroke_deviation);
            y = stroke[i][1] + this.art_ship.random(-stroke_deviation, stroke_deviation);
            calligraphy_stroke.push([x, y]);
        }
        return calligraphy_stroke;
    }

    calligraphy(coordinates, red = 0, green = 0, blue = 0, random_color = false) {
        let discoloration;
        if (random_color) {
            discoloration = 100;
        }
        else {
            discoloration = 0;
        }
        if (coordinates === undefined || coordinates[0] === undefined) {
            return;
        }
        if (coordinates.length === 1) {
            coordinates.push(coordinates[0]);
        }
        let stroke_repetitions = this.art_ship.ratio(6);
        while (stroke_repetitions--) {
            coordinates = this.#get_calligraphy_stroke(coordinates);
            this.art_ship.curve(coordinates);
            this.art_ship.stroke(
                1,
                red + this.art_ship.random(-discoloration, discoloration),
                green + this.art_ship.random(-discoloration, discoloration),
                blue + this.art_ship.random(-discoloration, discoloration),
                0.25
            );
        }
    }
    // --------------------

    //One Back
    #get_one_back_curve(stroke) {
        let new_stroke = [stroke[0]].slice();
        for (let i = 1; i < stroke.length - 1; i++) {
            new_stroke.push(stroke[i].slice());
            new_stroke.push(stroke[i - 1].slice());
        }
        new_stroke.push(stroke[stroke.length - 1]);
        return new_stroke;
    }
    
    #get_noisy_stroke(stroke) {
        let thickness = this.art_ship.ratio(30);
        let noisy_stroke = []
        for (let j = 0; j < stroke.length; j++) {
            if (stroke[0] === undefined) {
                break;
            }
            let x;
            let y;
            if (Math.random() >= 0.3) {
                x = stroke[j][0] + this.art_ship.random(-thickness, thickness);
                y = stroke[j][1] + this.art_ship.random(-thickness, thickness);
            }
            else {
                let thickness_ratio = this.art_ship.random(2, 5);
                x = stroke[j][0] + this.art_ship.random(-thickness / thickness_ratio, thickness / thickness_ratio);
                y = stroke[j][1] + this.art_ship.random(-thickness / thickness_ratio, thickness / thickness_ratio);
            }
            noisy_stroke.push([x, y]);
        }
        return noisy_stroke;
    }

    one_back(coordinates, red = 0, green = 0, blue = 0, random_color = false) {
        let discoloration;
        if (random_color) {
            discoloration = 100;
        }
        else {
            discoloration = 0;
        }
        let stroke_repetitions = this.art_ship.ratio(8);
        while (stroke_repetitions--) {
            let draw_stroke = this.#get_one_back_curve(coordinates);
            draw_stroke = this.#get_noisy_stroke(draw_stroke);
            if (draw_stroke[0] === undefined) {
                break;
            }
            this.art_ship.curve(draw_stroke);
            this.art_ship.stroke(
                1,
                red + this.art_ship.random(-discoloration, discoloration),
                green + this.art_ship.random(-discoloration, discoloration),
                blue + this.art_ship.random(-discoloration, discoloration),
                0.3
            );
        }
    }
    // --------------------

    //Brush
    brush(coordinates, red = 0, green = 0, blue = 0, random_color = false) {
        let discoloration;
        if (random_color) {
            discoloration = 100;
        }
        else {
            discoloration = 0;
        }
        let stroke_repetitions = this.art_ship.ratio(8);
        while (stroke_repetitions--) {
            let draw_stroke = this.#get_noisy_stroke(coordinates);
            if (draw_stroke[0] === undefined) {
                break;
            }
            this.art_ship.curve(draw_stroke);
            this.art_ship.stroke(
                1,
                red + this.art_ship.random(-discoloration, discoloration),
                green + this.art_ship.random(-discoloration, discoloration),
                blue + this.art_ship.random(-discoloration, discoloration),
                0.3
            );
        }
    }
    // --------------------
}