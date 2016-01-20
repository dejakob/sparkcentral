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
    Array.prototype.forEach.call(this.elements.allLinks, link => {
        link.setAttribute('href', '#');
        link.setAttribute('onclick', '');
    });

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
        const vm = this;

        const top = '150px';
        const left = `${Math.round(0.1 * window.innerWidth)}px`;
        const position = 'absolute';
        const border = '1px #fff solid';
        const borderRadius = '3px';
        const cursor = 'pointer';
        const backgroundImage = 'url(http://i.imgur.com/s7GuTWV.jpg)';
        const backgroundSize = 'cover';
        const backgroundPostion = 'center center';
        const backgroundRepeat = 'no-repeat';
        const height = window.innerHeight - 200;
        const width = window.innerWidth * 0.8;

        vm.huntGame = new HuntGame(
            height,
            width,
            {
                onWin, onFail
            },
            {
                top, left, position, border, borderRadius, cursor,
                backgroundImage, backgroundSize, backgroundRepeat, backgroundPostion
            }
        );

        DomHelper.attachStyle(vm.elements.homeContainer, { visibility: 'hidden' });
        vm.huntGame.init(vm.elements.homeJumbotron);
        setTimeout(vm.huntGame.start.bind(vm.huntGame), 1000);

        /**
         * When the user won the game
         */
        function onWin ()
        {
            destroyGame();
            showWinnersPage();

            /**
             * Clean everything related to the game
             */
            function destroyGame ()
            {
                vm.huntGame.destroy();
                delete vm.huntGame;
            }

            /**
             * Show the winners page
             */
            function showWinnersPage ()
            {

                vm.elements.homeTitle.innerHTML = 'Congratulations! <br />' +
                    'You found a perfect fit for the job \'Front End Developer\'.';
                vm.elements.homeParagraph.innerHTML = 'Feel free to contact the candidate...';

                const buttonGroup = vm.elements.homePrimaryButton.parentNode;

                buttonGroup.innerHTML = '';
                buttonGroup.appendChild(createButton('http://dejakob.com/?sparkcentral', 'Web'));
                buttonGroup.appendChild(createButton('http://linkedin.com/in/jakob-kerkhove-4a987281', 'LinkedIN'));
                buttonGroup.appendChild(createButton('http://github.com/dejakob', 'GitHub'));

                DomHelper.attachStyle(vm.elements.homeContainer, { visibility: 'visible' });

                /**
                 * Create a button (link HTML element)
                 * @param {String} link
                 * @param {String} description
                 * @returns {HTMLAnchorElement}
                 */
                function createButton (link, description)
                {
                    const webButton = document.createElement('a');

                    webButton.setAttribute('class', 'btn btn-secondary');
                    webButton.setAttribute('href', link);
                    webButton.innerHTML = description;

                    return webButton;
                }
            }
        }

        /**
         * Game over...
         */
        function onFail ()
        {
            DomHelper.attachStyle(vm.elements.homeContainer, { visibility: 'visible' });
        }
    }
}