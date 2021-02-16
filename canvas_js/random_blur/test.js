canvas = document.getElementById('test');
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
        coordinates.push([x[0], y[0]]);
        coordinates.push([x[0], y[1]]);
        coordinates.push([x[1], y[1]]);
        coordinates.push([x[1], y[0]]);
        let scale = img.abs(x[0] - x[1]) * img.abs(y[0] - y[1]);
        squares.push([scale, coordinates]);
    }
    squares.sort(
        function (a, b) {
            return b[0] - a[0];
        }
    );
    console.log(squares);
    for (let square of squares) {
        let scale = square[0];
        let coordinates = square[1];
        // let dens = img.ratio(img.random(2, 20));
        let dens = scale ** 0.3;
        let dens_decrease = img.random(1, 2);
        let smooth_dens = 50;
        let num_iterations = 500;
        let num_recurrent = img.int(img.random(1, 4));
        draw_recurrent_polygon(coordinates, num_recurrent, dens, dens_decrease, smooth_dens, num_iterations);
    }
}

draw();
