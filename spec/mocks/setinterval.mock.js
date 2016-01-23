(function () {
    'use strict';

    const originalSetInterval = (setIntervalMethod => {
        return function ()
        {
            return setIntervalMethod(...arguments);
        };
    })(window.setInterval);

    const originalClearInterval = (clearIntervalMethod => {
        return function ()
        {
            return clearIntervalMethod(...arguments);
        };
    })(window.setInterval);

    window.setInterval = DecoratedSetInterval;
    window.clearInterval = DecoratedClearInterval;

    /**
     * Decorated setInterval with extra logic for unit tests
     * @param {Function} onEachTick
     * @param {Number} timing
     * @returns {Number}
     */
    function DecoratedSetInterval (onEachTick, timing)
    {
        return {
            _onEachTick: onEachTick,
            _timing: timing,
            _interval: originalSetInterval(this._onEachTick, this._timing),

            trigger ()
            {
                this._onEachTick();
            },

            clear ()
            {
                originalClearInterval(this._interval);
            }
        };
    }

    /**
     * @param {DecoratedSetInterval} decoratedInterval
     * @constructor
     */
    function DecoratedClearInterval (decoratedInterval)
    {
        if (decoratedInterval && decoratedInterval._interval) {
            originalClearInterval(decoratedInterval._interval);
        }
    }
})();