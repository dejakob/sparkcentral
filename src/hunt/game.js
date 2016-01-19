/**
 * HuntGame class
 */
class HuntGame
{
    /**
     * Constructor HuntGame
     * @param {Number} height
     * @param {Number} width
     * @param {Object} [style]
     */
    constructor (height, width, style = {})
    {
        this._height = height;
        this._width = width;
        this._style = style;
        this._canvas = null;
        this._context = null;
        this._profiles = [];

        this._interval = null;
        this._currentTick = 0;
    }

    /**
     * Initialize the game
     * @param rootElement
     */
    init (rootElement)
    {
        const gameVM = this;

        this._canvas = addCanvasToDOM();
        this._context = this._canvas.getContext('2d');
        this._background = new GameBackground(this._canvas, this._context);

        this.repaint();

        /**
         * Add a new canvas element to the DOM
         * @returns {HTMLCanvasElement}
         */
        function addCanvasToDOM ()
        {
            const canvas = document.createElement('canvas');

            canvas.height = gameVM._height;
            canvas.width = gameVM._width;
            DomHelper.attachStyle(canvas, gameVM._style);

            rootElement.appendChild(canvas);

            return canvas;
        }
    }

    /**
     * Clean and paint frame
     */
    repaint ()
    {
        this._context.clearRect(0, 0, this._width, this._height);
        this._background.paint();

        this._profiles.forEach(paintProfile);

        /**
         * Paint a profile/target on the canvas
         * @param {GameProfile} profile
         */
        function paintProfile (profile)
        {
            profile.paint();
        }
    }

    /**
     * Start the game
     */
    start ()
    {
        const TICK = Math.round(1000 / GAME_FPS);

        this._interval = setInterval(this._onTick, TICK);
    }

    /**
     * Stop the game
     */
    stop ()
    {
        clearInterval(this._interval);
    }

    /**
     * Tick event for each interval tick
     * @private
     */
    _onTick ()
    {
        

        this._currentTick++;
    }
}