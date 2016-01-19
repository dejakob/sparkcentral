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

    this.startHunting = startHunting;

    this.elements.homePrimaryButton.addEventListener('click', this.startHunting.bind(this));

    /**
     * Cache all the elements needed
     */
    function cacheElements ()
    {
        const elements = {};

        elements.mainHeader = document.querySelector('.main-header');
        elements.headerMenu = elements.mainHeader.querySelector('.menu');
        elements.hiringBanner = elements.mainHeader.querySelector('.hiring-banner');
        elements.homeJumbotron = document.querySelector('.jumbotron.home');
        elements.homeTitle = elements.homeJumbotron.querySelector('h1');
        elements.homeContainer = elements.homeJumbotron.querySelector('.container');
        elements.homeParagraph = elements.homeJumbotron.querySelector('.col-md-10.col-md-offset-1.col-sm-12');
        elements.homePrimaryButton = elements.homeJumbotron.querySelector('.btn-primary');
        elements.homeSecondaryButton = elements.homeJumbotron.querySelector('.btn-secondary');
        elements.sectionsAndHrAndFooter = document.querySelectorAll('section,hr,footer');
        elements.allLinks = document.querySelectorAll('a');

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

        return design;
    }

    /**
     * Initialize the timeline
     * @returns {Timeline}
     */
    function initTimeline ()
    {
        const timeline = new Timeline();

        timeline.insert(ANIMATION_SEQUENCE(this.design, this.elements));
        timeline.start();

        return timeline;
    }

    function startHunting ()
    {
        const top = '150px';
        const left = `${Math.round(0.1 * window.innerWidth)}px`;
        const position = 'absolute';
        const border = '1px #fff solid';
        const borderRadius = '3px';
        const backgroundColor = this.design.colors.blue;
        const height = window.innerHeight - 200;
        const width = window.innerWidth * 0.8;

        const huntGame = new HuntGame(height, width, { top, left, position, border, borderRadius, backgroundColor });

        DomHelper.attachStyle(this.elements.homeContainer, { visibility: 'hidden' });
        huntGame.init(this.elements.homeJumbotron);
    }
}