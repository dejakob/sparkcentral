/**
 * SizeAnimation class
 */
class SizeAnimation extends Animation
{
    /**
     * Resize Animation constructor
     * @param {Object} [options]
     *  @param {RgbColor} options.from
     *  @param {RgbColor} options.to
     * @extends {Animation}
     * @constructor
     */
    constructor (options = {}) {
        const VALID_TYPES = [
            'number',
            'string'
        ];

        if (
            VALID_TYPES.indexOf(typeof options.from) === -1 ||
            VALID_TYPES.indexOf(typeof options.to) === -1
        ) {
            throw new Error('from and to option should be defined to create a resize animation.');
        }

        super(options);

        this.type = ANIMATION_TYPE.SIZE;
        this._from = options.from;
        this._to = options.to;
        this._updateProps();
    }

    /**
     * Getter of the from propery
     * @returns {RgbColor}
     */
    get from () {
        return this._from;
    }

    /**
     * Setter of the from property
     * @param {RgbColor} value
     */
    set from (value) {
        this._from = value;
        this._updateProps();
    }

    /**
     * Getter of the to property
     * @returns {RgbColor}
     */
    get to () {
        return this._to;
    }

    /**
     * Setter of the to property
     * @param {RgbColor} value
     */
    set to (value) {
        this._to = value;
        this._updateProps();
    }

    /**
     * Update from and to properties
     * @private
     */
    _updateProps () {
        if (typeof this._from === 'string') {
            this._from = Number(this._from.replace('px', ''));
        }

        if (typeof this._to === 'string') {
            this._to = Number(this._to.replace('px', ''));
        }
    }

    /**
     * @param {Number} percentageComplete
     */
    onTick (percentageComplete) {
        const size = Number((this._to - this._from) * percentageComplete + this._from);

        this.currentValue = `${size}px`;
        super.onTick();
    }
}
