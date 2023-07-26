const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let deltaTime = 0;
let lastTime = 0;
let timeToNextRaven = 0;
let ravenInterval = 500;
let gameSpeed = 0;
let score = 0;
ctx.font = '50px Cursive';

let ravens = [];
class Raven{
    constructor()
    {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.6 + 0.4;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
         this.x = canvas.width;
         this.y = Math.random() * (canvas.height - this.height);
         this.directionX = Math.random() * 5 + 3;
         this.directionY = Math.random() * 5 - 2.5;
         this.markedForDeletion = false;
         this.image = new Image();
         this.image.src = 'raven.png';
         this.frame = 0;
    }
    update()
    {
        this.x -= this.directionX; 
        this.y -= this.directionY;
        if(this.x < 0 - this.width) this.markedForDeletion = true;
        if(gameSpeed % 30)
        {
            if(this.frame < 5) this.frame++;
            else this.frame = 0;
        }
    }
    draw()
    {
        ctx.drawImage(this.image,this.frame * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}

function drawScore()
{
    ctx.fillStyle = 'black';
    ctx.fillText('Your Score:',score,100,110);
    ctx.fillStyle = 'white';
    ctx.fillText('Your Score:',score,103,113);
}

function animate(timestamp)
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltaTime;
    if(timeToNextRaven > ravenInterval)
    {
        ravens.push(new Raven());
        timeToNextRaven = 0;
    }
    [...ravens].forEach(raven => raven.update());
    [...ravens].forEach(raven => raven.draw());
    ravens = ravens.filter(raven => !raven.markedForDeletion);
    gameSpeed++;
    drawScore();
    requestAnimationFrame(animate);
}

animate(0);