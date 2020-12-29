let size = 700;
let extra_canvas;
let prev_x = prev_y = 1;
let x = y = size / 2;
let dens = 10;

function setup() {
    createCanvas(size, size);
    extra_canvas = createGraphics(size, size);
    extra_canvas.clear();
}

function draw() {
    background(133, 249, 255);

    noFill();

    stroke(100, 0, 250);
    strokeWeight(4);
    for (let r = 0; r <= 2 * width; r += 15) {
        ellipse(width / 2, height / 2, r);
    }

    stroke(200, 100, 150);
    strokeWeight(4);
    for (let r = 0; r <= height / 2; r += 15) {
        ellipse(x, y, r);
    }

        extra_canvas.rectMode(CENTER);
        extra_canvas.fill(255, 0, 0, 50);
        extra_canvas.noStroke();
        extra_canvas.ellipse(x, y, 10);
        prev_x = mouseX;
        prev_y = mouseY;
    image(extra_canvas, 0, 0)

    x += random(-dens, dens);
    y += random(-dens, dens);

    if (x > width - dens) x -= dens;
    else if (x < dens) x += dens;
    if (y > height - dens) y -= dens;
    else if (y < dens) y += dens;
}

function mousePressed(){
    extra_canvas.clear();
}