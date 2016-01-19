/**
 * @author Jakob Kerkhove
 * @description Code example for job application
 */
SparkCentral.call({}, window);

function SparkCentral (window)
{
    this.design = initDefaultDesign();
    this.elements = cacheElements();
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
            average: '30px'
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
        const animationSequence = [
            [
                2000,
                3000,
                new ColorAnimation({
                    from: this.design.colors.blue,
                    to: this.design.colors.darkBlue,
                    onChange: backgroundColor => DomHelper.attachStyle(this.elements.homeJumbotron, { backgroundColor })
                })
            ],
            [
                2500,
                3500,
                new SizeAnimation({
                    from: this.design.fontSizes.hiringBanner,
                    to: this.design.fontSizes.average,
                    onChange: fontSize => DomHelper.attachStyle(this.elements.hiringBanner, { fontSize })
                })
            ]
        ];

        timeline.insert(animationSequence);
        timeline.start();

        return timeline;
    }
}