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
        
    }
}