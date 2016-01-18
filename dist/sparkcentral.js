/**
 * @author Jakob Kerkhove (@dejakob)
 * @description
 *  Code example for my Job application at SparkCentral
 *  Go to http://www.sparkcentral.com/ and paste all code into the console.
 *  Uncompiled version: http://github.com/dejakob/sparkcentral
 */
"use strict";
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * RgbColor Object
 * @param red
 * @param green
 * @param blue
 * @constructor
 */
function RgbColor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;

    return this;
}

/**
 * Methods of the RgbColor Object
 * @type {Object}
 */
RgbColor.prototype = {

    /**
     * toString method
     * @override
     */
    toString: function toString() {
        return 'rgb(' + undefined.red + ', ' + undefined.green + ', ' + undefined.blue + ');';
    }
};

/**
 *
 * @param {String} hexString
 * @returns {RgbColor}
 */
RgbColor.fromHex = function (hexString) {
    var hexStringLength = hexString.length;

    if (hexString.indexOf('#') === 0) {
        hexString = hexString.substr(1, hexStringLength - 1);
    }

    if (hexString.length === 3) {
        hexString = hexString.split('').map(function (tint) {
            return '' + tint + tint;
        }).join('');
    }

    var splittedHex = hexString.match(/.{2}/g);

    console.log('splitted', splittedHex);

    if (Array.isArray(splittedHex) && splittedHex.length === 3) {
        var decimalColors = splittedHex.map(function (colorHex) {
            return parseInt(colorHex, 16);
        });

        return new (Function.prototype.bind.apply(RgbColor, [null].concat(_toConsumableArray(decimalColors))))();
    } else {
        throw new Error(hexString + ' is not a valid hex color value');
    }
};
'use strict';

/**
 * @author Jakob Kerkhove
 * @description Code example for job application
 */
SparkCentral(window);

function SparkCentral(window) {
    var elements = {};

    this.design = generateDefaultDesign();
    this.elements = cacheElements;

    /**
     * Cache all the elements needed
     */
    function cacheElements() {
        elements.mainHeader = document.querySelector('.main-header');
    }

    /**
     * Set all the defaults for styling
     * @returns {Object}
     */
    function generateDefaultDesign() {
        var SPARK_CENTRAL_BLUE = '#468FDC';

        var design = {};

        design.colors = {
            blue: RgbColor.fromHex(SPARK_CENTRAL_BLUE)
        };

        console.log('design', design);

        return design;
    }
}