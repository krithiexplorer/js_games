/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 800;
const noOfEnemies = 100;
const enemyObjects = [];

class Enemy{
    constructor()
    {
        this.x = Math.random() * CANVAS_WIDTH;
        this.y = Math.random() * CANVAS_HEIGHT;
        this.width = 100;
        this.height = 100;
        this.speed = Math.random() * 4 - 2;
    }
    update()
    {
        this.x += this.speed;
        this.y += this.speed;
    }
    draw()
    {
        ctx.strokeRect(this.x,this.y,this.width,this.height);
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
    requestAnimationFrame(animate);
}
animate();