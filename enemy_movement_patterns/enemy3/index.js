/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 800;
const noOfEnemies = 100;
const enemyObjects = [];
let gameFrame = 0;

class Enemy{
    constructor()
    {
        this.image = new Image();
        this.image.src = 'enemy3.png';
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.speed = Math.random() * 4 + 1;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = Math.random() * 4;
        this.angleSpeed = Math.random() * 1.5 + 0.5;
        this.curve = Math.random() * 200;
    }
    update()
    {
        this.x = this.curve * Math.cos(this.angle * Math.PI/180) + canvas.width/2 - this.width;
        this.y = this.curve * Math.sin(this.angle * Math.PI/180) + canvas.height/2 - this.height;
        this.angle += this.angleSpeed;
        if(gameFrame % this.flapSpeed === 0)
        {
            if(this.frame < 5)
                this.frame++;
            else 
                this.frame=0;    
        }
    }
    draw()
    {
        // ctx.strokeRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.frame * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height)
    }
}
for(let i=0;i<noOfEnemies;i++)
{
    enemyObjects.push(new Enemy());
}

function animate()
{
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    enemyObjects.forEach(enemy => {
        enemy.update();
        enemy.draw();
    }
    )
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();