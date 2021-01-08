canvas = document.getElementById('angle_grid');

size = 700;
ag = new ArtShip(size, 2 * size, canvas);
context = ag.context;
ag.background(0, 0, 0);

grid_step_x = ag.ratio(70);
grid_step_y = ag.ratio(50);
let angle_velocity = 200;

function return_grid() {
    let grid = [];
    let line;
    let angle_x = ag.random(0, 2 * Math.PI);
    for (let x = 0; x < ag.width; x += grid_step_x) {
        line = []
        let angle_y = ag.random(0, 2 * Math.PI);
        for (let y = 0; y < ag.height; y += grid_step_y) {
            context.translate(x + grid_step_x / 2, y + grid_step_y / 2);
            let angle = Math.PI * (2 + Math.sin(angle_x) + Math.sin(angle_y)) / 2;
            context.rotate(angle);
            context.translate(-x - grid_step_x / 2, -y - grid_step_y / 2);
            ag.line(x + grid_step_x / 2, y + grid_step_y / 2, x + grid_step_x / 4, y + grid_step_y / 4);
            ag.stroke(1, 255, 255, 255, 0.05);
            // ag.circle(x + grid_step / 2, y + grid_step / 2, grid_step / ag.ratio(30));
            // ag.fill(0, 0, 0, 0.5);
            context.translate(x + grid_step_x / 2, y + grid_step_y / 2);
            context.rotate(-angle);
            context.translate(-x - grid_step_x / 2, -y - grid_step_y / 2);
            // let color = ag.remap(angle_x + angle_y, -4 * Math.PI, 4 * Math.PI, 0, 255);
            // ag.rect(x + grid_step / 2, y + grid_step / 2, grid_step, grid_step);
            // ag.fill(color, color, color);
            line.push(ag.remap(angle, 0, 4 * Math.PI, 0, 2 * Math.PI));
            angle_y += ag.random(-Math.PI / angle_velocity, Math.PI / angle_velocity);
            if (angle_y > 2 * Math.PI) angle_y = 0;
            else if (angle_y < 0) angle_y = 2 * Math.PI;
        }
        grid.push(line);
        angle_x += ag.random(-Math.PI / angle_velocity, Math.PI / angle_velocity);
        if (angle_x > 2 * Math.PI) angle_x = 0;
        else if (angle_x < 0) angle_x = 2 * Math.PI;
    }
    return grid;
}


particles = ag.ratio(20);
density = ag.ratio(60);
angle_grid = return_grid();
let curve;


function draw_angle_grid() {
    for (let i = 0; i < particles; i++) {
        curve = [];
        let x = ag.int(ag.random(0, ag.width / grid_step_x));
        let y = ag.int(ag.random(0, ag.height / grid_step_y ));
        let prev_x = x;
        let prev_y = y;
        let angle;
        for (let j = 0; j < ag.width * 10; j++) {
            prev_x = x;
            prev_y = y;
            if (0 < x && x < ag.int(ag.width / grid_step_x) && 0 < y && y < ag.int(ag.height / grid_step_y)) {
                curve.push([x * grid_step_x * 2, y * grid_step_y]);
                angle = angle_grid[x][y];
                x += ag.int(Math.cos(angle) * density);
                y += ag.int(Math.sin(angle) * density);
            }
            else {
                if (curve.length > 0) {
                    ag.curve(curve);
                    ag.stroke(0.2, 255, 255, 255, 0.2);
                }
                break;
            }
        }
        if (curve.length > 0) {
            ag.curve(curve);
            ag.stroke(0.2, 255, 255, 255, 0.2);
        }
    }
    requestAnimationFrame(draw_angle_grid);
}

draw_angle_grid();
