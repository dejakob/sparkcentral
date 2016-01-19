/**
 * GameProfile class
 */
class GameProfile
{
    /**
     * Constructor for GameProfile
     */
    constructor (direction = GAME_DIRECTION.LTR)
    {
        this.direction = direction;
        this.height = this.width = 50;
        this.x = 0;
        this.y = 0;
    }

    /**
     * Paint profile on the graphical context
     * @param {CanvasRenderingContext2D} context
     */
    paint (context)
    {
        context.beginPath();
        context.strokeStyle = '#fff';
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
        context.closePath();
    }
}