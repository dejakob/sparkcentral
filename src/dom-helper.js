/**
 * Helper methods for DOM manipulation
 */
class DomHelper
{
    /**
     * Attach style properties to a DOM element
     * @param {HTMLElement} element
     * @param {Object} styleProps
     */
    static attachStyle (element, styleProps)
    {
        const originalStyleString = element.getAttribute('style') || '';
        let allProps = {};

        if (originalStyleString.trim() === '') {
            allProps = styleProps;
        }
        else {
            originalStyleString
                .split(';')
                .filter(declaration => declaration.trim() !== '')
                .map(declaration => declaration.split(':').map(prop => prop.trim()))
                .forEach(property => allProps[dashToCamel(property[0])] = property[1]);

            Object.keys(styleProps)
                .forEach(propName => {
                    if (styleProps.hasOwnProperty(propName)) {
                        allProps[dashToCamel(propName)] = styleProps[propName];
                    }
                });
        }

        console.log('all props', allProps);

        const styleString = Object.keys(allProps)
            .filter(propName => allProps.hasOwnProperty(propName))
            .map(propName => `${camelToDash(propName)}:${allProps[propName]}`)
            .join(';');

        console.log('style string', styleString);

        element.setAttribute('style', styleString);

        /**
         * Convert camel case format to dash CSS format
         * @param {String} value
         */
        function camelToDash (value)
        {
            const CAMEL_REGEX = /(^[a-z]+)|([A-Z]([a-z])+)/g;
            const camelMatches = value.match(CAMEL_REGEX);

            return camelMatches
                .map(camelMatch => camelMatch.toLowerCase())
                .join('-');
        }

        /**
         * Convert dash CSS format to camel case format
         * @param {String} value
         */
        function dashToCamel (value)
        {
            const valueParts = value.split('-');

            return valueParts[0] + value
                .split('-')
                .filter(valuePart => valuePart !== valueParts[0])
                .map(valuePart => `${valuePart[0].toUpperCase()}${valuePart.substring(1, valuePart.length)}`)
                .join('');
        }
    }
}