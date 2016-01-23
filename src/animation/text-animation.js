const TEXT_ANIMATION_DIRECTIONS = {
    ADD: 'add',
    REMOVE: 'remove'
};

/**
 * TextAnimation class
 */
class TextAnimation extends Animation
{
    /**
     * Color Animation constructor
     * @param {Object} [options]
     *  @param {RgbColor} options.from
     *  @param {RgbColor} options.to
     * @extends {Animation}
     * @constructor
     */
    constructor (options = {}) {
        if (typeof options.from !== 'string' || typeof options.to !== 'string') {
            throw new Error('from and to option should be strings to create a text animation.');
        }

        super(options);

        this.type = ANIMATION_TYPE.TEXT;
        this._from = options.from;
        this._to = options.to;
        this._updateDifference();
    }

    /**
     * Getter for from property
     * @returns {String}
     */
    get from () {
        return this._from;
    }

    /**
     * Setter for from property
     * @param {String} value
     */
    set from (value) {
        this._from = value;
        this._updateDifference();
    }

    /**
     * Getter for to property
     * @returns {String}
     */
    get to () {
        return this._to;
    }

    /**
     * Setter for to property
     * @param {String} value
     */
    set to (value) {
        this._to = value;
        this._updateDifference();
    }

    /**
     * Update the difference between from and to
     * @private
     */
    _updateDifference () {
        if (this.to.length > this.from.length) {
            this.textDifference = this.to.substring(this.from.length, this.to.length);
            this.animationDirection = TEXT_ANIMATION_DIRECTIONS.ADD;
        }
        else {
            this.textDifference = this.from.substring(this.to.length, this.from.length);
            this.animationDirection = TEXT_ANIMATION_DIRECTIONS.REMOVE;
        }
    }

    /**
     * @param {Number} percentageComplete
     */
    onTick (percentageComplete) {
        let text = null;

        if (this.animationDirection === TEXT_ANIMATION_DIRECTIONS.ADD) {
            const lengthOfDifference = Math.round(this.textDifference.length * percentageComplete);
            text = this.from + this.textDifference.substring(0, lengthOfDifference);
        }
        else {
            const lengthOfDifference =
                Math.round(this.textDifference.length * (1 - percentageComplete));
            text = this.to + this.textDifference.substring(0, lengthOfDifference);
        }

        this.currentValue = text === '' ? '&nbsp;' : text;
        super.onTick();
    }

    /**
     * Make sure all the text is shown when the animation ended
     */
    onComplete () {
        this.currentValue = this.to;
        super.onTick();
        super.onComplete();
    }
}
