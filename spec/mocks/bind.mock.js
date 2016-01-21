/**
 * Bind method compability for phantomJS
 */
(Function => {
    'use strict';

    if (typeof Function.prototype.bind !== 'function') {
        Function.prototype.bind = bind;
    }

    /**
     * Bind compability method
     * @param thisArg
     * @returns {Function}
     */
    function bind (thisArg)
    {
        const method = this;
        const args = Array.prototype.filter.call(arguments, argument => argument !== thisArg);

        return () => method.apply(thisArg, args);
    }
})(Function);