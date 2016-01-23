/**
 * Helper methods for DOM manipulation
 */
class DomHelper
{
    /**
     * Attach style properties to a DOM element
     * @param {HTMLElement} element
     * @param {Object} styleProps
     * @static
     */
    static attachStyle (element, styleProps) {
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
                .forEach(property => allProps[StringHelper.dashToCamel(property[0])] = property[1]);

            Object.keys(styleProps)
                .forEach(propName => {
                    if (styleProps.hasOwnProperty(propName)) {
                        allProps[StringHelper.dashToCamel(propName)] = styleProps[propName];
                    }
                });
        }

        const styleString = Object.keys(allProps)
            .filter(propName => allProps.hasOwnProperty(propName))
            .map(propName => `${StringHelper.camelToDash(propName)}:${allProps[propName]}`)
            .join(';');

        element.setAttribute('style', styleString);
    }

    /**
     * Create a button (link HTML element) {String} link
     * @param {String} description
     * @returns {Element}
     * @static
     */
    static createLinkButton (link, description) {
        const webButton = document.createElement('a');

        webButton.setAttribute('class', 'btn btn-secondary');
        webButton.setAttribute('target', '_blank');
        webButton.setAttribute('href', link);
        webButton.innerHTML = description;

        return webButton;
    }
}
