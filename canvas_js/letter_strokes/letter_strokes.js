canvas = document.getElementById('letter_strokes');

let size = 700;
// let img = new ArtShip(2 / 3 * 4 * size, 2 * size, canvas);
let img = new ArtShip(4 / 3 * size, size, canvas);
let context = img.context;
img.background(0, 0, 0);
img.mouse_update();

let num_in_column = 4;
let dens = img.ratio(img.ratio(25));
let cor_dens = img.ratio(1.5 * num_in_column);
let pillar_dens = cor_dens / 5;
let lines_num = img.ratio(4);

let red = 200;
let green = 220;
let blue = 220;
let color_random = 100;

function draw(x, y) {
    let stroke = []
    let points = img.int(img.random(4, 11));
    let random = img.random(0.4, 1);
    for (let i = 0; i < points; i++) {
        stroke.push([x + img.random(-cor_dens, cor_dens), y + img.random(-cor_dens, cor_dens)]);
        if (Math.random() > random)
            stroke.push([x, y]);
        x += img.random(-pillar_dens, pillar_dens)
        y += img.random(-pillar_dens, pillar_dens)
    }
    for (let i = 0; i < lines_num; i++) {
        let to_draw_stroke = get_noisy_stroke(stroke);
        img.curve(to_draw_stroke);
        img.stroke(1,
            red + img.random(-color_random, color_random),
            green + img.random(-color_random, color_random),
            blue + img.random(-color_random, color_random),
            0.3);
    }
}

function get_noisy_stroke(stroke) {
    let noisy_stroke = []
    for (let j = 0; j < stroke.length; j++) {
        let dens_ratio = img.random(1, 3);
        let x = stroke[j][0] + img.random(-dens / dens_ratio, dens / dens_ratio);
        let y = stroke[j][1] + img.random(-dens / dens_ratio, dens / dens_ratio);
        noisy_stroke.push([x, y]);
    }
    return noisy_stroke;
}

for (let y = img.height / num_in_column / 2; y < img.height; y += img.height / num_in_column) {
    for (let x = img.height / num_in_column / 2; x < img.width; x += img.height / num_in_column) {
        draw(x + img.random(-pillar_dens, pillar_dens), y + img.random(-pillar_dens, pillar_dens));
    }
}
