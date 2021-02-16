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
    let red = img.random(0, 255);
    let green = img.random(0, 255);
    let blue = img.random(0, 255);
    while (num_iterations--) {
        let new_coordinates = displace_coordinates(coordinates, dens);
        img.curve(new_coordinates);
        img.fill(
            red, green, blue,
            0.1);
    }
}

function displace_coordinates(coordinates, dens) {
    let new_coordinates = []
    for (let i = 0; i < coordinates.length; ++i) {
        let x = coordinates[i][0] + img.random(-dens, dens);
        let y = coordinates[i][1] + img.random(-dens, dens);
        new_coordinates.push([x, y]);
    }
    return new_coordinates;
}

