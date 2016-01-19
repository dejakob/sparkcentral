/**
 * GameProfile class
 */
class GameProfile
{
    /**
     * Constructor for GameProfile
     */
    constructor ()
    {
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
        constext.beginPath();
        context.strokeStyle = '#fff';
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
        context.closePath();
    }
}