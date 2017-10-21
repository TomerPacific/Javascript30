const canvas = document.querySelector('#draw');

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(event){
	//When mouse movements are not for drawing
	if(!isDrawing){
		return;
	}
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(event.offsetX, event.offsetY);
	ctx.stroke();
	lastX = event.offsetX;
	lastY = event.offsetY;
	hue = hue >= 360 ? 0 : ++hue;
	if(ctx.lineWidth >= 100 || ctx.lineWidth <= 5){
		direction = !direction;
	}
	if(direction) ctx.lineWidth++;
	else ctx.lineWidth--;
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (event) => {
	isDrawing = true;
	lastX = event.offsetX;
	lastY = event.offsetY;
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
