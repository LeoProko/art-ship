canvas = document.getElementById('curves');

size = 500;
img = new ArtShip(size, size, canvas);
context = img.context;
img.background(255, 0, 255, 0.2);

step = size / 10;

function brush_hair (coordinates) {
    for (let brush_stroke = 0; brush_stroke < size / 20; brush_stroke++) {
        let points = [];
        for (let coordinate of coordinates) {
            x = img.random(coordinate[0] - size / 60, coordinate[0] + size / 60);
            y = img.random(coordinate[1] - size / 60, coordinate[1] + size / 60);
            points.push([x, y]);
        }

        for (let point of points) {
            img.circle(point[0], point[1], 5);
            img.fill(255, 255, 0, 0.5);
        }

        img.curve(points);
        img.stroke(0, 0, 0, 3, 0.5);
    }
}

coordinates = [
    [0, 0],
    [0.4 * size, 0.2 * size],
    [0.2 * size, 0.9 * size],
    [0.8 * size, 0.8 * size],
    [size, 0.3 * size]
];

brush_hair(coordinates);

pixel_image = context.getImageData(0, 0, 1000, 1000);
for (let i = 0; i < pixel_image.data.length; i += 4 * 40) {
    if (i % pixel_image.width === 0)
        i += 4 * 40 * pixel_image.width;
    pixel_image.data[i + 0] = 0;  // R value
    pixel_image.data[i + 1] = 0;    // G value
    pixel_image.data[i + 2] = 0;  // B value
    pixel_image.data[i + 3] = 255;  // A value
}
context.putImageData(pixel_image, 0, 0);