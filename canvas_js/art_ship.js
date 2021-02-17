class ArtShip {
    constructor(height, width, canvas) {
        this.height = height;
        this.width = width;
        this.context = canvas.getContext('2d');
        this.canvas = canvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.mouse = {
            x: null,
            y: null,
            pressed: false
        };
    }

    print(...message) {
        console.log(message);
    }

    fill(red = 0, green = 0, blue = 0, alpha = 1) {
        this.context.save();
        this.context.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
        this.context.fill();
        this.context.restore();
    }

    background(red = 255, green = 255, blue = 255, alpha = 1) {
        this.context.beginPath();
        this.context.rect(0, 0, this.width, this.height);
        this.context.closePath();
        this.fill(red, green, blue, alpha);
    }

    stroke(size = 1, red = 0, green = 0, blue = 0, alpha = 1) {
        this.context.save();
        this.context.lineWidth = size;
        this.context.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
        this.context.stroke();
        this.context.restore();
    }

    line(start_x, start_y, end_x, end_y) {
        this.context.beginPath();
        this.context.moveTo(start_x, start_y);
        this.context.lineTo(end_x, end_y);
        this.context.closePath();
    }

    circle(x, y, radius) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        return this.context;
        this.context.closePath();
    }

    rect(center_x,  center_y, width, height) {
        this.context.beginPath();
        this.context.rect(
            center_x - width / 2,
            center_y - height / 2,
            width,
            height
        );
        this.context.closePath();
    }

    polygon(coordinates = [[0, 0,]]) {
        this.context.beginPath();
        this.context.moveTo(coordinates[0][0], coordinates[0][1]);
        for (let i = 1; i < coordinates.length; ++i) {
            this.context.lineTo(coordinates[i][0], coordinates[i][1]);
        }
        this.context.closePath();
    }

    make_regular_polygon(andles_num, radius, x0, y0) {
        let coordiantes = [];
        for (let angle = 0; angle < 2 * Math.PI; angle += 2 * Math.PI / andles_num) {
            let x = x0 + Math.cos(angle) * radius;
            let y = y0 + Math.sin(angle) * radius;
            coordiantes.push([x, y]);
        }
        return coordiantes;
    }

    curve(coordinates) {
        this.context.beginPath();
        this.context.moveTo(coordinates[0][0], coordinates[0][1]);
        let x_average, y_average;
        for (let i = 0; i < coordinates.length - 1; i++) {
            x_average = (coordinates[i][0] + coordinates[i + 1][0]) / 2;
            y_average = (coordinates[i][1] + coordinates[i + 1][1]) / 2;
            this.context.quadraticCurveTo(coordinates[i][0], coordinates[i][1], x_average, y_average);
        }
        let i = coordinates.length - 2;
        this.context.quadraticCurveTo(x_average, y_average, coordinates[i + 1][0], coordinates[i + 1][1]);
    }

    random(min_value, max_value) {
        return Math.random() * (max_value - min_value) + min_value;
    }

    int(number) {
        return Math.floor(number);
    }

    round(number) {
        return Math.round(number);
    }
    
    abs(number) {
        return Math.abs(number);
    }

    ratio(ratio) {
       return this.int(Math.min(this.width, this.height) / ratio);
    }

    remap(value, min_value, max_value, new_min_value, new_max_value) {
        if (value < min_value)
            value = min_value;
        else if (value > max_value)
            value = max_value;
        if (new_min_value >= new_max_value) {
            new_max_value = [new_min_value, new_min_value = new_max_value][0];
        }

        let max_value_norm = max_value - min_value;
        let new_max_value_norm = new_max_value - new_min_value;
        let new_value = value - min_value;
        new_value = new_value / max_value_norm * new_max_value_norm;
        new_value += new_min_value;

        if (new_min_value >= new_max_value) {
            new_value = new_max_value - (new_value - new_min_value);
        }

        return new_value;
    }

    load_image(path) {
        let image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = path;
        return image;
    }

    pixel_image() {
        return this.context.getImageData(0, 0, this.width, this.height);
    }

    pixels(pixel_image) {
        return pixel_image.data;
    }

    index(x, y) {
        return (x + y * this.width) * 4;
    }

    pixel_to_vector(pixel_image) {
        this.context.putImageData(pixel_image, 0, 0);
    }

    draw_image(image, upper_left_corner_x = 0, upper_left_corner_y = 0, width = image.width, height = image.height) {
        this.context.drawImage(image, upper_left_corner_x, upper_left_corner_y, width, height);
    }

    save_image() {
        let image_to_save = document.createElement('a');
        document.body.appendChild(image_to_save);
        image_to_save.href = canvas.toDataURL();
        image_to_save.download = 'art_ship_lab.png';
        image_to_save.click();
        image_to_save.remove();
    }

    mouse_update() {
        this.canvas.addEventListener('mousemove', event => {
            this.mouse.x = event.offsetX;
            this.mouse.y = event.offsetY;
        })

        this.canvas.addEventListener('mousedown', event => {
            this.mouse.pressed = true;
        })

        this.canvas.addEventListener('mouseup', event => {
            this.mouse.pressed = false;
        })
    }

    resize_canvas(width = this.canvas.width, height = this.canvas.height) {
        this.canvas.width = width;
        this.width = width;
        this.canvas.height = height;
        this.height = height;
    }

    draw_smooth_polygon(coordinates, red = 0, green = 0, blue = 0) {
        if (coordinates[0] !== coordinates[coordinates.length - 1]) {
            coordinates.push(coordinates[0]);
        }
        let dens = this.calculate_polygon_area(coordinates) ** 0.3;
        let dens_decrease = this.random(1, 2);
        let smooth_dens = 50;
        let num_iterations = 500;
        let num_recurrent = this.int(this.random(1, 4));
        this.#draw_recurrent_polygon(coordinates, num_recurrent, dens, dens_decrease, smooth_dens, num_iterations, red, green, blue);
    }
    
    calculate_polygon_area(coordinates) {
        let square = 0;
        for (let i = 0, l = coordinates.length; i < l; i++) {
            let x_0 = coordinates[i][0];
            let y_0 = coordinates[i == coordinates.length - 1 ? 0 : i + 1][1];
            let x_1 = coordinates[i == coordinates.length - 1 ? 0 : i + 1][0];
            let y_1 = coordinates[i][1];
            square += (x_0 * y_0 * 0.5);
            square -= (x_1 * y_1 * 0.5);
        }
        return Math.abs(square);
    }

    #draw_recurrent_polygon(coordinates, num_recurents, dens, dens_decrease, smooth_dens, num_iterations, red, green, blue) {
        while (num_recurents--) {
            coordinates = this.#twist_polygon(coordinates, dens);
            dens /= dens_decrease;
        }
        this.#draw_smooth_polygon(coordinates, num_iterations, smooth_dens, red, green, blue);
    }

    #twist_polygon(coordinates, dens) {
        let new_coordinates = [];
        for (let i = 0; i < coordinates.length - 1; ++i) {
            new_coordinates.push(coordinates[i]);
            let stroke_height_x = this.random(-dens, dens);
            let stroke_height_y = this.random(-dens, dens);
            let x0 = (coordinates[i][0] + coordinates[i + 1][0]) / 2 + stroke_height_x;
            let y0 = (coordinates[i][1] + coordinates[i + 1][1]) / 2 + stroke_height_y;
            new_coordinates.push([x0, y0]);
        }
        new_coordinates.push(coordinates[coordinates.length - 1]);
        return new_coordinates;
    }

    #draw_smooth_polygon(coordinates, num_iterations, dens, red, green, blue) {
        if (red === 0 && green === 0 && blue === 0) {
            red = this.random(0, 255);
            green = this.random(0, 255);
            blue = this.random(0, 255);
        }
        while (num_iterations--) {
            let new_coordinates = this.#displace_coordinates(coordinates, dens);
            this.curve(new_coordinates);
            this.fill(red, green, blue, 0.1);
        }
    }

    #displace_coordinates(coordinates, dens) {
        let new_coordinates = []
        for (let i = 0; i < coordinates.length; ++i) {
            let x = coordinates[i][0] + this.random(-dens, dens);
            let y = coordinates[i][1] + this.random(-dens, dens);
            new_coordinates.push([x, y]);
        }
        return new_coordinates;
    }
}
