export class UserInterface
{
    constructor(game)
    {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
    }
    draw(context)
    {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        context.fillText('Score:' + this.game.score, 20, 50);
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.fillText('Time:' + this.game.time, 20, 80);
        if(this.game.gameOver)
        {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if(this.game.score > 10)
            {
                context.fillText('Congratulations!!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('You won the game!!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
            else{
                context.fillText('My Bad!! You lost', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Better luck next time', this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
        }
        context.restore();
    }
}