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
    toString: () => `rgb(${this.red}, ${this.green}, ${this.blue});`
};

/**
 *
 * @param {String} hexString
 * @returns {RgbColor}
 */
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

    const splittedHex = hexString.match(/.{2}/g);

    console.log('splitted', splittedHex);

    if (Array.isArray(splittedHex) && splittedHex.length === 3) {
        const decimalColors = splittedHex.map(colorHex => parseInt(colorHex, 16));

        return new RgbColor(...decimalColors);
    }
    else {
        throw new Error(`${hexString} is not a valid hex color value`);
    }
};