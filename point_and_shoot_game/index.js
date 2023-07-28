const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const Collisioncanvas = document.getElementById('collisionCanvas');
const Collisionctx = Collisioncanvas.getContext('2d');
Collisioncanvas.width = window.innerWidth;
Collisioncanvas.height = window.innerHeight;
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
            this.randomColors = [Math.floor(Math.random() * 255),  Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
            this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] +')';
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
        Collisionctx.fillStyle = this.color;
        Collisionctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.frame * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}

let explosions = [];
class Explosion{
    constructor(x,y,size)
    {
        this.x = x;
        this.y = y;
        this.size = size;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.audio = new Audio();
        this.audio.src = 'magical_1.ogg';
        this.frame = 0;
        this.timer = 0;
    }
    update()
    {
        if(this.frame === 0) this.audio.play();
        this.timer++;
        if(this.timer % 10 === 0)
        {
            if(this.frame < 5)
                this.frame++;
            else
                this.markedForDeletion = true;
        }
    }
    draw()
    {
        ctx.drawImage(this.image,this.spriteWidth * this.frame,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}

function drawScore()
{
    ctx.fillStyle = 'black';
    ctx.fillText('Your Score:'+ score,100,110);
    ctx.fillStyle = 'white';
    ctx.fillText('Your Score:'+ score,103,113);
}

window.addEventListener('click', (e) =>
{
    const detectedPixel = Collisionctx.getImageData(e.x,e.y,1,1);
    const PixelColor = detectedPixel.data;
    ravens.forEach(object =>
        {
            if(object.randomColors[0] === PixelColor[0] && object.randomColors[1] === PixelColor[1] && object.randomColors[2] === PixelColor[2])
            {
                object.markedForDeletion = true;
                score++;
                explosions.push(new Explosion(object.x,object.y,object.width));
            }
        })
}       
)

function animate(timestamp)
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    Collisionctx.clearRect(0,0,canvas.width,canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltaTime;
    if(timeToNextRaven > ravenInterval)
    {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort(function(a,b)
        {
            return a.width - b.width;
        })
    }
    [...ravens, ...explosions].forEach(object => object.update());
    [...ravens, ...explosions].forEach(object => object.draw());
    ravens = ravens.filter(raven => !raven.markedForDeletion);
    explosions = explosions.filter(explosion => !explosion.markedForDeletion);
    gameSpeed++;
    drawScore();
    requestAnimationFrame(animate);
}

animate(0);