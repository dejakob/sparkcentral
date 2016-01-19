const TEXT_ANIMATION_DIRECTIONS = {
    ADD: 'add',
    REMOVE: 'remove'
};

/**
 * Color Animation constructor
 * @param {Object} [options]
 *  @param {RgbColor} options.from
 *  @param {RgbColor} options.to
 * @extends {Animation}
 * @constructor
 */
class TextAnimation extends Animation
{
    constructor (options = {})
    {
        if (typeof options.from !== 'string' || typeof options.to !== 'string') {
            throw new Error('from and to option should be strings to create a text animation.')
        }

        super(options);

        this.type = ANIMATION_TYPE.TEXT;
        this.from = options.from;
        this.to = options.to;

        if (this.to.length > this.from.length) {
            this.textDifference = this.to.substring(this.from.length - 1, this.to.length);
            this.animationDirection = TEXT_ANIMATION_DIRECTIONS.ADD;
        }
        else {
            this.textDifference = this.from.substring(this.to.length - 1, this.from.length);
            this.animationDirection = TEXT_ANIMATION_DIRECTIONS.REMOVE;
        }

        console.log('diff', this.textDifference);
    }

    /**
     * @param {Number} percentageComplete
     */
    onTick (percentageComplete)
    {
        let text = null;

        if (this.animationDirection === TEXT_ANIMATION_DIRECTIONS.ADD) {
            const lengthOfDifference = Math.round(this.textDifference.length * percentageComplete);

            text = this.from + this.textDifference.substring(0, lengthOfDifference);
        }
        else {
            const lengthOfDifference = Math.round(this.textDifference.length * (1 - percentageComplete));

            text = this.to + this.textDifference.substring(0, lengthOfDifference);
        }

        console.log('TEXT', text);

        this.currentValue = text;
        super.onTick();
    }
}