canvas = document.getElementById('editor');

size = 700;
img = new ArtShip(1 * size, 2 * size, canvas);
context = img.context;
img.background(0, 0, 0);
img.mouse_update();

let dens = img.ratio(20);
let lines_num = 200;

let strokes = []
let current_stroke = []
let curve_type = "one_back"
let background = "none";
let red = img.random(0, 255);
let green = img.random(0, 255);
let blue = img.random(0, 255);
let color_random = 100;

function draw() {
    img.background(0, 0, 0);

    if (background === "liner"){
        liner_background();
    }

    strokes.push(current_stroke.slice());
    for (let stroke of strokes) {
        if (stroke === []) continue;
        for (let i = 0; i < lines_num; i++) {
            let to_draw_stroke;
            if (curve_type === "usual") {
                to_draw_stroke = stroke;
                if (to_draw_stroke.length === 1) {
                    to_draw_stroke.push(to_draw_stroke[0]);
                }
            }
            else if (curve_type === "one_back") {
                to_draw_stroke = get_one_back_curve(stroke);
            }
            to_draw_stroke = get_noisy_stroke(to_draw_stroke);
            if (to_draw_stroke[0] === undefined) {
                break;
            }
            img.curve(to_draw_stroke);
            img.stroke(1,
                red + img.random(-color_random, color_random),
                green + img.random(-color_random, color_random),
                blue + img.random(-color_random, color_random),
                0.4);
        }
    }
    strokes.splice(strokes.length - 1, 1);
}

function get_one_back_curve(stroke) {
    let new_stroke = [stroke[0]].slice();
    for (let i = 1; i < stroke.length - 1; i++) {
        new_stroke.push(stroke[i].slice());
        new_stroke.push(stroke[i - 1].slice());
    }
    new_stroke.push(stroke[stroke.length - 1]);
    return new_stroke;
}

function get_noisy_stroke(stroke) {
    let noisy_stroke = []
    for (let j = 0; j < stroke.length; j++) {
        if (stroke[0] === undefined) {
            break;
        }
        if (j % 2 === 0) {
            x = stroke[j][0] + img.random(-dens, dens);
            y = stroke[j][1] + img.random(-dens, dens);
        }
        else {
            let dens_ratio = img.random(0.5, 4);
            x = stroke[j][0] + img.random(-dens / dens_ratio, dens / dens_ratio);
            y = stroke[j][1] + img.random(-dens / dens_ratio, dens / dens_ratio);
        }
        noisy_stroke.push([x, y]);
    }
    return noisy_stroke;
}

function liner_background() {
    let step_y = img.height / 200;
    let step_x = img.width / 10;
    let line_dens = step_y;
    for (let y = 0; y <= img.height; y += step_y) {
        let line = [];
        for (let x = 0; x <= img.width; x += step_x) {
            line.push([x, y + img.random(-line_dens, line_dens)]);
        }
        img.print(line);
        img.curve(line);
        img.stroke(1,
            255 - img.random(0, 50),
            255 - img.random(0, 50),
            255 - img.random(0, 50),
            0.2);
    }
}


// Buttons functions
function change_color() {
    red = img.random(50, 255);
    green = img.random(0, 200);
    blue = img.random(100, 255);
    draw();
}

function shake_strokes() {
    strokes.push(current_stroke);
    for (let i = 0; i < strokes.length; i++) {
        for (let j = 0; j < strokes[i].length; j++) {
            strokes[i][j][0] += img.random(-dens, dens);
            strokes[i][j][1] += img.random(-dens, dens);
        }
    }
    current_stroke = strokes.splice(strokes.length - 1, 1)[0];
    draw();
}

function add_stroke() {
    strokes.push(current_stroke);
    current_stroke = [];
}

function delete_current_stroke() {
    current_stroke = [];
    if (strokes.length > 0) {
        current_stroke = strokes[strokes.length - 1];
        strokes.splice(strokes.length - 1, 1);
    }
    draw();
}

function delete_last_point_of_current_stroke() {
    if (current_stroke.length > 0) {
        current_stroke.splice(current_stroke.length - 1, 1);
        draw();
    }
    else {
        delete_current_stroke();
        if (strokes.length > 0)
            delete_last_point_of_current_stroke();
    }
}

function clear() {
    strokes = [];
    current_stroke = [];
    draw();
}

function save() {
    img.save_image();
}


// Buttons processing
canvas.addEventListener('mousedown', function (event) {
    document.querySelector('#change_color').addEventListener("click", change_color);
    document.querySelector('#shake_strokes').addEventListener("click", shake_strokes);
    document.querySelector('#add_stroke').addEventListener("click", add_stroke);
    document.querySelector('#delete_current_stroke').addEventListener("click", delete_current_stroke);
    document.querySelector('#delete_last_point_of_current_stroke').addEventListener("click", delete_last_point_of_current_stroke);
    document.querySelector('#clear').addEventListener("click", clear);
    document.querySelector('#save').addEventListener("click", save);
})

// Curve type
canvas.addEventListener('mousedown', function (event) {
    let inputs = document.querySelectorAll('[name=curve]');
    for (const input of inputs) {
        input.addEventListener("change", function(evt) {
            switch (evt.target.value) {
                case "one_back":
                    curve_type = "one_back"
                    return draw();
                case "usual":
                    curve_type = "usual"
                    return draw();
                default:
                    curve_type = "one_back"
                    return draw();
            }
        });
    }
})

// Curve type
canvas.addEventListener('mousedown', function (event) {
    let inputs = document.querySelectorAll('[name=background]');
    for (const input of inputs) {
        input.addEventListener("change", function(evt) {
            switch (evt.target.value) {
                case "liner":
                    background = "liner"
                    return draw();
                case "none":
                    background = "none"
                    return draw();
            }
        });
    }
})

canvas.addEventListener('mousedown', function (event) {
    current_stroke.push([img.mouse.x, img.mouse.y]);
    draw();
})
