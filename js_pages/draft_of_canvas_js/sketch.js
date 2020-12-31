let canv = document.getElementById('canvas_2');
let context = canv.getContext('2d');

let s = 500;
let dpr = window.devicePixelRatio;

//canv.width = s * dpr;
//canv.height = s * dpr;
canv.width = 500;
canv.height = 500;
//context.scale(dpr, dpr);

context.lineCap = 'square';
context.lineWidth = 2;

let step = 20;

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

for (let x = 0; x <= s; x += step) {
    for (let y = 0; y <= s; y += step) {
        to_draw(x, y, step, step);
    }
}





