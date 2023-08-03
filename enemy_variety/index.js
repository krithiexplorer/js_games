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
        this.enemyInterval = 500;
        this.enemyTimer = 0;
        this.enemyType = ['worm','ghost'];
    }
    update(deltaTime)
    {
        this.enemies = this.enemies.filter(object => !object.markForDeletion)
        if(this.enemyTimer > this.enemyInterval)
        {
            this.#addNewEnemy();
            this.enemyTimer = 0;
        }
        else
        {
            this.enemyTimer += deltaTime;
        }
        this.enemies.forEach(object => object.update(deltaTime));
    }
    draw()
    {
        this.enemies.forEach(object => object.draw(this.ctx));
    }
    #addNewEnemy()
    {
        const enemy = this.enemyType[Math.floor(Math.random() * this.enemyType.length)];
        if(enemy == 'worm') this.enemies.push(new Worm(this));
        if(enemy == 'ghost') this.enemies.push(new Ghost(this));
    }
}

class Enemy 
{
    constructor(game)
    {
        this.game = game;
        this.markForDeletion = false;
    }
    update()
    {
        this.x--;
        if(this.x < 0 - this.width) this.markForDeletion = true;
    }
    draw(ctx)
    {
        ctx.drawImage(this.image, 0,0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

class Worm extends Enemy{
    constructor(game)
    {
        super(game);
        this.spriteWidth = 229;
        this.spriteHeight = 171;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight/2;
        this.x = this.game.width;
        this.y = this.game.height - this.height;
        this.image = new Image;
        this.image.src = 'enemy_worm.png';
    }
}

class Ghost extends Enemy{
    constructor(game)
    {
        super(game);
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.x = this.game.width;
        this.y = Math.random() * (this.game.height * 0.8);
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.image = new Image;
        this.image.src = 'enemy_ghost.png';
        this.angle = 0;
        this.curve = Math.random() * 3;
    }
    update(deltaTime)
    {
        super.update(deltaTime);
        this.y += Math.sin(this.angle) * this.curve;
        this.angle += 0.04;
    }
    draw()
    {
        ctx.save();
        ctx.globalAlpha = 0.7;
        super.draw(ctx);
        ctx.restore();
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