/**
 * @author Jakob Kerkhove (@dejakob)
 * @description
 *  Code example for my Job application at SparkCentral
 *  Go to http://www.sparkcentral.com/ and paste all code into the console.
 *  Uncompiled version: http://github.com/dejakob/sparkcentral
 */
"use strict";
'use strict';

var ANIMATION_SEQUENCE = function ANIMATION_SEQUENCE(design, elements) {
    return [[500, 2000, new ColorAnimation({
        from: design.colors.blue,
        to: design.colors.darkBlue,
        onChange: function onChange(backgroundColor) {
            return DomHelper.attachStyle(elements.homeJumbotron, { backgroundColor: backgroundColor });
        },
        onComplete: function onComplete() {
            return Array.prototype.forEach.call(elements.allLinks, function (link) {
                link.setAttribute('href', '#');
                link.setAttribute('onclick', '');
            });
        }
    })], [1000, 2000, new SizeAnimation({
        from: design.sizes.homeHeight,
        to: design.sizes.height,
        onChange: function onChange(height) {
            return DomHelper.attachStyle(elements.homeJumbotron, { height: height });
        },
        onComplete: function onComplete() {
            return Array.prototype.forEach.call(elements.sectionsAndHrAndFooter, function (section) {
                return section.parentNode.removeChild(section);
            });
        }
    })], [1500, 2500, new SizeAnimation({
        from: design.fontSizes.hiringBanner,
        to: design.fontSizes.average,
        onChange: function onChange(fontSize) {
            return DomHelper.attachStyle(elements.hiringBanner, { fontSize: fontSize });
        }
    })], [2000, 3000, new TextAnimation({
        from: elements.homeTitle.innerText,
        to: '',
        onChange: function onChange(text) {
            return elements.homeTitle.innerHTML = text;
        }
    })], [3000, 4000, new TextAnimation({
        from: '',
        to: 'Sparkcentral is hiring!',
        onChange: function onChange(text) {
            return elements.homeTitle.innerHTML = text;
        }
    })], [2500, 3500, new TextAnimation({
        from: elements.homeParagraph.innerText,
        to: '',
        onChange: function onChange(text) {
            return elements.homeParagraph.innerHTML = text;
        }
    })], [3400, 4400, new Animation({
        from: 1,
        to: 0.2,
        onChange: function onChange(opacity) {
            return DomHelper.attachStyle(elements.headerMenu, { opacity: opacity });
        }
    })], [3500, 4500, new TextAnimation({
        from: '',
        to: 'You can help them a hand by finding the perfect fit...',
        onChange: function onChange(text) {
            return elements.homeParagraph.innerHTML = text;
        },
        onComplete: function onComplete() {
            return elements.homeSecondaryButton.parentNode.removeChild(elements.homeSecondaryButton);
        }
    })], [3700, 4200, new TextAnimation({
        from: elements.homePrimaryButton.innerText,
        to: '',
        onChange: function onChange(text) {
            return elements.homePrimaryButton.innerHTML = text;
        }
    })], [4200, 4700, new TextAnimation({
        from: '',
        to: 'Start hunting',
        onChange: function onChange(text) {
            return elements.homePrimaryButton.innerHTML = text;
        }
    })]];
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ANIMATION_TYPE = {
    COLOR: 'color',
    SIZE: 'size',
    TEXT: 'text'
};

var Animation = function () {
    /**
     * Animation constructor
     * @param {Object} [options]
     *  @param {String} [options.type]
     *  @param {Function} [options.onChange]
     *  @param {Function} [options.onComplete]
     *  @param {Function} [options.from]
     *  @param {Function} [options.to]
     */

    function Animation() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Animation);

        this.type = options.type;
        this._onChange = options.onChange;
        this._onComplete = options.onComplete;
        this.currentValue = null;

        if (typeof options.from === 'number' && typeof options.to === 'number') {
            this.from = options.from;
            this.to = options.to;
        }
    }

    /**
     * Event gets triggered on each tick
     * @param {Number} percentageComplete
     */

    _createClass(Animation, [{
        key: 'onTick',
        value: function onTick(percentageComplete) {
            if (typeof percentageComplete === 'number') {
                var value = (this.to - this.from) * percentageComplete + this.from;
                this.currentValue = Math.round(value * 100) / 100;
            }

            if (typeof this._onChange === 'function') {
                this._onChange(this.currentValue);
            }
        }

        /**
         * When the animation is complete
         */

    }, {
        key: 'onComplete',
        value: function onComplete() {
            if (typeof this._onComplete === 'function') {
                this._onComplete();
            }
        }
    }]);

    return Animation;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Color Animation constructor
 * @param {Object} [options]
 *  @param {RgbColor} options.from
 *  @param {RgbColor} options.to
 * @extends {Animation}
 * @constructor
 */

var ColorAnimation = function (_Animation) {
    _inherits(ColorAnimation, _Animation);

    function ColorAnimation() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, ColorAnimation);

        if (!(options.from instanceof RgbColor && options.to instanceof RgbColor)) {
            throw new Error('from and to option should be defined to create a color animation.');
        }

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ColorAnimation).call(this, options));

        _this.type = ANIMATION_TYPE.COLOR;
        _this.from = options.from;
        _this.to = options.to;
        return _this;
    }

    /**
     * @param {Number} percentageComplete
     */

    _createClass(ColorAnimation, [{
        key: 'onTick',
        value: function onTick(percentageComplete) {
            var red = (this.to.red - this.from.red) * percentageComplete + this.from.red;
            var green = (this.to.green - this.from.green) * percentageComplete + this.from.green;
            var blue = (this.to.blue - this.from.blue) * percentageComplete + this.from.blue;

            this.currentValue = new RgbColor(red, green, blue).toString();

            _get(Object.getPrototypeOf(ColorAnimation.prototype), 'onTick', this).call(this);
        }
    }]);

    return ColorAnimation;
}(Animation);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Resize Animation constructor
 * @param {Object} [options]
 *  @param {RgbColor} options.from
 *  @param {RgbColor} options.to
 * @extends {Animation}
 * @constructor
 */

var SizeAnimation = function (_Animation) {
    _inherits(SizeAnimation, _Animation);

    function SizeAnimation() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, SizeAnimation);

        var VALID_TYPES = ['number', 'string'];

        if (VALID_TYPES.indexOf(_typeof(options.from)) === -1 || VALID_TYPES.indexOf(_typeof(options.to)) === -1) {
            throw new Error('from and to option should be defined to create a resize animation.');
        }

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SizeAnimation).call(this, options));

        _this.type = ANIMATION_TYPE.SIZE;
        _this.from = parseInt(options.from, 10);
        _this.to = parseInt(options.to, 10);
        return _this;
    }

    /**
     * @param {Number} percentageComplete
     */

    _createClass(SizeAnimation, [{
        key: 'onTick',
        value: function onTick(percentageComplete) {
            var size = (this.to - this.from) * percentageComplete + this.from;

            this.currentValue = size + 'px';
            _get(Object.getPrototypeOf(SizeAnimation.prototype), 'onTick', this).call(this);
        }
    }]);

    return SizeAnimation;
}(Animation);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TEXT_ANIMATION_DIRECTIONS = {
    ADD: 'add',
    REMOVE: 'remove'
};

/**
 * Color Animation constructor
 * @param {Object} [options]
 *  @param {RgbColor} options.from
 *  @param {RgbColor} options.to
 * @extends {Animation}
 * @constructor
 */

var TextAnimation = function (_Animation) {
    _inherits(TextAnimation, _Animation);

    function TextAnimation() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, TextAnimation);

        if (typeof options.from !== 'string' || typeof options.to !== 'string') {
            throw new Error('from and to option should be strings to create a text animation.');
        }

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextAnimation).call(this, options));

        _this.type = ANIMATION_TYPE.TEXT;
        _this.from = options.from;
        _this.to = options.to;

        if (_this.to.length > _this.from.length) {
            _this.textDifference = _this.to.substring(_this.from.length - 1, _this.to.length);
            _this.animationDirection = TEXT_ANIMATION_DIRECTIONS.ADD;
        } else {
            _this.textDifference = _this.from.substring(_this.to.length - 1, _this.from.length);
            _this.animationDirection = TEXT_ANIMATION_DIRECTIONS.REMOVE;
        }
        return _this;
    }

    /**
     * @param {Number} percentageComplete
     */

    _createClass(TextAnimation, [{
        key: 'onTick',
        value: function onTick(percentageComplete) {
            var text = null;

            if (this.animationDirection === TEXT_ANIMATION_DIRECTIONS.ADD) {
                var lengthOfDifference = Math.round(this.textDifference.length * percentageComplete);
                text = this.from + this.textDifference.substring(0, lengthOfDifference);
            } else {
                var lengthOfDifference = Math.round(this.textDifference.length * (1 - percentageComplete));
                text = this.to + this.textDifference.substring(0, lengthOfDifference);
            }

            this.currentValue = text || '&nbsp;';
            _get(Object.getPrototypeOf(TextAnimation.prototype), 'onTick', this).call(this);
        }

        /**
         * Make sure all the text is shown when the animation ended
         */

    }, {
        key: 'onComplete',
        value: function onComplete() {
            this.currentValue = this.to;
            _get(Object.getPrototypeOf(TextAnimation.prototype), 'onTick', this).call(this);
            _get(Object.getPrototypeOf(TextAnimation.prototype), 'onComplete', this).call(this);
        }
    }]);

    return TextAnimation;
}(Animation);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GAME_BACKGROUND_LAYOUT = {
    COLORS: {
        GRASS: '#B0EE6C'
    }
};

/**
 * GameBackground class
 */

var GameBackground = function () {
    /**
     * @param {HTMLCanvasElement} canvasElement
     * @param {CanvasRenderingContext2D} context
     */

    function GameBackground(canvasElement, context) {
        _classCallCheck(this, GameBackground);

        this._canvas = canvasElement;
        this._context = context;
    }

    /**
     * Paint the background
     */

    _createClass(GameBackground, [{
        key: 'paint',
        value: function paint() {
            var height = this._canvas.height;
            var width = this._canvas.width;

            this._context.beginPath();
            this._context.fillStyle = GAME_BACKGROUND_LAYOUT.COLORS.GRASS;
            this._context.rect(0, height - 50, width, height);
            this._context.fill();
            this._context.closePath();
        }
    }]);

    return GameBackground;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameProfile = function GameProfile() {
  _classCallCheck(this, GameProfile);
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * HuntGame class
 */

var HuntGame = function () {
    /**
     * Constructor HuntGame
     * @param {Number} height
     * @param {Number} width
     * @param {Object} [style]
     */

    function HuntGame(height, width) {
        var style = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, HuntGame);

        this._height = height;
        this._width = width;
        this._style = style;
        this._canvas = null;
        this._context = null;
        this._profiles = [];
    }

    /**
     * Initialize the game
     * @param rootElement
     */

    _createClass(HuntGame, [{
        key: 'init',
        value: function init(rootElement) {
            var canvas = document.createElement('canvas');

            canvas.height = this._height;
            canvas.width = this._width;
            DomHelper.attachStyle(canvas, this._style);

            rootElement.appendChild(canvas);

            this._canvas = canvas;
            this._context = canvas.getContext('2d');
            this._background = new GameBackground(this._canvas, this._context);

            this.repaint();
        }
    }, {
        key: 'repaint',
        value: function repaint() {
            this._context.clearRect(0, 0, this._width, this._height);
            this._background.paint();

            this._profiles.forEach(paintProfile);

            /**
             * Paint a profile/target on the canvas
             * @param {GameProfile} profile
             */
            function paintProfile(profile) {}
        }
    }]);

    return HuntGame;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RgbColor = function () {
    /**
     * RgbColor Constuctor
     * @param {Number} red
     * @param {Number} green
     * @param {Number} blue
     * @constructor
     */

    function RgbColor(red, green, blue) {
        _classCallCheck(this, RgbColor);

        this.red = parseInt(red, 10);
        this.green = parseInt(green, 10);
        this.blue = parseInt(blue, 10);
    }

    /**
     * toString method
     * @override
     */

    _createClass(RgbColor, [{
        key: 'toString',
        value: function toString() {
            return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ');';
        }

        /**
         * Create rgbColor from hexString
         * @param {String} hexString
         * @returns {RgbColor}
         */

    }], [{
        key: 'fromHex',
        value: function fromHex(hexString) {
            var hexStringLength = hexString.length;

            if (hexString.indexOf('#') === 0) {
                hexString = hexString.substr(1, hexStringLength - 1);
            }

            if (hexString.length === 3) {
                hexString = hexString.split('').map(function (tint) {
                    return '' + tint + tint;
                }).join('');
            }

            var splittedHex = hexString.match(/.{2}/g);

            if (Array.isArray(splittedHex) && splittedHex.length === 3) {
                var decimalColors = splittedHex.map(function (colorHex) {
                    return parseInt(colorHex, 16);
                });

                return new (Function.prototype.bind.apply(RgbColor, [null].concat(_toConsumableArray(decimalColors))))();
            } else {
                throw new Error(hexString + ' is not a valid hex color value');
            }
        }
    }]);

    return RgbColor;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timeline = function () {
    /**
     * Timeline constructor
     * @constructor
     */

    function Timeline() {
        _classCallCheck(this, Timeline);

        // 30 fps
        this.tick = parseInt(1000 / 30, 10);
        this.items = [];

        this._selectedIndex = 0;
        this._timelineMapping = {};
        this._endTimeOfSequence = 0;
    }

    /**
     * Add an item to the timeline
     * @param {Number} from
     * @param {Number} to
     * @param {Animation} animation
     * @cascade
     */

    _createClass(Timeline, [{
        key: 'add',
        value: function add(from, to, animation) {
            if (typeof from !== 'number') {
                throw new Error(from + ' is not a valid start time.');
            }

            if (typeof to !== 'number') {
                throw new Error(to + ' is not a valid end time.');
            }

            if (!(animation instanceof Animation)) {
                throw new Error(animation + ' is not a valid end time.');
            }

            return this.insert([[from, to, animation]]);
        }

        /**
         * Insert a sequence of timeline data
         * @param {Array.<Array>} sequence
         * @cascade
         */

    }, {
        key: 'insert',
        value: function insert(sequence) {
            var timelineVm = this;
            var i = 0;

            sequence.forEach(cacheHashMapForTimeline);

            this.items.sort(function (a, b) {
                return a.from > b.from;
            });
            this._endTimeOfSequence = i;

            return this;

            /**
             * Cache a hash map of the timeline moments to optimize the interval
             */
            function cacheHashMapForTimeline(sequenceItem) {
                var from = sequenceItem[0];
                var to = sequenceItem[1];
                var animation = sequenceItem[2];

                timelineVm.items.push(sequenceItem);

                var indexOfItem = timelineVm.items.length - 1;

                for (i = from - from % timelineVm.tick; i <= to; i += timelineVm.tick) {
                    if (typeof timelineVm._timelineMapping[i] !== 'undefined' && Array.isArray(timelineVm._timelineMapping[i])) {
                        timelineVm._timelineMapping[i].push(indexOfItem);
                    } else {
                        timelineVm._timelineMapping[i] = [indexOfItem];
                    }
                }
            }
        }

        /**
         * Start the timeline sequence
         * @cascade
         */

    }, {
        key: 'start',
        value: function start() {
            var timelineVm = this;
            var currentTick = 0;

            this._interval = setInterval(eachTick, timelineVm.tick);

            return this;

            /**
             * Method gets called on each tick of the interval
             */
            function eachTick() {
                var indexesOfSequenceItems = timelineVm._timelineMapping[currentTick];

                if (typeof indexesOfSequenceItems !== 'undefined' && Array.isArray(indexesOfSequenceItems)) {
                    indexesOfSequenceItems.forEach(callAnimationOfSequenceItem);
                }

                currentTick += timelineVm.tick;

                if (currentTick > timelineVm._endTimeOfSequence) {
                    clearInterval(timelineVm._interval);
                    timelineVm._timelineMapping = {};
                    timelineVm.items = {};
                }
            }

            /**
             * Call the onTick of the animation related to the sequenceItem given
             * @param {Number} sequenceItemIndex
             */
            function callAnimationOfSequenceItem(sequenceItemIndex) {
                var sequenceItem = timelineVm.items[sequenceItemIndex];
                var from = sequenceItem[0];
                var to = sequenceItem[1];
                var animation = sequenceItem[2];

                if (!(animation instanceof Animation)) {
                    throw new Error(animation + ' is not an Animation');
                }

                var percentage = (currentTick - from) / (to - from);
                animation.onTick(percentage);

                if (currentTick > to - timelineVm.tick) {
                    animation.onComplete();
                }
            }
        }
    }]);

    return Timeline;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Helper methods for DOM manipulation
 */

var DomHelper = function () {
    function DomHelper() {
        _classCallCheck(this, DomHelper);
    }

    _createClass(DomHelper, null, [{
        key: 'attachStyle',

        /**
         * Attach style properties to a DOM element
         * @param {HTMLElement} element
         * @param {Object} styleProps
         */
        value: function attachStyle(element, styleProps) {
            var originalStyleString = element.getAttribute('style') || '';
            var allProps = {};

            if (originalStyleString.trim() === '') {
                allProps = styleProps;
            } else {
                originalStyleString.split(';').filter(function (declaration) {
                    return declaration.trim() !== '';
                }).map(function (declaration) {
                    return declaration.split(':').map(function (prop) {
                        return prop.trim();
                    });
                }).forEach(function (property) {
                    return allProps[dashToCamel(property[0])] = property[1];
                });

                Object.keys(styleProps).forEach(function (propName) {
                    if (styleProps.hasOwnProperty(propName)) {
                        allProps[dashToCamel(propName)] = styleProps[propName];
                    }
                });
            }

            var styleString = Object.keys(allProps).filter(function (propName) {
                return allProps.hasOwnProperty(propName);
            }).map(function (propName) {
                return camelToDash(propName) + ':' + allProps[propName];
            }).join(';');

            element.setAttribute('style', styleString);

            /**
             * Convert camel case format to dash CSS format
             * @param {String} value
             */
            function camelToDash(value) {
                var CAMEL_REGEX = /(^[a-z]+)|([A-Z]([a-z])+)/g;
                var camelMatches = value.match(CAMEL_REGEX);

                return camelMatches.map(function (camelMatch) {
                    return camelMatch.toLowerCase();
                }).join('-');
            }

            /**
             * Convert dash CSS format to camel case format
             * @param {String} value
             */
            function dashToCamel(value) {
                var valueParts = value.split('-');

                return valueParts[0] + value.split('-').filter(function (valuePart) {
                    return valuePart !== valueParts[0];
                }).map(function (valuePart) {
                    return '' + valuePart[0].toUpperCase() + valuePart.substring(1, valuePart.length);
                }).join('');
            }
        }
    }]);

    return DomHelper;
}();
'use strict';

/**
 * @author Jakob Kerkhove
 * @description Code example for job application
 */
SparkCentral.call({}, window);

function SparkCentral(window) {
    this.elements = cacheElements();
    this.design = initDefaultDesign.call(this);
    this.timeline = initTimeline.call(this);

    this.startHunting = startHunting;

    this.elements.homePrimaryButton.addEventListener('click', this.startHunting.bind(this));

    /**
     * Cache all the elements needed
     */
    function cacheElements() {
        var elements = {};

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
    function initDefaultDesign() {
        var SPARK_CENTRAL_BLUE = '#468FDC';
        var DARK_BLUE = '#3358A2';

        var design = {};

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
    function initTimeline() {
        var timeline = new Timeline();

        timeline.insert(ANIMATION_SEQUENCE(this.design, this.elements));
        timeline.start();

        return timeline;
    }

    function startHunting() {
        var top = '150px';
        var left = Math.round(0.1 * window.innerWidth) + 'px';
        var position = 'absolute';
        var border = '1px #fff solid';
        var borderRadius = '3px';
        var backgroundColor = this.design.colors.blue;
        var height = window.innerHeight - 200;
        var width = window.innerWidth * 0.8;

        var huntGame = new HuntGame(height, width, { top: top, left: left, position: position, border: border, borderRadius: borderRadius, backgroundColor: backgroundColor });

        DomHelper.attachStyle(this.elements.homeContainer, { visibility: 'hidden' });
        huntGame.init(this.elements.homeJumbotron);
    }
}