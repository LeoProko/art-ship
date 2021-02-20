canvas = document.getElementById('random_blur');
let size = 1200;
let img = new ArtShip(1 * size, 1 * size, canvas);

function draw() {
    img.background();
    let squares = []
    for (let i = 0; i < img.int(img.random(3, 5)); ++i) {
        let x = [];
        let y = [];
        for (let i = 0; i < 2; ++i) {
            x.push(img.random(0, img.width));
            y.push(img.random(0, img.height));
        }
        let coordinates = [];
        coordinates.push([x[0] + img.random(-img.ratio(10), img.ratio(10)), y[0] + img.random(-img.ratio(10), img.ratio(10))]);
        coordinates.push([x[0] + img.random(-img.ratio(10), img.ratio(10)), y[1] + img.random(-img.ratio(10), img.ratio(10))]);
        coordinates.push([x[1] + img.random(-img.ratio(10), img.ratio(10)), y[1] + img.random(-img.ratio(10), img.ratio(10))]);
        coordinates.push([x[1] + img.random(-img.ratio(10), img.ratio(10)), y[0] + img.random(-img.ratio(10), img.ratio(10))]);
        let scale = img.calculate_polygon_area(coordinates);
        squares.push([scale, coordinates]);
    }
    squares.sort(
        function (a, b) {
            return b[0] - a[0];
        }
    );
    for (let square of squares) {
        let coordinates = square[1];
        img.draw_smooth_polygon(
            coordinates,
            img.random(0, 255),
            img.random(0, 255),
            img.random(0, 255),
            0.2,
            0.2
        );
    }
}

draw();
