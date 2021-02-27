canvas = document.getElementById('gradient_face');
let height = 297;
let width = 210;
let coeff = 4;
let img = new ArtShip(coeff * height, coeff * width, canvas);

function draw_letters() {
    let steps = 20;
    for (let y0 = img.ratio(steps) / 2; y0 < img.height + img.ratio(steps); y0 += img.random(img.ratio(steps) * 2, img.ratio(steps) * 4)) {
        for (let x0 = 0; x0 < img.width + img.ratio(steps); x0 += img.random(img.ratio(steps) * 1, img.ratio(steps) * 2)) {
            let x = x0;
            let y = y0;
            let coordinates = [[x, y]];
            for (let i = 0; i < 10; ++i) {
                x += img.random(-img.ratio(steps * 1), img.ratio(steps * 1));
                y += img.random(-img.ratio(steps * 2.5), img.ratio(steps * 3));
                coordinates.push([x, y]);
            }
            for (let i = coordinates.length - 1; i >= 0; --i) {
                let width_step = img.random(4, 30);
                x = coordinates[i][0] + img.random(-img.ratio(steps * width_step), img.ratio(steps * width_step));
                y = coordinates[i][1] + img.random(-img.ratio(steps * width_step), img.ratio(steps * width_step));
                coordinates.push([x, y]);
            }
            coordinates.push(coordinates[0]);
            img.curve(coordinates);
            img.fill();
        }
    }
}

function draw() {
    img.background();
    draw_letters();

    let face = img.make_regular_polygon(6, img.width / 2, img.width / 2, img.height / 2);
    let dens = img.calculate_polygon_area(face) ** 0.42;
    face = img.twist_polygon(face, dens);
    img.polygon(face);
    img.stroke(20);
    img.curve(face);
    img.gradient();

    let eye;

    eye = img.make_regular_polygon(4, img.ratio(10), img.width * 0.3, img.height * 0.35);
    dens = img.calculate_polygon_area(eye) ** 0.4;
    eye = img.twist_polygon(eye, dens);
    img.polygon(eye);
    img.stroke(20);
    img.curve(eye);
    img.gradient();

    eye = img.make_regular_polygon(4, img.ratio(10), img.width * 0.7, img.height * 0.35);
    dens = img.calculate_polygon_area(eye) ** 0.4;
    eye = img.twist_polygon(eye, dens);
    img.polygon(eye);
    img.stroke(20);
    img.curve(eye);
    img.gradient();

    let mouth = [
        [img.width * 0.3, img.height * 0.6 + img.random(-img.ratio(10), img.ratio(10))],
        [img.width * 0.5, img.height * 0.7 + img.random(-img.ratio(10), img.ratio(20))],
        [img.width * 0.7, img.height * 0.6 + img.random(-img.ratio(10), img.ratio(10))],
    ]
    dens = img.calculate_polygon_area(eye) ** 0.4;
    mouth = img.twist_polygon(mouth, dens);
    mouth.push(mouth[0]);
    img.curve(mouth);
    img.curve(mouth);
    img.gradient();
    img.stroke(10);
}

draw();