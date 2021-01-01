let f_1 = function (p) {
    p.setup = function () {
        p.createCanvas(300, 300);
        p.background(255);
        p.noLoop();
    }

    p.draw = function () {
        p.ellipse(100, 100, 50);
    }
}
new p5(f_1, 'c1');

let f_2 = function (p) {
    p.setup = function () {
        p.createCanvas(300, 300);
        p.background(255);
        p.noLoop();
    }

    p.draw = function () {
        p.ellipse(200, 200, 50, 100);
    }
}
new p5(f_2, 'c2');
