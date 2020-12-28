let circles = [];
let size = 700;
let radius = size / 10;

function setup() {
  createCanvas(size, size);
}

function draw() {
    r = map(mouseX, 0, width, 50, 150);
    b = map(mouseY, 0, height, 200, 100);
    background(r, 0, b);

    fill(random(150, 255), random(150, 255), random(150, 255), 30);
    noStroke();
    ellipse(width / 2, height / 2, size);
    square_canvas();

    fill(random(100, 125), 100);
    stroke(255);
    strokeWeight(5);
    ellipse(mouseX, mouseY, radius)

    for (let circ of circles) {
        if (circ.contains(mouseX, mouseY)) circ.change_color(255);
        else circ.change_color(random(0, 100));
        circ.show();
    }

    if (mouseIsPressed){
    }

    if (circles.length > 6) circles.splice(0, 1);
}

function mousePressed(){
    if (circles.length == 0) {
        let new_bubble = new Bubble(mouseX, mouseY, radius);
        circles.push(new_bubble);
        return;
    }
    contains_bubble_flag = contains_bubble(mouseX, mouseY);
    if (contains_bubble_flag) circles.splice(contains_bubble_flag - 1, 1);
    else {
        let new_bubble = new Bubble(mouseX, mouseY, radius);
        circles.push(new_bubble);
    }
}

function contains_bubble(x, y) {
    for (let i = 0; i < circles.length; i++) {
        if (circles[i].contains(x, y)) {
            return i + 1;
        }
    }
    return false;
}

function square_canvas() {
    density = map(dist(mouseX, mouseY, width / 2, height / 2), 0, sqrt((height / 2) ** 2 + (width / 2) ** 2), 40, 60);
    let xx = width / 2 - 6 * (size / 40 + density);
    for (let x = xx; x <= width + radius; x += density) {
        for (let y = xx; y <= height + radius; y += density) {
            rectMode(CENTER);
            fill(100, 100);
            stroke(0);
            strokeWeight(5);
            rect(x, y, 40);
        }
    }
}

class Bubble{
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.brightness = random(255);
    }

    change_color(bright) {
        this.brightness = bright;
    }

    contains(x, y) {
        let distance = dist(x, y, this.x, this.y);
        if (distance < this.r / 2) return true;
        else return false;
    }

    show() {
        stroke(255);
        strokeWeight(5);
        fill(this.brightness, 100);
        ellipse(this.x, this.y, this.r);
    }
}
