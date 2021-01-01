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
    beginShape();
    for (let v of coordinates) {
        vertex(v[0], v[1]);
    }
    endShape(CLOSE);
    noLoop();
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

