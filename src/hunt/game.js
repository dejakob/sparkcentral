/**
 * Game class
 */
class Game
{
    /**
     * Constructor Game
     * @param {Number} height
     * @param {Number} width
     * @param {Object} [options]
     *  @param {Function} [options.onWin]
     *  @param {Function} [options.onFail]
     * @param {Object} [style]
     */
    constructor (height, width, options = {}, style = {})
    {
        this._height = height;
        this._width = width;
        this._top = parseInt(style.top || 0, 10);
        this._left = parseInt(style.left || 0, 10);
        this._style = style;
        this._canvas = null;
        this._context = null;
        this._profiles = [];

        this._options = options;
        this._score = 0;
        this._interval = null;
        this._currentTick = 0;
        this._timesToAddProfile = Object.keys(GAME_LEVEL).map(time => Number(time));
        this._lastProfileTick = this._timesToAddProfile[this._timesToAddProfile.length - 1];
    }

    /**
     * Initialize the game
     * @param {HTMLElement} rootElement
     */
    init (rootElement)
    {
        if (!(rootElement instanceof HTMLElement)) {
            throw new Error('a root element needs to be defined to initialize the game');
        }

        const gameVM = this;

        this._canvas = addCanvasToDOM();
        this._scoreBoard = addScoreBoardToDOM.call(this);
        this._context = this._canvas.getContext('2d');

        this._canvas.addEventListener('click', this._onClick.bind(this));
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

        function addScoreBoardToDOM ()
        {
            const div = document.createElement('div');
            const style = GAME_LAYOUT.SCORE_BOARD;

            style.top = `${this._top + 10}px`;
            style.right = `${this._left + 5}px`;

            DomHelper.attachStyle(div, style);
            div.innerHTML = this._score;
            rootElement.appendChild(div);

            return div;
        }
    }

    /**
     * Clean and paint frame
     */
    repaint ()
    {
        const gameVM = this;

        this._context.clearRect(0, 0, this._width, this._height);
        this._profiles.forEach(paintProfile);

        /**
         * Paint a profile/target on the canvas
         * @param {GameProfile} profile
         */
        function paintProfile (profile)
        {
            profile.paint(gameVM._context);
        }
    }

    /**
     * Start the game
     */
    start ()
    {
        const TICK = Math.round(1000 / GAME_FPS);
        this._interval = setInterval(this._onTick.bind(this), TICK);
    }

    /**
     * Stop the game
     * @param {Boolean} [reason]
     */
    stop (reason = GAME_STOP_REASON.LOOSE)
    {
        clearInterval(this._interval);
        this._canvas.removeEventListener('click', this._onClick.bind(this));

        if (reason === GAME_STOP_REASON.LOOSE && typeof this._options.onFail === 'function') {
            this._options.onFail.call(this);
        }
        else if (reason === GAME_STOP_REASON.WIN && typeof this._options.onWin === 'function') {
            this._options.onWin.call(this);
        }
    }

    /**
     * Destroy the game
     */
    destroy ()
    {
        this._canvas.parentNode.removeChild(this._canvas);
        this._scoreBoard.parentNode.removeChild(this._scoreBoard);
        delete this._context;
    }

    /**
     * Tick event for each interval tick
     * @private
     */
    _onTick ()
    {
        const profileToAdd = GAME_LEVEL[this._currentTick];

        if (this._timesToAddProfile.indexOf(this._currentTick) > -1) {
            addNewProfile.call(this);
        }

        if (this._profiles.length > 0) {
            this._profiles.forEach(moveProfile.bind(this));
            this.repaint();
        }
        else if (this._currentTick > this._lastProfileTick) {
            this.stop();
        }

        this._currentTick++;

        /**
         * Add a new profile to the list of profiles
         */
        function addNewProfile ()
        {
            if (profileToAdd.direction === GAME_DIRECTION.LTR) {
                profileToAdd.x = - profileToAdd.width;
            }
            else {
                profileToAdd.x = this._width + profileToAdd.width;
            }

            profileToAdd.y = Math.round(Math.random() * this._height * 0.8);
            this._profiles.push(profileToAdd);
        }

        /**
         * Move the profile one step in the right direction
         * @param {GameProfile} profile
         */
        function moveProfile (profile)
        {
            if (profile.direction === GAME_DIRECTION.LTR) {
                profile.x += profile.speed;

                if (profile.x > this._width + profile.width) {
                    this._profiles.splice(this._profiles.indexOf(profile), 1);
                }
            }
            else {
                profile.x -= profile.speed;

                if (profile.x < - profile.width) {
                    this._profiles.splice(this._profiles.indexOf(profile), 1);
                }
            }
        }
    }

    /**
     * When the canvas gets clicked
     * @param {MouseEvent} eventData
     * @private
     */
    _onClick (eventData)
    {
        let hitted = false;

        this._profiles.forEach(testHit.bind(this));

        if (hitted) {
            this.repaint();

            if (this._score >= GAME_SCORE_NEEDED_TO_WIN) {
                this.stop(GAME_STOP_REASON.WIN);
            }
        }

        function testHit (profile)
        {
            if (
                hitted === false &&
                profile.hitTest(- this._left + eventData.clientX, - this._top + eventData.clientY)
            ) {
                hitted = true;
                this._score += profile.speed * 10;
                this._updateScore();
                this._profiles.splice(this._profiles.indexOf(profile), 1);
            }
        }
    }

    /**
     * Notify the DOM that the score changed
     * @private
     */
    _updateScore ()
    {
        this._scoreBoard.innerHTML = this._score;
    }
}