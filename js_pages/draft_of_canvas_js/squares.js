canvas = document.getElementById('canvas_6');
context = canvas.getContext('2d');

size = 500;
canvas.width = size;
canvas.height = size;
context.lineWidth = 1.5;

final_size = 3;
let start_steps;
max_step = 7;
offset = 2;
tile_step = (size - 2 * offset) / 7;
start_size = tile_step;
directions = [-1, 0, 1];

function to_draw(x, y, width, height, x_move, y_move, steps) {
    context.beginPath();
    context.rect(x, y, width, height);
    context.stroke();

    if (steps >= 0) {
        new_size = start_size * (steps / start_steps) + final_size;
        new_x = x + (width - new_size) / 2;
        new_y = y + (height - new_size) / 2;
        new_x = new_x - ((x - new_x) / (steps + 2)) * x_move;
        new_y = new_y - ((y - new_y) / (steps + 2)) * y_move;
        to_draw(new_x, new_y, new_size, new_size, x_move, y_move, steps - 1);
    }
}


for (let x = offset; x < size - offset; x += tile_step) {
    for (let y = offset; y < size - offset; y += tile_step) {
        start_steps = 2 + Math.ceil(Math.random() * max_step);
        x_dir = directions[Math.floor(Math.random() * directions.length)]
        y_dir = directions[Math.floor(Math.random() * directions.length)]
        to_draw(x, y, start_size, start_size, x_dir, y_dir, start_steps);
    }
}

