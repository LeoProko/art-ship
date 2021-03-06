let size = 700;
let x = y = size / 2;
let b = 255;
let g = r = 0;

function setup() {
  createCanvas(size, size);
  frameRate(4);
}

function draw() {
    background(118, 140, 176);

    let density = height / 10;
    stroke(255);
    strokeWeight(0.5);
    draw_columns(density);
    draw_rows(density);
    let coordinates = give_coordinates(density);
    make_quads(density, coordinates);
    print(123);
}

function mousePressed() {
    if (r) {
        r = 0; g = 255;
    }
    else if (g){
        g = 0; b = 255;
    }
    else if (b) {
        b = 0; r = 255;
    }
}

function draw_columns(density) {
    for (let x = density; x < width; x += density) {
        line(x, 0, x, height);
    }
}

function draw_rows(density) {
    for (let y = density; y < height; y += density) {
        line(0, y, width, y);
    }
}

function give_coordinates(density) {
    let coordinates = [];
    for (let x = 0; x < width; x += density) {
        for (let y = 0; y < height; y += density) {
            let circle_x = random(x, x + density);
            let circle_y = random(y, y + density);
            ellipse(circle_x, circle_y, 3);
            coordinates.push([circle_x, circle_y]);
        }
    }
    return coordinates;
}

function make_quads(density, coordinates) {
    let line_density = height / density;
    for (let i = 0; i < line_density ** 2 - line_density - 1; i += 1) {
        fill(random(0, r), random(0, g), random(0, b));
        if ((i + 1) % line_density === 0) i++;
        quad(
            coordinates[i][0], coordinates[i][1],
            coordinates[i + 1][0], coordinates[i + 1][1],
            coordinates[i + 1 + line_density][0], coordinates[i + 1 + line_density][1],
            coordinates[i + line_density][0], coordinates[i + line_density][1]
        );

    }
}
