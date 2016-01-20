/**
 * @author Jakob Kerkhove
 * @description Code example for job application
 */
class SparkCentral
{
    /**
     * Constructor for SparkCentral class
     * @cascade
     */
    constructor ()
    {
        this.elements = null;
        this.design = null;
        this.timeline = null;

        this._cacheElements();
        this._initDefaultDesign();
        this._initTimeline();

        this.elements.homePrimaryButton.addEventListener('click', this.hunt.bind(this));

        Array.prototype.forEach.call(this.elements.allLinks, link => {
            link.setAttribute('href', '#');
            link.setAttribute('onclick', '');
        });

        return this;
    }


    /**
     * Cache all the elements needed
     * @private
     */
    _cacheElements ()
    {
        const elements = {};

        elements.mainHeader = document.querySelector('.main-header');
        elements.headerMenu = elements.mainHeader.querySelector('.menu');
        elements.hiringBanner = elements.mainHeader.querySelector('.hiring-banner');
        elements.homeJumbotron = document.querySelector('.jumbotron.home');
        elements.homeTitle = elements.homeJumbotron.querySelector('h1');
        elements.homeContainer = elements.homeJumbotron.querySelector('.container');
        elements.homeParagraph = elements.homeJumbotron.querySelector('.col-md-10.col-md-offset-1.col-sm-12');
        elements.homeButtonGroup = elements.homeJumbotron.querySelector('.btn-container');
        elements.homePrimaryButton = elements.homeJumbotron.querySelector('.btn-primary');
        elements.homeSecondaryButton = elements.homeJumbotron.querySelector('.btn-secondary');
        elements.sectionsAndHrAndFooter = document.querySelectorAll('section,hr,footer');
        elements.allLinks = document.querySelectorAll('a');

        this.elements = elements;
    }

    /**
     * Set all the defaults for styling
     * @private
     */
    _initDefaultDesign ()
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

        this.design = design;
    }

    /**
     * Initialize the timeline
     * @private
     */
    _initTimeline ()
    {
        const timeline = new Timeline();

        timeline.insert(ANIMATION_SEQUENCE(this.design, this.elements));
        timeline.start();

        this.timeline = timeline;
    }

    /**
     * Hunt for job candidates
     * @cascade
     */
    hunt ()
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

        return this;

        /**
         * When the user won the game
         */
        function onWin ()
        {
            destroyGame();
            showWinnersPage();
        }

        /**
         * Game over...
         */
        function onFail ()
        {
            destroyGame();
            showLosersPage();
        }

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

            const buttonGroup = vm.elements.homeButtonGroup;

            buttonGroup.innerHTML = '';
            buttonGroup.appendChild(DomHelper.createButton('http://dejakob.com/?sparkcentral', 'Web'));
            buttonGroup.appendChild(DomHelper.createButton('http://linkedin.com/in/jakob-kerkhove-4a987281', 'LinkedIN'));
            buttonGroup.appendChild(DomHelper.createButton('http://github.com/dejakob', 'GitHub'));

            DomHelper.attachStyle(vm.elements.homeContainer, { visibility: 'visible' });
        }

        /**
         * Show the winners page
         */
        function showLosersPage ()
        {

            vm.elements.homeTitle.innerHTML = 'Game over!';
            vm.elements.homeParagraph.innerHTML = 'You failed, but remember: <br />' +
                'Success is the result of perfection, ' +
                'hard work, learning from failure, loyalty, and persistence. (Colin Powell)';

            const buttonGroup = vm.elements.homeButtonGroup;
            const tryAgainButton = document.createElement('a');

            tryAgainButton.setAttribute('class', 'btn btn-primary');
            tryAgainButton.setAttribute('href', '#');
            tryAgainButton.innerHTML = 'Try again';
            tryAgainButton.onclick = () => vm.hunt();

            buttonGroup.innerHTML = '';
            buttonGroup.appendChild(tryAgainButton);

            DomHelper.attachStyle(vm.elements.homeContainer, { visibility: 'visible' });
        }
    }
}