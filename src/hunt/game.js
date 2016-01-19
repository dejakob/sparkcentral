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
        this._timesToAddProfile = Object.keys(GAME_LEVEL).map(time => Number(time));
        this._lastProfileTick = this._timesToAddProfile[this._timesToAddProfile.length - 1];
    }

    /**
     * Initialize the game
     * @param {HTMLElement} rootElement
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
        const gameVM = this;

        this._context.clearRect(0, 0, this._width, this._height);
        this._background.paint();

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
        console.log('START THE GAME', this);

        const TICK = Math.round(1000 / GAME_FPS);
        this._interval = setInterval(this._onTick.bind(this), TICK);
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

    _onClick ()
    {
        
    }
}