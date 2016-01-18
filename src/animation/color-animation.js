/**
 * Color Animation constructor
 * @param {Object} [options]
 *  @param {RgbColor} options.from
 *  @param {RgbColor} options.to
 *  @param {Number} options.duration
 * @constructor
 */
function ColorAnimation (options = {})
{
    if (!(options.from instanceof RgbColor && options.to instanceof RgbColor)) {
        throw new Error('from and to option should be defined to create a color animation.')
    }


}

ColorAnimation.prototype = Animation.prototype;