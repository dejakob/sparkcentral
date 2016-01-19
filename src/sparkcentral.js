/**
 * @author Jakob Kerkhove
 * @description Code example for job application
 */
SparkCentral.call({}, window);

function SparkCentral (window)
{
    this.elements = cacheElements();
    this.design = initDefaultDesign.call(this);
    this.timeline = initTimeline.call(this);

    /**
     * Cache all the elements needed
     */
    function cacheElements ()
    {
        const elements = {};

        elements.mainHeader = document.querySelector('.main-header');
        elements.hiringBanner = elements.mainHeader.querySelector('.hiring-banner');
        elements.homeJumbotron = document.querySelector('.jumbotron.home');
        elements.homeTitle = elements.homeJumbotron.querySelector('h1');
        elements.homeParagraph = elements.homeJumbotron.querySelector('.col-md-10.col-md-offset-1.col-sm-12');
        elements.homePrimaryButton = elements.homeJumbotron.querySelector('.btn-primary');
        elements.homeSecondaryButton = elements.homeJumbotron.querySelector('.btn-secondary');
        elements.sectionsAndHr = document.querySelectorAll('section,hr');

        return elements;
    }

    /**
     * Set all the defaults for styling
     * @returns {Object}
     */
    function initDefaultDesign ()
    {
        const SPARK_CENTRAL_BLUE = '#468FDC';
        const DARK_BLUE = '#3358A2';

        const design = {};

        design.colors = {
            blue: RgbColor.fromHex(SPARK_CENTRAL_BLUE),
            darkBlue: RgbColor.fromHex(DARK_BLUE)
        };

        design.fontSizes = {
            hiringBanner: '12px',
            average: '20px'
        };

        design.sizes = {
            homeHeight: this.elements.homeJumbotron.clientHeight,
            height: window.innerHeight + 20
        };

        window.addEventListener('resize', onWindowResize);

        return design;

        /**
         * When the window resizes
         */
        function onWindowResize ()
        {
            console.log('jajaja');

            design.height = window.innerHeight + 20;
        }
    }

    /**
     * Initialize the timeline
     * @returns {Timeline}
     */
    function initTimeline ()
    {
        console.log('init');

        const timeline = new Timeline();

        timeline.insert(ANIMATION_SEQUENCE(this.design, this.elements));
        timeline.start();

        return timeline;
    }
}