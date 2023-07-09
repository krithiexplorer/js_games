const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
let gameSpeed = 15;
let x = 0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'images/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'images/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'images/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'images/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'images/layer-5.png';

function animate()
{
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.drawImage(backgroundLayer4,x,0);
    x--;
    requestAnimationFrame(animate);
}
animate();