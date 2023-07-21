const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 700;
const CANVAS_HEIGHT = canvas.height = 700;
const explosionObjects = [];
const noOfexplosions = 100;

class Explosion
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;
    }
    update()
    {
        this.frame++;
    }
    draw()
    {
        ctx.drawImage(this.image,this.spriteWidth * this.frame,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}

for(let i=0;i<noOfexplosions;i++)
{
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    explosionObjects.push(new Explosion(x,y));
}

function animate()
{
    explosionObjects.forEach( explosion =>
        {
            explosion.update();
            explosion.draw();
        }
    )
    requestAnimationFrame(animate);
}

animate();