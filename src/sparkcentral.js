/**
 * @author Jakob Kerkhove
 * @description Code example for job application
 */
(SparkCentral)(window);

function SparkCentral (window)
{
    const elements = {};

    this.design = generateDefaultDesign();
    this.elements = cacheElements;

    /**
     * Cache all the elements needed
     */
    function cacheElements ()
    {
        elements.mainHeader = document.querySelector('.main-header');
        elements.homeJumbotron = document.querySelector('.jumbotron.home');
    }

    /**
     * Set all the defaults for styling
     * @returns {Object}
     */
    function generateDefaultDesign ()
    {
        const SPARK_CENTRAL_BLUE = '#468FDC';
        const DARK_BLUE = '';

        const design = {};

        design.colors = {
            blue: RgbColor.fromHex(SPARK_CENTRAL_BLUE)
        };

        return design;
    }
}