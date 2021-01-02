let another_dots = function (p) {
    p.setup = function () {
        let size = 500;
        let canvas = p.createCanvas(size, size);
        p.background(120, 0, 255, 50);
    }

    p.draw = function () {
        let spacing = p.width / 10;
        for (let i = 1; i < p.width  / spacing; i++) {
            for (let j = 1; j < p.width  / spacing; j++) {
                p.yellow = [p.random(230, 255), p.random(180, 230), 0];
                p.blue = [p.random(0, 150), 0, p.random(200, 255)];
                if (p.random() >= 0.5)
                    p.fill(p.blue[0], p.blue[1], p.blue[2]);
                else
                    p.fill(p.yellow[0], p.yellow[1], p.yellow[2]);
                p.ellipse(i * spacing, j * spacing, 25, 25);
            }
        }
        p.noLoop();
    }

    p.mousePressed = function() {
        p.loop()
    }
}

new p5(another_dots, 'p55_js');
