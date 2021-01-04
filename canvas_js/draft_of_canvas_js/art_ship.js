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
        this.context.rect(0, 0, this.width, this.height);
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
    }

    circle(x, y, radius) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        return this.context;
    }

    rect(center_x,  center_y, width, height) {
        this.context.beginPath();
        this.context.rect(
            center_x - width / 2,
            center_y - height / 2,
            width,
            height
        );
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
        if (new_min_value <= new_max_value) {
            let coefficient = this.abs((new_max_value - new_min_value) / (max_value - min_value));
            return (value - min_value) * coefficient;
        }
        else {
            new_max_value = [new_min_value, new_min_value = new_max_value][0];
            let coefficient = this.abs((new_max_value - new_min_value) / (max_value - min_value));
            let new_value =  (value - min_value) * coefficient;
            return new_max_value + new_min_value - new_value;

        }
    }

    return_pixel_image() {
        return this.context.getImageData(0, 0, this.width, this.height);
    }

    image_pixel_to_vector(pixel_image) {
        this.context.putImageData(pixel_image, 0, 0);
    }
}
