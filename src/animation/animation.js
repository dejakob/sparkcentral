const ANIMATION_TYPE = {
    COLOR: 'color'
};

/**
 * Animation constructor
 * @param {Object} [options]
 *  @param {String} [options.type]
 * @constructor
 */
function Animation (options = {})
{
    this._interval = null;

    switch (options.type) {
        case ANIMATION_TYPE.COLOR:
            return new ColorAnimation(options);

        default:
            break;
    }
}

Animation.prototype = {
    start () {

    },

    stop () {
        if (this._interval !== null) {
            clearInterval(this._interval);
        }

        throw new Error('Could not stop animation');
    }
};