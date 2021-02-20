canvas = document.getElementById('mountains');
let height = 297;
let width = 210;
let coeff = 4;
let img = new ArtShip(coeff * height, coeff * width, canvas);

function draw_cloud(x_center, y_center) {
    let width = img.random(img.ratio(20), img.ratio(3));
    let height = img.random(img.ratio(20), img.ratio(10));
    let coordinates = [];
    coordinates.push([x_center - width / 2, y_center + height / 2]);
    coordinates.push([x_center - width / 2, y_center - height / 2]);
    coordinates.push([x_center + width / 2, y_center - height / 2]);
    coordinates.push([x_center + width / 2, y_center + height / 2]);
    img.draw_smooth_polygon(coordinates, 255, 255, 255);
}

function draw_sun() {
    let x = img.random(0, img.width);
    let y = img.random(0, img.height / 2);
    let coordinates = img.make_regular_polygon(20, img.ratio(5), x, y)
    img.draw_smooth_polygon(coordinates, 255, 162, 87);
}


function draw_iteration() {
    let x = img.random(0, img.width);
    let y = img.random(0, img.height);
    draw_cloud(x, y);
    let coordinates = [[-img.ratio(10), img.height * 1.1]];
    for (let x = img.ratio(img.random(5, 20)); x <= img.width; x += img.ratio(img.random(5, 6))) {
        let y = img.random(high_max, img.height * 0.9);
        coordinates.push([x, y]);
    }
    coordinates.push([img.width + img.ratio(10), img.height * 1.1]);
    img.draw_smooth_polygon(coordinates, 50 + cloudy, 50 + cloudy, 153, 0.3, 0.3)
    cloudy -= 20;
    high_max += img.height * 0.15
}

let cloudy;
let high_max;

function draw() {
    img.background(255, 234, 117);
    draw_sun();
    cloudy = 100;
    high_max = 0;
    for (let i = 0; i < 6; ++i) {
        draw_iteration();
    }
}

draw();