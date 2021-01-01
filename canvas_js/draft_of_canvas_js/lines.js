canvas = document.getElementById('canvas_4');
context = canvas.getContext('2d');

size = 500;
canvas.width = size;
canvas.height = size;
context.lineWidth = 2;
context.lineCap = 'round';

step = 10;


function to_draw(x, y, width, height, positions) {
    context.save();
    context.translate(x + width / 2, y + height / 2);
    context.rotate(Math.random() * 5);
    context.translate(-width / 2, -height / 2);

    for (i = 0; i <= positions.length; i++) {
        context.beginPath();
        context.moveTo(positions[i] * width, 0);
        context.lineTo(positions[i] * width, height);
        context.stroke();
    }
    context.restore();
}

for (y = step; y < size - step; y += step) {
    for (x = step; x < size - step; x += step) {
        if (y < size / 3) to_draw(x, y, step, step, [0.5]);
        else if (y < size * 2 / 3) to_draw(x, y, step, step, [0.2, 0.8]);
        else to_draw(x, y, step, step, [0.1, 0.5, 0.9]);
    }
}