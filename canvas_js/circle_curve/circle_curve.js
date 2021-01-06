canvas = document.getElementById('circle_curve');

size = 700;
cc = new ArtShip(size, 2 * size, canvas);
cc.mouse_update();
context = cc.context;
cc.background(0, 0, 0);

dots = [];
step = cc.ratio(10);
radius = cc.ratio(3);
dens = cc.ratio(100);

for (let angle = 0; angle <= 2 * Math.PI ; angle += 2 * Math.PI / step) {
    let x = radius * (Math.cos(angle) + 1) - radius + cc.width / 2;
    let y = radius * (Math.sin(angle) + 1) - radius + cc.height / 2;
    dots.push([x, y]);
}

function draw_circle_curve() {
    cc.curve(dots);
    cc.stroke(1, 255, 255, 255, 0.1);
    for (let i = 0; i < dots.length - 1; i++) {
        dots[i][0] += cc.random(-dens , dens);
        dots[i][1] += cc.random(-dens, dens);
    }
    dots[dots.length - 1][0] = dots[0][0];
    dots[dots.length - 1][1] = dots[0][1];
    requestAnimationFrame(draw_circle_curve);
}

draw_circle_curve();