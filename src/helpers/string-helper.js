/**
 * Helper methods for String manipulation
 */
class StringHelper
{
    /**
     * Convert camel case format to dash CSS format
     * @param {String} value
     * @static
     */
    static camelToDash (value) {
        if (typeof value !== 'string') {
            throw new Error(`${value} should be a string.`);
        }

        const CAMEL_REGEX = /(^[a-z]+)|([A-Z]([a-z])*)/g;
        const camelMatches = value.match(CAMEL_REGEX);

        if (camelMatches === null || camelMatches.length === 0) {
            throw new Error(`${value} is not a valid string in camelCase.`);
        }

        return camelMatches
            .map(camelMatch => camelMatch.toLowerCase())
            .join('-');
    }

    /**
     * Convert dash CSS format to camel case format
     * @param {String} value
     * @static
     */
    static dashToCamel (value) {
        const valueParts = value.split('-');

        return valueParts[0] + value
                .split('-')
                .filter(valuePart => valuePart !== valueParts[0])
                .map(valuePart =>
                    `${valuePart[0].toUpperCase()}${valuePart.substring(1, valuePart.length)}`
                )
                .join('');
    }
}
