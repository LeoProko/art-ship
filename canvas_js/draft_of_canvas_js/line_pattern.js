canvas = document.getElementById('line_pattern');
context = canvas.getContext('2d');

size = 500;
dpr = window.devicePixelRatio;

//canv.width = s * dpr;
//canv.height = s * dpr;
canvas.width = 500;
canvas.height = 500;
//context.scale(dpr, dpr);

context.lineCap = 'square';
context.lineWidth = 8;

let step = 35;

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

    context.stroke();
}

for (let x = 0; x <= size; x += step) {
    for (let y = 0; y <= size; y += step) {
        to_draw(x, y, step, step);
        to_draw(x, y, step, step);
    }
}





