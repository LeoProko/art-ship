canvas = document.getElementById('curves');

size = 500;
img = new ArtShip(size, size, canvas);
context = img.context;
img.background(255, 150, 0, 0.2);

step = img.ratio(10);

img.rect(img.width / 2, img.height / 2, 0.8 * img.width, 0.8 * img.width);
img.fill(0, 0, 0, 0.1)

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
        img.stroke(2, 0, 0, 0, 0.5);
    }
}

for (let i = 0; i < img.ratio(70); i++) {
    let coordinates = [];
    for (let j = 0; j < img.ratio(70); j++) {
        let x = img.random(-0.5, 1.5);
        let y = img.random(-0.5, 1.5);
        coordinates.push([x * img.width, y * img.height]);
    }
    brush_hair(coordinates);
}


pixel_image = img.return_pixel_image();
for (let i = 0; i < pixel_image.data.length; i += 4 * 40) {
    if (i % pixel_image.width === 0)
        i += 4 * 40 * pixel_image.width;
    pixel_image.data[i + 0] = 0;  // R value
    pixel_image.data[i + 1] = 0;    // G value
    pixel_image.data[i + 2] = 0;  // B value
    pixel_image.data[i + 3] = 255;  // A value
}

img.image_pixel_to_vector(pixel_image);