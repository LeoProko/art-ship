canvas = document.getElementById('polygon_smoother');
let size = 700;
let img = new ArtShip(3 * size, 1 * size, canvas);

function draw() {
    img.background(0, 0, 0);
    let angles_num, radius, x_center, y_center, coordinates, dens, smooth_dens, num_iterations, num_recurents;

    // 1-st variant
    angles_num = 20;
    radius = img.ratio(4);
    x_center = img.width / 2;
    y_center = 1 * img.width / 2;
    coordinates = make_default_polygon(angles_num, radius, x_center, y_center);
    dens = radius * 0.2;
    dens_decrease = 3;
    smooth_dens = 5;
    num_iterations = 60;
    num_recurents = 4;
    draw_recurent_polygon(coordinates, num_recurents, radius, dens, dens_decrease, smooth_dens, num_iterations);

    // 2-nd variant
    angles_num = 15;
    radius = img.ratio(4);
    x_center = img.width / 2;
    y_center = 3 * img.width / 2;
    coordinates = make_default_polygon(angles_num, radius, x_center, y_center);
    dens = radius * 1.5;
    dens_decrease = 5;
    smooth_dens = 6;
    num_iterations = 70;
    num_recurents = 2;
    draw_recurent_polygon(coordinates, num_recurents, radius, dens, dens_decrease, smooth_dens, num_iterations);

    // 3-rd variant
    angles_num = 15;
    radius = img.ratio(9);
    x_center = img.width / 2;
    y_center = 5 * img.width / 2;
    coordinates = make_default_polygon(angles_num, radius, x_center, y_center);
    dens = radius * 4;
    dens_decrease = 2;
    smooth_dens = 3;
    num_iterations = 50;
    num_recurents = 8;
    draw_recurent_polygon(coordinates, num_recurents, radius, dens, dens_decrease, smooth_dens, num_iterations);
}

function make_default_polygon(andles_num, radius, x0, y0) {
    let coordiantes = [];
    for (let angle = 0; angle < 2 * Math.PI; angle += 2 * Math.PI / andles_num) {
        let x = x0 + Math.cos(angle) * radius;
        let y = y0 + Math.sin(angle) * radius;
        coordiantes.push([x, y]);
    }
    return coordiantes;
}

function draw_recurent_polygon(coordinates, num_recurents, radius, dens, dens_decrease, smooth_dens, num_iterations) {
    while (num_recurents--) {
        coordinates = twist_polygon(coordinates, radius, dens);
        dens /= dens_decrease;
    }
    let = 35;
    draw_smooth_polygon(coordinates, num_iterations, smooth_dens);
}

function twist_polygon(coordinates, radius, dens) {
    let new_coordinates = [];
    for (let i = 0; i < coordinates.length - 1; ++i) {
        new_coordinates.push(coordinates[i]);
        // let ratio_between_points = img.random(0.05, 0.95);
        // let stroke_height = img.random(-radius / 10, radius / 4);
        // let x0 = coordinates[i][0] + (coordinates[i + 1][0] - coordinates[i][0]) * ratio_between_points;
        // let y0 = coordinates[i][1] + (coordinates[i + 1][1] - coordinates[i][1]) * ratio_between_points;
        let stroke_height_x = img.random(-dens, dens);
        let stroke_height_y = img.random(-dens, dens);
        let x0 = (coordinates[i][0] + coordinates[i + 1][0]) / 2 + stroke_height_x;
        let y0 = (coordinates[i][1] + coordinates[i + 1][1]) / 2 + stroke_height_y;
        new_coordinates.push([x0, y0]);
    }
    new_coordinates.push(coordinates[coordinates.length - 1]);
    return new_coordinates;
}

function draw_smooth_polygon(coordinates, num_iterations, dens) {
    while (num_iterations--) {
        coordinates = displace_coordinates(coordinates, dens);
        img.polygon(coordinates);
        img.fill(255, 200, 0, 0.04);
    }
}

function displace_coordinates(coordinates, dens) {
    for (let i = 0; i < coordinates.length; ++i) {
        coordinates[i][0] += img.random(-dens, dens);
        coordinates[i][1] += img.random(-dens, dens);
    }
    return coordinates;
}

draw();
