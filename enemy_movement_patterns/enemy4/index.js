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
        this.image.src = 'enemy4.png';
        this.spriteWidth = 213;
        this.spriteHeight = 212;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        //this.speed = Math.random() * 5 - 2.5;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.desX = Math.random() * (canvas.width - this.width);
        this.desY = Math.random() * (canvas.height - this.height);
        this.interval = Math.floor(Math.random() * 200 + 50);
    }
    update()
    {
        if(gameFrame % this.interval === 0)
        {
            this.desX = Math.random() * (canvas.width - this.width);
            this.desY = Math.random() * (canvas.height - this.height);
        }
        let dx = this.x - this.desX;
        let dy = this.y - this.desY;
        this.x -= dx/70;
        this.y -= dy/70;
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