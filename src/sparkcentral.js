/**
 * @author Jakob Kerkhove
 * @description Code example for job application
 *  Go to http://www.sparkcentral.com/ and copy paste this code into the console
 */
(SparkCentral)(window);

function SparkCentral (window)
{
    'use strict';

    const elements = {};

    this.design = generateDefaultDesign();
    this.elements = cacheElements;

    /**
     * Cache all the elements needed
     */
    function cacheElements ()
    {
        elements.mainHeader = document.querySelector('.main-header');
    }

    /**
     * Set all the defaults for styling
     */
    function generateDefaultDesign ()
    {
        const SPARK_CENTRAL_BLUE = '#468FDC';


        function hexToRgb ()
        {

        }
    }
}

/**
 * RgbColor Object
 * @param red
 * @param green
 * @param blue
 * @constructor
 */
function RgbColor (red, green, blue)
{
    this.red = red;
    this.green = green;
    this.blue = blue;
}
RgbColor.prototype = {
    toString ()
    {
        return `rgb(${this.red}, ${this.green}, ${this.blue});`;
    }
};
RgbColor.fromHex = function (hexString)
{
    const hexStringLength = hexString.length;

    if (hexString.indexOf('#') === 0)
    {
        hexString = hexString.substr(1, hexStringLength - 1);
    }

    if (hexString.length === 3)
    {
        hexString = hexString
            .split('')
            .map(tint => `${tint}${tint}`)
            .join('');
    }

    const splittedHex = hexString.match(/.{3}/g);

    if (Array.isArray(splittedHex) && splittedHex.length === 3) {
        const decimalColors = splittedHex.map(colorHex => parseInt(colorHex, 16));

        return new RgbColor(...decimalColors);
    }
    else {
        throw new Error(`${hexString} is not a valid hex color value`);
    }
};