canvas = document.getElementById('spliner');
let size = 700;
let img = new ArtShip(size, 2 * size, canvas);
let context = img.context;

function draw() {
    img.background(0, 0, 0);
    for (let y = 0; y <= img.height; y += img.ratio(img.random(4, 30))) {
        let line = [];
        for (let x = img.ratio(img.random(2, 20)); x <= img.width - img.ratio(img.random(2, 20)); x += img.ratio(img.random(4, 100))) {
            line.push([x, y + img.random(-img.ratio(10), img.ratio(10))]);
        }
        multi_curve(line);
    }
}

function multi_curve(line) {
    steps = img.int(img.random(3, 20));
    while (steps--) {
        let new_line = [];
        for (let i = 0; i < line.length; ++i) {
            let x = line[i][0] + img.random(-img.ratio(100), img.ratio(50));
            let y = line[i][1] + img.random(-img.ratio(100), img.ratio(100));
            new_line.push([x, y]);
            if (Math.random() > 0.9 && new_line.length > 1) {
                img.print(new_line);
                img.curve(new_line);
                img.stroke(1, 255, 255, 255, 0.7);
                new_line = [];
                ++i;
            }
        }
        if (new_line.length > 1) {
            img.curve(new_line);
            img.stroke(5, 255, 255, 255, 0.7);
        }
    }
}

draw();