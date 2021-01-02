class ArtShip {
    constructor(height, weight, canvas) {
        this.height = height;
        this.width = weight;
        this.context = canvas.getContext('2d');
        this.canvas = canvas;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    fill(red = 0, green = 0, blue = 0, alpha = 1) {
        this.context.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
        this.context.fill();
    }

    stroke(red = 0, green = 0, blue = 0, size = 1, alpha = 1) {
        this.context.lineWidth = size;
        this.context.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
        this.context.stroke();
    }

    circle(x, y, radius) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        return this.context;
    }

    curve(points) {
        this.context.beginPath();
        this.context.moveTo(points[0][0], points[0][1]);
        let xc, yc;
        for (let i = 0; i < points.length - 1; i++) {
            xc = (points[i][0] + points[i + 1][0]) / 2;
            yc = (points[i][1] + points[i + 1][1]) / 2;
            this.context.quadraticCurveTo(points[i][0], points[i][1], xc, yc);
        }
        let i = points.length - 2;
        this.context.quadraticCurveTo(xc, yc, points[i + 1][0], points[i + 1][1]);
    }

    random(min_value, max_value) {
        return Math.random() * (max_value - min_value) + min_value;
    }

    background(red, green, blue, alpha = 1) {
        this.context.rect(0, 0, this.width, this.height);
        this.fill(red, green, blue, alpha);
    }
}
