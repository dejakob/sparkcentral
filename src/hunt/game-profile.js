/**
 * GameProfile class
 */
class GameProfile
{
    /**
     * Constructor for GameProfile
     */
    constructor (direction = GAME_DIRECTION.LTR, speed = GAME_DEFAULT_SPEED) {
        this.direction = direction;
        this.height = this.width = 50;
        this.x = 0;
        this.y = 0;
        this.speed = speed;
    }

    /**
     * Paint profile on the graphical context
     * @param {CanvasRenderingContext2D} context
     */
    paint (context) {
        const canvasContext = context;

        canvasContext.beginPath();
        canvasContext.strokeStyle = '#fff';
        canvasContext.drawImage(GAME_PROFILE_IMAGE, this.x, this.y, this.width, this.height);
        canvasContext.stroke();
        canvasContext.closePath();
    }

    /**
     * Test if x and y are within the profile
     * @param {Number} x
     * @param {Number} y
     */
    hitTest (x, y) {
        if (this.x < x && this.x + this.width > x) {
            if (this.y < y && this.y + this.height > y) {
                return true;
            }
        }

        return false;
    }
}
