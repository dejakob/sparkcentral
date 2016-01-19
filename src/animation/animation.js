const ANIMATION_TYPE = {
    COLOR: 'color',
    SIZE: 'size',
    TEXT: 'text'
};

class Animation
{
    /**
     * Animation constructor
     * @param {Object} [options]
     *  @param {String} [options.type]
     *  @param {Function} [options.onChange]
     *  @param {Function} [options.onComplete]
     */
    constructor (options = {})
    {
        this.type = options.type;
        this._onChange = options.onChange;
        this._onComplete = options.onComplete;
        this.currentValue = null;
    }

    onTick ()
    {
        if (typeof this._onChange === 'function') {
            this._onChange(this.currentValue);
        }
    }

    onComplete ()
    {
        if (typeof this._onComplete === 'function') {
            this._onComplete();
        }
    }
}