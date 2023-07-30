document.addEventListener('DOMContentLoaded',function()
{
const canvas=document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

class Game
{
    constructor(ctx,width,height)  
    {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.enemies = [];
        this.enemyInterval = 20;
        this.enemyTimer = 0;
    }
    update(deltaTime)
    {
        if(this.enemyTimer > this.enemyInterval)
        {
            this.#addNewEnemy();
            this.enemyTimer = 0;
        }
        else
        {
            this.enemyTimer += deltaTime;
        }
        this.enemies.forEach(object => object.update());
    }
    draw()
    {
        this.enemies.forEach(object => object.draw());
    }
    #addNewEnemy()
    {
        this.enemies.push(new Enemy(this));
    }
}

class Enemy 
{
    constructor(game)
    {
        this.game = game;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height;
        this.width = 50;
        this.height = 50;
    }
    update()
    {
        this.x--;
    }
    draw()
    {
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}
const game = new Game(ctx, canvas.width, canvas.height);
let lastTime = 1;
function animate(timeStamp)
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.update(deltaTime);
    game.draw();
    requestAnimationFrame(animate);
}
animate(0);
})