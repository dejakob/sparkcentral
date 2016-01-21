/**
 * Bind method compability for phantomJS
 */
(Function => {
    'use strict';

    if (typeof Function.prototype.bind !== 'function') {
        Function.prototype.bind = bind;
    }

    /**
     * Bind fallback
     * @param thisArg
     * @returns {Function} binder
     */
    function bind (thisArg)
    {
        const bindArgs = Array.prototype.splice.call(arguments, 1);
        const vm = this;

        binder.prototype = vm.prototype;
        return binder;

        function binder ()
        {
            const args = bindArgs.concat(Array.prototype.splice.call(arguments, 0));

            if (!(this instanceof binder)) {
                return vm.apply(thisArg, args);
            }

            vm.apply(this, args);
        }
    }
})(Function);