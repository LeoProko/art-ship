canvas = document.getElementById('canvas_5');
context = canvas.getContext('2d');

size = 500;
canvas.width = size;
canvas.height = size;
context.lineWidth = 2;
context.strokeStyle = 'black';

circles = [];
min_radius = 2;
max_radius = size / 5;
total_circles = size * 3;
create_circles_attempts = size * 3;

function create_and_draw_circle() {
    let new_circle;
    let circle_safe_to_draw = false;

    for (let tries = 0; tries < create_circles_attempts; tries++) {
        new_circle = {
            x: Math.floor(Math.random() * size),
            y: Math.floor(Math.random() * size),
            radius: min_radius
        }
        if (! does_circle_have_a_collision(new_circle)) {
            circle_safe_to_draw = true;
            break;
        }
    }

    if (! circle_safe_to_draw)
        return;

    for (radius_size = min_radius; radius_size < max_radius; radius_size++) {
        new_circle.radius = radius_size;
        if (does_circle_have_a_collision(new_circle)) {
            new_circle.radius--;
            break;
        }
    }

    circles.push(new_circle);
    let red = Math.floor(Math.random() * 250);
    let green = Math.floor(Math.random() * 100);
    let blue = Math.floor(Math.random() * 205);
    context.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
    context.beginPath();
    context.arc(new_circle.x, new_circle.y, new_circle.radius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
}

function does_circle_have_a_collision(circle) {
    for (i = 0; i < circles.length; i++) {
        other_circle = circles[i];
        a = circle.radius + other_circle.radius;
        x = circle.x - other_circle.x;
        y = circle.y - other_circle.y;
        if (a >= Math.sqrt(x ** 2 + y ** 2))
            return true;
    }
    if (circle.x + circle.radius >= size || circle.x - circle.radius <= 0)
        return true;
    if (circle.y + circle.radius >= size || circle.y - circle.radius <= 0)
        return true;
    return false;
}

for (i = 0; i < total_circles; i++) {
    create_and_draw_circle();
}