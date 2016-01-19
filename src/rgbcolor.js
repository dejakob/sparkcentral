class RgbColor
{
    /**
     * RgbColor Constuctor
     * @param {Number} red
     * @param {Number} green
     * @param {Number} blue
     * @constructor
     */
    constructor (red, green, blue)
    {
        this.red = parseInt(red, 10);
        this.green = parseInt(green, 10);
        this.blue = parseInt(blue, 10);
    }

    /**
     * toString method
     * @override
     */
    toString ()
    {
        return `rgb(${this.red},${this.green},${this.blue});`;
    }

    /**
     * Create rgbColor from hexString
     * @param {String} hexString
     * @returns {RgbColor}
     */
    static fromHex (hexString)
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

        if (Array.isArray(splittedHex) && splittedHex.length === 3) {
            const decimalColors = splittedHex.map(colorHex => parseInt(colorHex, 16));

            return new RgbColor(...decimalColors);
        }
        else {
            throw new Error(`${hexString} is not a valid hex color value`);
        }
    }
}