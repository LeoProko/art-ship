canvas = document.getElementById('mondrian');
context = canvas.getContext('2d');

size = 700;
canvas.width = 2 * size;
canvas.height = size;
context.lineWidth = 6;
step = size / 7;
white = '#f0f0f0';
colors = ['#000000', '#fcca00', '#fc002a'];
num_color_blocks = 7;

squares = [{
    x: 0,
    y: 0,
    width: 2 * size,
    height: size
}];

function split_squares_width(coordinates) {
    const {x, y} = coordinates;

    for (let i = squares.length - 1; i >=0; i--) {
        const square = squares[i];
        if (x && x > square.x && x < square.x + square.width) {
            if (Math.random() > 0.5) {
                squares.splice(i, 1);
                split_on_x(square, x);
            }
        }
        if (y && y > square.y && y < square.y + square.height) {
            if (Math.random() > 0.4) {
                squares.splice(i, 1);
                split_on_y(square, y);
            }
        }
    }
}

function split_on_x(square, split_at) {
    square_a = {
        x: square.x,
        y: square.y,
        width: square.width - (square.width - split_at + square.x),
        height: square.height
    };
    square_b = {
        x: split_at,
        y: square.y,
        width: square.width - split_at + square.x,
        height: square.height
    };
    squares.push(square_a);
    squares.push(square_b);
}

function split_on_y(square, split_at) {
    square_a = {
        x: square.x,
        y: square.y,
        width: square.width,
        height: square.height - (square.height - split_at + square.y),
    };
    square_b = {
        x: square.x,
        y: split_at,
        width: square.width,
        height: square.height - split_at + square.y
    };
    squares.push(square_a);
    squares.push(square_b);
}

for (let i = 0; i < 2 * size; i += step) {
    split_squares_width({x: i});
    split_squares_width({y: i});
}

function to_draw() {
    for (let i = 0; i < num_color_blocks; i++) {
        squares[Math.floor(Math.random() * squares.length)].color =
            colors[Math.floor(Math.random() * colors.length)];
    }
    for (let i = 0; i < squares.length; i++) {
        context.beginPath();
        context.rect(
            squares[i].x,
            squares[i].y,
            squares[i].width,
            squares[i].height
        );
        if (squares[i].color)
            context.fillStyle = squares[i].color;
        else
            context.fillStyle = white;
        context.fill();
        context.stroke();
    }
}

to_draw();