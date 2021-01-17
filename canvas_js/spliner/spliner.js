canvas = document.getElementById('spliner');
let size = 700;
let img = new ArtShip(size, 2 * size, canvas);
let context = img.context;

function draw() {
    img.background(0, 0, 0);
    for (let y = 0; y <= img.height * 1.3; y += img.ratio(img.random(3, 10))) {
        let line = [];
        for (let x = 0; x <= img.width * 1.3; x += img.ratio(img.random(4, 150))) {
            line.push([x + img.random(-img.ratio(10), img.ratio(20)), y + img.random(-img.ratio(20), img.ratio(8))]);
            x += img.int(img.random(-img.ratio(100), img.ratio(30)));
        }
        multi_curve(line);
    }
}

function multi_curve(line) {
    let curves = [];
    let i = 0;
    while (i < line.length) {
        let steps = img.int(img.random(10, 40));
        let start_i = i;
        let break_i = start_i + img.int(img.random(1, (line.length - start_i) * 0.3));
        while (steps--) {
            let new_line = [];
            for (let i = start_i; i < break_i; ++i) {
                let x = line[i][0] + img.random(-img.ratio(100), img.ratio(50));
                let y = line[i][1] + img.random(-img.ratio(100), img.ratio(100));
                new_line.push([x, y]);
                if (Math.random() > 0.99) {
                    break;
                }
            }
            curves.push(new_line);
        }
        i = break_i + img.int(img.random(1, 5));
    }
    for (let curve of curves) {
        if (curve.length > 1) {
            img.curve(curve);
            img.stroke(3, 255, 255, 255, 0.35);
        }
    }
}

draw();