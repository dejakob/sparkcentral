/**
 * Resize Animation constructor
 * @param {Object} [options]
 *  @param {RgbColor} options.from
 *  @param {RgbColor} options.to
 * @extends {Animation}
 * @constructor
 */
class SizeAnimation extends Animation
{
    constructor (options = {})
    {
        const VALID_TYPES = [
            'number',
            'string'
        ];

        if (VALID_TYPES.indexOf(typeof options.from) === -1 || VALID_TYPES.indexOf(typeof options.to) === -1) {
            throw new Error('from and to option should be defined to create a resize animation.')
        }

        super(options);

        this.type = ANIMATION_TYPE.SIZE;
        this.from = parseInt(options.from, 10);
        this.to = parseInt(options.to, 10);
    }

    /**
     * @param {Number} percentageComplete
     */
    onTick (percentageComplete)
    {
        const size = (this.to - this.from) * (percentageComplete) + this.from;

        this.currentValue = `${size}px`;
        super.onTick();
    }
}