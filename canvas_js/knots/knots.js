canvas_10 = document.getElementById('knot_10');
canvas_40 = document.getElementById('knot_40');

size = 700;
img_10 = new ArtShip(size, 2 * size, canvas_10);
img_40 = new ArtShip(size, 2 * size, canvas_40);

// let step = img_10.ratio(10);
let fps = 10;
let frame = 1;

function draw(img, step, line_width, alpha_stroke) {
    img.background(0, 0, 0);
    for (let x_start = step / 2; x_start < img.width; x_start += 2 * step) {
        let coordinates = [];
        for (let y_start = step / 2; y_start < img.height; y_start += 2 * step) {
            let points = img.random(5, 15);
            let iter = img.random(10, 15);
            for (let i = 0; i < points; i++) {
                let x = img.random(x_start, x_start + step);
                let y = img.random(y_start, y_start + step);
                coordinates.push([x, y]);
            }

            for (let i = 0; i < iter; i++) {
                let dens = step / img.random(1, 70) ;
                img.curve(coordinates);
                img.stroke(line_width, 255, 0, 0, alpha_stroke);
                for (let j = 0; j < coordinates.length; j++) {
                    coordinates[j][0] += img.random(-dens, dens);
                    coordinates[j][1] += img.random(-dens, dens);
                }
            }
        }
    }
}

draw(img_10, img_10.ratio(10), 1, 0.3);
draw(img_40, img_40.ratio(40), 0.1, 0.2);
