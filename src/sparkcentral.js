/**
 * @author Jakob Kerkhove
 * @description Code example for job application
 */
(SparkCentral)(window);

function SparkCentral (window)
{
    const elements = {};

    this.design = initDefaultDesign();
    this.elements = cacheElements;
    this.timeline = initTimeline();

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
    function initDefaultDesign ()
    {
        const SPARK_CENTRAL_BLUE = '#468FDC';
        const DARK_BLUE = '';

        const design = {};

        design.colors = {
            blue: RgbColor.fromHex(SPARK_CENTRAL_BLUE)
        };

        return design;
    }

    /**
     * Initialize the timeline
     * @returns {Timeline}
     */
    function initTimeline ()
    {
        const timeline = new Timeline();

        return timeline;
    }
}