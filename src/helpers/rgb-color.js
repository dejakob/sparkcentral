/**
 * RgbColor class
 */
class RgbColor
{
    /**
     * RgbColor Constuctor
     * @param {Number} red
     * @param {Number} green
     * @param {Number} blue
     * @constructor
     */
    constructor (red, green, blue) {
        this.red = parseInt(red, 10);
        this.green = parseInt(green, 10);
        this.blue = parseInt(blue, 10);

        if (isNaN(this.red) || isNaN(this.green) || isNaN(this.blue)) {
            throw new Error('All colors should be defined with a number');
        }
    }

    /**
     * toString method
     * @override
     */
    toString () {
        return `rgb(${this.red},${this.green},${this.blue})`;
    }

    /**
     * Create rgbColor from colors array
     * @param {Array.<Number>} colors
     */
    static fromArray (colors) {
        if (
            typeof colors === 'undefined' ||
            !Array.isArray(colors) ||
            colors.length !== 3 ||
            colors.filter(color => typeof color === 'number' && !isNaN(color)).length !== 3
        ) {
            throw new Error(`Could not create RgbColor of ${colors}`);
        }

        return new RgbColor(colors[0], colors[1], colors[2]);
    }

    /**
     * Create rgbColor from hexString
     * @param {String} hexString
     * @returns {RgbColor}
     */
    static fromHex (hexString) {
        if (typeof hexString !== 'string') {
            throw new Error('Please enter a string to create a RgbColor');
        }
        
        let newHexString = hexString;
        const newHexStringLength = hexString.length;

        if (newHexString.indexOf('#') === 0) {
            newHexString = newHexString.substr(1, newHexStringLength - 1);
        }

        if (newHexString.length === 3) {
            newHexString = newHexString
                .split('')
                .map(tint => `${tint}${tint}`)
                .join('');
        }

        const splittedHex = newHexString.match(/.{2}/g);

        if (Array.isArray(splittedHex) && splittedHex.length === 3) {
            const decimalColors = splittedHex.map(colorHex => parseInt(colorHex, 16));
            return RgbColor.fromArray(decimalColors);
        }

        throw new Error(`${newHexString} is not a valid hex color value`);
    }
}
