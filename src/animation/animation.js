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
     *  @param {Function} [options.from]
     *  @param {Function} [options.to]
     */
    constructor (options = {})
    {
        this.type = options.type;
        this._onChange = options.onChange;
        this._onComplete = options.onComplete;
        this.currentValue = null;

        if (typeof options.from === 'number' && typeof options.to === 'number') {
            this.from = options.from;
            this.to = options.to;
        }
    }

    /**
     * Event gets triggered on each tick
     * @param {Number} percentageComplete
     */
    onTick (percentageComplete)
    {
        if (typeof percentageComplete === 'number') {
            const value = (this.to - this.from) * (percentageComplete) + this.from;
            this.currentValue = Math.round(value * 100) / 100;
        }

        if (typeof this._onChange === 'function') {
            this._onChange(this.currentValue);
        }
    }

    /**
     * When the animation is complete
     */
    onComplete ()
    {
        if (typeof this._onComplete === 'function') {
            this._onComplete();
        }
    }
}
