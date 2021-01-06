canvas = document.getElementById('curves');

size = 700;
img = new ArtShip(size, 2 * size, canvas);
context = img.context;

step = img.ratio(10);

function brush_hair (coordinates) {
    for (let brush_stroke = 0; brush_stroke < img.ratio(30); brush_stroke++) {
        let points = [];
        for (let coordinate of coordinates) {
            x = img.random(coordinate[0] - img.ratio(60), coordinate[0] + img.ratio(60));
            y = img.random(coordinate[1] - img.ratio(60), coordinate[1] + img.ratio(60));
            points.push([x, y]);
        }

        for (let point of points) {
            img.circle(point[0], point[1], img.ratio(100));
            img.fill(255, 255, 0, 0.2);
        }

        img.curve(points);
        img.stroke(2, 255, 255, 255, 0.5);
    }
}

function draw() {
    img.background(0, 0, 0);
    for (let i = 0; i < img.ratio(70); i++) {
        let coordinates = [];
        for (let j = 0; j < img.ratio(70); j++) {
            let x = img.random(0, 1);
            let y = img.random(-0.5, 1.5);
            coordinates.push([x * img.width, y * img.height]);
        }
        brush_hair(coordinates);
    }

    pixel_image = img.pixel_image();
    pixels = img.pixels(pixel_image);
    step = img.ratio(100);
    for (let x = step; x < pixel_image.width; x += step) {
        for (let y = step; y < pixel_image.height; y += step) {
            i = img.index(x, y);
            pixels[i + 0] = 0;  // R value
            pixels[i + 1] = 0;    // G value
            pixels[i + 2] = 0;  // B value
            pixels[i + 3] = 255;  // A value
        }
    }

    img.pixel_to_vector(pixel_image);
}

draw();