canvas = document.getElementById('polygon_smoother');
let size = 1000;
let img = new ArtShip(4 * size, 3 * size, canvas);

function draw() {
    img.background(0, 0, 0);
    let coordinates, dens, dens_decrease, smooth_dens, num_iterations, num_recurents;

    coordinates = [
        [0.2 * img.width, 0.2 * img.height],
        [0.8 * img.width, 0.2 * img.height],
        [0.8 * img.width, 0.8 * img.height],
        [0.2 * img.width, 0.8 * img.height],
        [0.2 * img.width, 0.2 * img.height],
    ]
    // coordinates = [];
    // for (let i = 0; i < 4; ++i) {
    //     let x = img.random(0, img.width);
    //     let y = img.random(0, img.height);
    //     coordinates.push([x, y]);
    // }
    // coordinates.sort();

    dens = img.ratio(2);
    dens_decrease = 2;
    smooth_dens = 5;
    num_iterations = 100;
    num_recurents = 5;
    draw_recurrent_polygon(coordinates, num_recurents, dens, dens_decrease, smooth_dens, num_iterations);
}

function draw_recurrent_polygon(coordinates, num_recurents, dens, dens_decrease, smooth_dens, num_iterations) {
    while (num_recurents--) {
        coordinates = twist_polygon(coordinates, dens);
        dens /= dens_decrease;
    }
    draw_smooth_polygon(coordinates, num_iterations, smooth_dens);
}

function twist_polygon(coordinates, dens) {
    let new_coordinates = [];
    for (let i = 0; i < coordinates.length - 1; ++i) {
        new_coordinates.push(coordinates[i]);
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
        img.stroke(
            3,
           180 + img.random(-50, 50),
            180 + img.random(-50, 50),
            200 + img.random(-100, 100),
            0.3);
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
