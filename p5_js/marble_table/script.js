let size = 700;
let x = y = size / 2;
let r = 150;
let g = 50;
let b = 200;

function setup() {
  createCanvas(size, size);
}

function draw() {
    background(0);

    let colors = random_colors(r, g, b, 20);
    r = colors[0];
    g = colors[1];
    b = colors[2];
    if (r > 200 || r < 100) r = min(200, max(100, r));
    if (g > 200 || g < 100) g = min(200, max(100, g));
    if (b > 200 || b < 100) b = min(200, max(100, b));

    let density = height / 50;

    stroke(100);
    strokeWeight(0.5);
    draw_columns(density);
    draw_rows(density);
    let coordinates = give_coordinates(density);
    make_triangles(density, coordinates, r, g, b);

    noLoop();
}

function mousePressed() {
    loop();
}

function random_colors(r, g, b, d) {
    r = int(random(r - d, r + d))
    g = int(random(g - d, g + d))
    b = int(random(b - d, b + d));
    return [r, g, b];
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

function make_triangles(density, coordinates, r, g, b) {
    let line_density = height / density;
    //let start_density = int(random(line_density) / 10);
    let start_density = 20;
    for (let i = 0; i < line_density ** 2 - line_density - 1; i += 1) {
        if ((i + 1) % line_density === 0) i++;
        let dens = 20;
        fill(random(r - dens, r + dens), random(g - dens, r + dens), random(b - dens, b + dens), 1000);
        triangle(
            coordinates[i][0], coordinates[i][1],
            coordinates[i + 1][0], coordinates[i + 1][1],
            coordinates[i + 1 + line_density][0], coordinates[i + 1 + line_density][1],
        );
        fill(random(r - dens, r + dens), random(g - dens, r + dens), random(b - dens, b + dens));
        triangle(
            coordinates[i][0], coordinates[i][1],
            coordinates[i + 1 + line_density][0], coordinates[i + 1 + line_density][1],
            coordinates[i + line_density][0], coordinates[i + line_density][1]
        );
    }
}