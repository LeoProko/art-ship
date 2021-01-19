canvas = document.getElementById('line_pattern');
context = canvas.getContext('2d');

size = 700;
dpr = window.devicePixelRatio;

canvas.width = 2 * size;
canvas.height = size;

context.lineCap = 'square';
context.lineWidth = 8;

let step = 50;

function to_draw(x, y, width, height) {
    let left_to_right = Math.random() >= 0.5;

    if (left_to_right) {
        context.moveTo(x, y);
        context.lineTo(x + width, y + height);
    }
    else {
        context.moveTo(x + width, y);
        context.lineTo(x, y + height);
    }

    context.strokeStyle = 'white';
    context.stroke();
}

for (let x = 0; x <= 2 * size; x += step) {
    for (let y = 0; y <= size; y += step) {
        to_draw(x, y, step, step);
        to_draw(x, y, step, step);
    }
}





