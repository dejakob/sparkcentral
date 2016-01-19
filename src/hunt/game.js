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
    }

    /**
     * Initialize the game
     * @param rootElement
     */
    init (rootElement)
    {
        const canvas = document.createElement('canvas');

        canvas.height = this._height;
        canvas.width = this._width;
        DomHelper.attachStyle(canvas, this._style);

        rootElement.appendChild(canvas);

        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        this._background = new GameBackground(this._canvas, this._context);

        this._background.paint();
    }
}