let canvas = document.getElementById('canvas_1');
let ctx = canvas.getContext('2d');
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
canvas.width = 500;
canvas.height = 500;

const edge = 70;
let drawing = false;

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', function(event) {
    //mouse.x = event.x;
    //mouse.y = event.y;
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
    //console.log(mouse.x, mouse.y);
})


var size = 40;

//var draw = function() {
    //ctx.beginPath();
    //ctx.arc(canvas.width / 2, canvas.height / 2, size,  0, 7);
    //ctx.stroke();
    //window.requestAnimationFrame(draw);
//}

//draw();


ctx.moveTo(100, 100);
ctx.lineTo(600, 500);
ctx.stroke();

ctx.moveTo(100, 100);
ctx.bezierCurveTo(
    150, 150,
    150, 400,
    300, 300
);
ctx.stroke();


ctx.beginPath();
ctx.ellipse(150, 150, 100, 50, 1, 0, 7);
ctx.stroke();

ctx.beginPath();
ctx.rect(100, 100, 100, 200);
ctx.stroke();



class Root {
    constructor(x, y, color, centerX, centerY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;
        this.centerX = centerX;
        this.centerY = centerY;
    }
     draw() {
         this.speedX += (Math.random() - 0.5) / 2;
         this.speedY += (Math.random() - 0.5) / 2;
         this.x += this.speedX;
         this.y += this.speedY;

         const distanceX = this.x - this.centerX;
         const distanceY = this.y - this.centerY;
         const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
         const radius = (-distance / edge + 1) * edge / 10;

         if (radius > 0) {
             requestAnimationFrame(this.draw.bind(this));
             ctx.beginPath();
             ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
             ctx.fillStyle = this.color;
             ctx.fill();
             ctx.strokeStyle = 'black';
             ctx.stroke();
         }
     }
}

function branchOut() {
    if (drawing) {
        const centerX = mouse.x;
        const centerY = mouse.y;
        for (let i = 0; i < 3; i++) {
            const root = new Root(mouse.x, mouse.y, 'red', centerX, centerY);
            root.draw();
        }
    }
}


//window.addEventListener('resize', function() {
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;
//})

window.addEventListener('mousemove', function() {
    //ctx.fillStyle = 'rgba(200, 200, 200, 0.03)';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    branchOut();
})



window.addEventListener('mouseup', function() {
    drawing = false;
})

window.addEventListener('mousedown', function() {
    drawing = true;
})




let sketch_1 = function (p) {
    p.setup = function () {
        let size = 500;
        let canvas = p.createCanvas(size, size);
        p.background(0, 0, 0, 50);
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

new p5(sketch_1, 'c2');






