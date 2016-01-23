/**
 * Color Animation constructor
 * @param {Object} [options]
 *  @param {RgbColor} options.from
 *  @param {RgbColor} options.to
 * @extends {Animation}
 * @constructor
 */
class ColorAnimation extends Animation
{
    constructor (options = {}) {
        if (!(options.from instanceof RgbColor && options.to instanceof RgbColor)) {
            throw new Error('from and to option should be defined to create a color animation.');
        }

        super(options);

        this.type = ANIMATION_TYPE.COLOR;
        this.from = options.from;
        this.to = options.to;
    }

    /**
     * @param {Number} percentageComplete
     */
    onTick (percentageComplete) {
        const red = (this.to.red - this.from.red) * (percentageComplete) + this.from.red;
        const green = (this.to.green - this.from.green) * (percentageComplete) + this.from.green;
        const blue = (this.to.blue - this.from.blue) * (percentageComplete) + this.from.blue;

        this.currentValue = new RgbColor(red, green, blue).toString();

        super.onTick();
    }
}
