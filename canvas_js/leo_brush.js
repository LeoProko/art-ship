class LeoBrush {
    constructor(art_ship) {
        this.art_ship = art_ship;
    }
    // --------------------

    // Calligraphy brush
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
    // --------------------

    //One Back
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
    
    // Cat
    cat(coordinates, red = 0, green = 0, blue = 0, random_color = false) {
        let radius = this.art_ship.ratio(200);
        for (let i = 0; i < coordinates.length - 1; ++i) {
            let step = Math.sqrt((coordinates[i + 1][0] - coordinates[i][0]) ** 2 + (coordinates[i + 1][1] - coordinates[i][1]) ** 2) / (radius * 2);
            for (let s = 0; s < step; s += step / 5) {
                let x = coordinates[i][0] + (coordinates[i + 1][0] - coordinates[i][0]) / step * s;
                let y = coordinates[i][1] + (coordinates[i + 1][1] - coordinates[i][1]) / step * s;
                this.art_ship.print(x, y);
                this.#cat_brush_dot(coordinates[i][0], coordinates[i][1]);
            }
        }
    }

    #cat_brush_dot(x, y) {
        let angles_num = 10;
        let radius = this.art_ship.ratio(200);
        let coordinates_of_polygon = this.#make_default_polygon(angles_num, radius, x, y);
        let dens = radius * 0.4;
        let dens_decrease = 2;
        let smooth_dens = 4;
        let num_iterations = 60;
        let num_recurents = 7;
        this.#draw_recurent_polygon(coordinates_of_polygon, num_recurents, radius, dens, dens_decrease, smooth_dens, num_iterations);
    }

    #make_default_polygon(andles_num, radius, x0, y0) {
        let coordiantes_of_polygon = [];
        for (let angle = 0; angle < 2 * Math.PI; angle += 2 * Math.PI / andles_num) {
            let x = x0 + Math.cos(angle) * radius;
            let y = y0 + Math.sin(angle) * radius;
            coordiantes_of_polygon.push([x, y]);
        }
        return coordiantes_of_polygon;
    }

    #draw_recurent_polygon(coordinates_of_polygon, num_recurents, radius, dens, dens_decrease, smooth_dens, num_iterations) {
        while (num_recurents--) {
            coordinates_of_polygon = this.#twist_polygon(coordinates_of_polygon, radius, dens);
            dens /= dens_decrease;
        }
        this.#draw_smooth_polygon(coordinates_of_polygon, num_iterations, smooth_dens);
    }

    #twist_polygon(coordinates_of_polygon, radius, dens) {
        let new_coordinates = [];
        for (let i = 0; i < coordinates_of_polygon.length - 1; ++i) {
            new_coordinates.push(coordinates_of_polygon[i]);
            let stroke_height_x = this.art_ship.random(-dens, dens);
            let stroke_height_y = this.art_ship.random(-dens, dens);
            let x0 = (coordinates_of_polygon[i][0] + coordinates_of_polygon[i + 1][0]) / 2 + stroke_height_x;
            let y0 = (coordinates_of_polygon[i][1] + coordinates_of_polygon[i + 1][1]) / 2 + stroke_height_y;
            new_coordinates.push([x0, y0]);
        }
        new_coordinates.push(coordinates_of_polygon[coordinates_of_polygon.length - 1]);
        return new_coordinates;
    }

    #draw_smooth_polygon(coordinates_of_polygon, num_iterations, dens) {
        while (num_iterations--) {
            coordinates_of_polygon = this.#displace_coordinates(coordinates_of_polygon, dens);
            this.art_ship.polygon(coordinates_of_polygon);
            this.art_ship.fill(255, 200, 0, 0.04);
        }
    }

    #displace_coordinates(coordinates_of_polygon, dens) {
        for (let i = 0; i < coordinates_of_polygon.length; ++i) {
            coordinates_of_polygon[i][0] += this.art_ship.random(-dens, dens);
            coordinates_of_polygon[i][1] += this.art_ship.random(-dens, dens);
        }
        return coordinates_of_polygon;
    }
}
