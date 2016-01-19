const ANIMATION_TYPE = {
    COLOR: 'color'
};

class Animation
{
    /**
     * Animation constructor
     * @param {Object} [options]
     *  @param {String} [options.type]
     *  @param {Function} [options.onChange]
     */
    constructor (options = {})
    {
        this.type = options.type;
        this.onChange = options.onChange;
        this.currentValue = null;
    }

    onTick ()
    {
        if (typeof this.onChange === 'function') {
            this.onChange(this.currentValue);
        }
    }
}