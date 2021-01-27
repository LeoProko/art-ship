let canvas = document.getElementById('editor');
let size = 700;
let img = new ArtShip(4 * size, 3 * size, canvas);
let brush = new LeoBrush(img);
let context = img.context;
img.mouse_update();

let strokes = [];
let curve_type = "one_back"
let background = "black";
let red = img.random(100, 255);
let green = img.random(100, 255);
let blue = img.random(100, 255);
let current_stroke = [[], "one_back", [red, green, blue]];

function draw() {
    if (background === "black"){
        img.background(0, 0, 0);
    }
    else if (background === "white"){
        img.background(255, 255, 255);
    }
    else if (background === "liner"){
        liner_background();
    }
    else if (background === "squared"){
        squared_background();
    }
    strokes.push(current_stroke.slice());
    for (let i = 0; i < strokes.length; ++i) {
        if (strokes[i] === undefined || strokes[i][0] === undefined || strokes[i][0] === [] || strokes[i][0].length === 0) continue;
        strokes[strokes.length - 1][1] = curve_type;
        current_stroke[1] = curve_type;
        if (strokes[i][1] === "usual") {
            brush.brush(
                strokes[i][0],
                strokes[i][2][0],
                strokes[i][2][1],
                strokes[i][2][2],
            );
        }
        else if (strokes[i][1] === "one_back") {
            brush.one_back(
                strokes[i][0],
                strokes[i][2][0],
                strokes[i][2][1],
                strokes[i][2][2],
            );

        }
        else if (strokes[i][1] === "calligraphy") {
            brush.calligraphy(
                strokes[i][0],
                strokes[i][2][0],
                strokes[i][2][1],
                strokes[i][2][2],
            );
        }
        else if (strokes[i][1] === "pastel") {
            brush.pastel(
                strokes[i][0],
                strokes[i][2][0],
                strokes[i][2][1],
                strokes[i][2][2],
            );
        }
    }
    strokes.splice(strokes.length - 1, 1);
}

function liner_background() {
    img.background(0, 0, 0);
    let step_y = img.height / 200;
    let step_x = img.width / 10;
    let line_dens = step_y;
    for (let y = 0; y <= img.height; y += step_y) {
        let line = [];
        for (let x = 0; x <= img.width; x += step_x) {
            line.push([x, y + img.random(-line_dens, line_dens)]);
        }
        img.curve(line);
        img.stroke(1,
            255 - img.random(0, 50),
            255 - img.random(0, 50),
            255 - img.random(0, 50),
            0.2);
    }
}

function squared_background() {
    img.background(0, 0, 0);
    let square_step = img.ratio(20);
    let square_dens = square_step * 1
    for (let x = 0; x <= img.width; x += square_step) {
        for (let y = 0; y <= img.height; y += square_step) {
            img.rect(x, y, square_step + img.random(-square_dens, square_dens), square_step + img.random(-square_dens, square_dens));
            let color_dens = 50;
            let red = 200 + img.random(-color_dens, color_dens);
            let green = 50 + img.random(-color_dens, color_dens);
            let blue = 150 + img.random(-color_dens, color_dens);
            img.fill(red, green, blue, 0.6);
        }
    }
}

// Buttons functions
function change_color() {
    red = img.random(100, 255);
    green = img.random(100, 255);
    blue = img.random(100, 255);
    current_stroke[2] = [red, green, blue];
    draw();
}

function shake_strokes() {
    let deviation = img.ratio(20);
    strokes.push(current_stroke);
    for (let i = 0; i < strokes.length; i++) {
        for (let j = 0; j < strokes[i].length; j++) {
            strokes[i][0][j][0] += img.random(-deviation, deviation);
            strokes[i][0][j][1] += img.random(-deviation, deviation);
        }
    }
    current_stroke = strokes.splice(strokes.length - 1, 1)[0];
    draw();
}

function add_stroke() {
    strokes.push(current_stroke);
    current_stroke = [[], "one_back", [red, green, blue]];
}

function delete_current_stroke() {
    current_stroke = [[], "one_back", [red, green, blue]];
    if (strokes.length > 0) {
        current_stroke = strokes[strokes.length - 1];
        strokes.splice(strokes.length - 1, 1);
    }
    draw();
}

function delete_last_point_of_current_stroke() {
    if (current_stroke[0].length > 0) {
        current_stroke[0].splice(current_stroke[0].length - 1, 1);
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
    current_stroke = [[], "one_back", [red, green, blue]];
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
                case "calligraphy":
                    curve_type = "calligraphy"
                    return draw();
                case "pastel":
                    curve_type = "pastel"
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
                case "squared":
                    background = "squared"
                    return draw();
                case "black":
                    background = "black"
                    return draw();
                case "white":
                    background = "white"
                    return draw();
            }
        });
    }
})

canvas.addEventListener('mousedown', function (event) {
    current_stroke[0].push([img.mouse.x, img.mouse.y]);
    draw();
})
