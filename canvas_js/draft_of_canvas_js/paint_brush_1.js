canvas = document.getElementById('paint_brush_1');
ctx = canvas.getContext('2d');
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

canvas.addEventListener('mousemove', function(event) {
    //mouse.x = event.x;
    //mouse.y = event.y;
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
    //console.log(mouse.x, mouse.y);
})


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
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
    }
}

function branchOut() {
    if (drawing) {
        const centerX = mouse.x;
        const centerY = mouse.y;
        for (let i = 0; i < 2; i++) {
            const root = new Root(mouse.x, mouse.y, 'red', centerX, centerY);
            root.draw();
        }
    }
}


canvas.addEventListener('mousemove', function() {
    ctx.fillStyle = 'rgba(240, 240, 240, 0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    branchOut();
})



canvas.addEventListener('mouseup', function() {
    drawing = false;
})

canvas.addEventListener('mousedown', function() {
    drawing = true;
})
