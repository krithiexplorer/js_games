const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 700;
const CANVAS_HEIGHT = canvas.height = 700;
const canvasPosition = canvas.getBoundingClientRect();
const explosions = [];

class Explosion
{
    constructor(x,y)
    {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.x = x - this.width/2;
        this.y = y - this.height/2;
        this.image = new Image();
        this.image.src = 'boom.png';
        this.frame = 0;
        this.timer = 0;
    }
    update()
    {
        this.timer++;
        if(this.timer % 10 === 0)
        {
            if(this.frame < 5)
                this.frame++;
            else
                this.frame = 0;
        }
    }
    draw()
    {
        ctx.drawImage(this.image,this.spriteWidth * this.frame,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}

window.addEventListener('click', (e) => {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX,positionY));
})

function animate()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    explosions.forEach(explosion => {
        explosion.update();
        explosion.draw();
    })
    requestAnimationFrame(animate);
}

animate();