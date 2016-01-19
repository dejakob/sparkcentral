const GAME_BACKGROUND_LAYOUT = {
    COLORS: {
        GRASS: '#B0EE6C'
    }
};

/**
 * GameBackground class
 */
class GameBackground
{
    /**
     * @param {HTMLCanvasElement} canvasElement
     * @param {CanvasRenderingContext2D} context
     */
    constructor (canvasElement, context)
    {
        this._canvas = canvasElement;
        this._context = context;
    }

    /**
     * Paint the background
     */
    paint ()
    {
        const height = this._canvas.height;
        const width = this._canvas.width;

        this._context.beginPath();
        this._context.fillStyle = GAME_BACKGROUND_LAYOUT.COLORS.GRASS;
        this._context.rect(0, height - 50, width, height);
        this._context.fill();
        this._context.closePath();
    }
}