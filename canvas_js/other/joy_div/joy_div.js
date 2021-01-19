canvas = document.getElementById('joy_div');
context = canvas.getContext('2d');

size = 700;
canvas.width = 2 * size;
canvas.height = size;
context.lineWidth = 2;

step = 10;
lines = [];

for (let i = step; i <= size - step; i += step) {
    line = [];

    for(let j = step + Math.floor(Math.random() * step * 2); j <= 2 * size - step; j += step + Math.floor(Math.random() * step * 2)) {
        distance_to_center = Math.abs(j - 2 * size / 2) / 3 + Math.abs(i - size / 2) ;
        variance = Math.max(size / 2 - size / 5 - distance_to_center, 0);
        random = Math.random() * variance / 2 * -1;

        point = {x: j, y: i + random * 0.8};
        line.push(point);
    }
    lines.push(line);
}


for (i = 2; i < lines.length - 1; i++) {
    context.beginPath();
    context.moveTo(lines[i][0].x, lines[i][0].y);
    
    for (j = 0; j < lines[i].length - 2; j++) {
        xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
        yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
        context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
    }

    context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, lines[i][j + 1].x, lines[i][j + 1].y);
    context.save();
    context.fillStyle = 'black';
    context.fill();
    context.restore();
    context.strokeStyle = 'white';
    context.stroke();
}
