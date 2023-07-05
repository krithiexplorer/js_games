const canvas = document.getElementById("canvas-x");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 400;
const CANVAS_HEIGHT = canvas.height = 400;

const spriteImage = new Image();
spriteImage.src = 'sprite.png';
let spriteWidth = 128;
let spriteHeight = 128;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrame = 5;
function animate()
{
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.drawImage(spriteImage,frameX * spriteWidth,frameY * spriteHeight,spriteWidth,spriteHeight,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    if(gameFrame % staggerFrame == 0)
    {
        if(frameX < 8)frameX++;
        else frameX=0;
    }
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();