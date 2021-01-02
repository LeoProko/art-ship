canvas = document.getElementById('curves');
context = canvas.getContext('2d');
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
canvas.width = 500;
canvas.height = 500;



context.moveTo(100, 100);
context.lineTo(600, 500);
context.stroke();

context.moveTo(100, 100);
context.bezierCurveTo(
    150, 150,
    150, 400,
    300, 300
);
context.stroke();


context.beginPath();
context.ellipse(150, 150, 100, 50, 1, 0, 7);
context.stroke();

context.beginPath();
context.rect(100, 100, 100, 200);
context.stroke();
