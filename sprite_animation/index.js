const canvas = document.getElementById("canvas-x");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 400;
const CANVAS_HEIGHT = canvas.height = 400;

const spriteImage = new Image();
spriteImage.src = 'shadow_dog.png';
let spriteWidth = 575;
let spriteHeight = 523;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrame = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name:'idle',
        frames : 7
    },
    {
        name:'jump',
        frames: 7
    },
    {
        name:'down',
        frames:7
    }
]
animationStates.forEach((state, index) => {
    let frames = {
        loc : []
    }   
    
})
function animate()
{
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrame)%6;
    frameX = spriteWidth * position;
    ctx.drawImage(spriteImage,frameX,frameY * spriteHeight,spriteWidth,spriteHeight,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();