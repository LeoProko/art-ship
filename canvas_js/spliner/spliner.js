canvas = document.getElementById('spliner');
let size = 700;
let img = new ArtShip(size, 2 * size, canvas);
let context = img.context;

function draw() {
    img.background(0, 0, 0);
    background();
    for (let y = 0; y <= img.height * 1.3; y += img.ratio(img.random(4, 8))) {
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
    let colors = [];
    let i = 0;
    while (i < line.length) {
        let steps = img.int(img.random(15, 70));
        let max_step = steps;
        let start_i = i;
        let break_i = start_i + img.int(img.random(1, (line.length - start_i) * 0.25));
        while (steps--) {
            let new_line = [];
            for (let i = start_i; i < break_i; ++i) {
                let x = line[i][0] + img.random(-img.ratio(50), img.ratio(50));
                let y = line[i][1] + img.random(-img.ratio(50), img.ratio(50));
                new_line.push([x, y]);
                if (Math.random() > 0.93) {
                    break;
                }
            }
            let line_width = img.int(img.remap(steps, 0, max_step, 0.1, 6));
            curves.push([new_line, line_width]);
            let color = img.remap(steps, 0, max_step, 0, 255);
            colors.push(color);
        }
        i = break_i + img.int(img.random(1, 4));
    }
    for (let i = 0; i < curves.length; ++i) {
        if (curves[i][0].length > 1) {
            img.curve(curves[i][0]);
            img.stroke(curves[i][1], colors[i], colors[i] * 0.8, 0, 0.6);
        }
    }
}

function background() {
    let step = img.ratio(5);
    for (let x0 = -step; x0 <= img.width + step; x0 += step) {
        for (let y0 = -step; y0 <= img.height + step; y0 += step) {
            x0 += img.random(-step, step);
            y0 += img.random(-step, step);
            let blurs_num = 5;
            while (blurs_num--) {
                let blur = [];
                let points = img.int(img.random(20, 30));
                let radius = step * 1.25;
                for (let angle = 0; angle <= Math.PI * 2; angle += Math.PI * 2 / points) {
                    let x = Math.cos(angle) * radius + x0 + img.random(-radius / 3, radius / 3);
                    let y = Math.sin(angle) * radius + y0 + img.random(-radius / 3, radius / 3);
                    blur.push([x, y]);
                }
                img.curve(blur);
                let color = img.int(img.random(100, 255));
                img.fill(color * 0.5, color * 0.3, color, 0.01);
            }
        }
    }
}

draw();