canvas = document.getElementById('test');
let size = 1200;
let img = new ArtShip(1 * size, 1 * size, canvas);

function draw() {
    img.background();
    for (let i = 0; i < img.int(img.random(4, 7)); ++i) {
        let x = [];
        let y = [];
        for (let i = 0; i < 2; ++i) {
            x.push(img.random(0, img.width));
            y.push(img.random(0, img.height));
        }
        let coordinates = [];
        if (Math.random() > 0.7) {
            for (let x0 of x) {
                for (let y0 of y) {
                    coordinates.push([x0, y0]);
                }
            }
        }
        else {
            coordinates.push([x[0], y[0]]);
            coordinates.push([x[0], y[1]]);
            coordinates.push([x[1], y[1]]);
            coordinates.push([x[1], y[0]]);
        }
        img.polygon(coordinates);
        img.fill(
            img.random(0, 255),
            img.random(0, 255),
            img.random(0, 255),
        )
    }
}

draw();
