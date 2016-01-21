'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Jakob Kerkhove (@dejakob)
 * @description
 *  Code example for my Job application at SparkCentral
 *  Go to http://www.sparkcentral.com/ and paste all code into the console.
 *  Uncompiled version: http://github.com/dejakob/sparkcentral
 */
var ANIMATION_SEQUENCE = function ANIMATION_SEQUENCE(design, elements) {
    return [[500, 2000, new ColorAnimation({
        from: design.colors.blue,
        to: design.colors.darkBlue,
        onChange: function onChange(backgroundColor) {
            return DomHelper.attachStyle(elements.homeJumbotron, { backgroundColor: backgroundColor });
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
        },
        onComplete: function onComplete() {
            return elements.homeSecondaryButton.parentNode.removeChild(elements.homeSecondaryButton);
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
        to: 'You can help the company by finding the perfect fit...',
        onChange: function onChange(text) {
            return elements.homeParagraph.innerHTML = text;
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
/**
 * Resize Animation constructor
 * @param {Object} [options]
 *  @param {RgbColor} options.from
 *  @param {RgbColor} options.to
 * @extends {Animation}
 * @constructor
 */

var SizeAnimation = function (_Animation2) {
    _inherits(SizeAnimation, _Animation2);

    function SizeAnimation() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, SizeAnimation);

        var VALID_TYPES = ['number', 'string'];

        if (VALID_TYPES.indexOf(_typeof(options.from)) === -1 || VALID_TYPES.indexOf(_typeof(options.to)) === -1) {
            throw new Error('from and to option should be defined to create a resize animation.');
        }

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SizeAnimation).call(this, options));

        _this2.type = ANIMATION_TYPE.SIZE;
        _this2.from = parseInt(options.from, 10);
        _this2.to = parseInt(options.to, 10);
        return _this2;
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

var TextAnimation = function (_Animation3) {
    _inherits(TextAnimation, _Animation3);

    function TextAnimation() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, TextAnimation);

        if (typeof options.from !== 'string' || typeof options.to !== 'string') {
            throw new Error('from and to option should be strings to create a text animation.');
        }

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(TextAnimation).call(this, options));

        _this3.type = ANIMATION_TYPE.TEXT;
        _this3.from = options.from;
        _this3.to = options.to;

        if (_this3.to.length > _this3.from.length) {
            _this3.textDifference = _this3.to.substring(_this3.from.length - 1, _this3.to.length);
            _this3.animationDirection = TEXT_ANIMATION_DIRECTIONS.ADD;
        } else {
            _this3.textDifference = _this3.from.substring(_this3.to.length - 1, _this3.from.length);
            _this3.animationDirection = TEXT_ANIMATION_DIRECTIONS.REMOVE;
        }
        return _this3;
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
         * @static
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
                    return allProps[StringHelper.dashToCamel(property[0])] = property[1];
                });

                Object.keys(styleProps).forEach(function (propName) {
                    if (styleProps.hasOwnProperty(propName)) {
                        allProps[StringHelper.dashToCamel(propName)] = styleProps[propName];
                    }
                });
            }

            var styleString = Object.keys(allProps).filter(function (propName) {
                return allProps.hasOwnProperty(propName);
            }).map(function (propName) {
                return StringHelper.camelToDash(propName) + ':' + allProps[propName];
            }).join(';');

            element.setAttribute('style', styleString);
        }

        /**
         * Create a button (link HTML element)
         * @param {String} link
         * @param {String} description
         * @returns {Element}
         * @static
         */

    }, {
        key: 'createLinkButton',
        value: function createLinkButton(link, description) {
            var webButton = document.createElement('a');

            webButton.setAttribute('class', 'btn btn-secondary');
            webButton.setAttribute('target', '_blank');
            webButton.setAttribute('href', link);
            webButton.innerHTML = description;

            return webButton;
        }
    }]);

    return DomHelper;
}();

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

        if (isNaN(this.red) || isNaN(this.green) || isNaN(this.blue)) {
            throw new Error('All colors should be defined with a number');
        }
    }

    /**
     * toString method
     * @override
     */

    _createClass(RgbColor, [{
        key: 'toString',
        value: function toString() {
            return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
        }

        /**
         * Create rgbColor from colors array
         * @param {Array.<Number>} colors
         */

    }], [{
        key: 'fromArray',
        value: function fromArray(colors) {
            console.log('COLORS', colors);

            if (typeof colors !== 'undefined' || !Array.isArray(colors) || colors.length !== 3 || colors.filter(function (color) {
                return typeof color === 'number' && !isNaN(color);
            }).length !== 3) {
                throw new Error('Could not create RgbColor of ' + colors);
            }

            return new RgbColor(colors[0], colors[1], colors[2]);
        }

        /**
         * Create rgbColor from hexString
         * @param {String} hexString
         * @returns {RgbColor}
         */

    }, {
        key: 'fromHex',
        value: function fromHex(hexString) {
            if (typeof hexString !== 'string') {
                throw new Error('Please enter a string to create a RgbColor');
            }

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
                return RgbColor.fromArray(decimalColors);
            } else {
                throw new Error(hexString + ' is not a valid hex color value');
            }
        }
    }]);

    return RgbColor;
}();
/**
 * Helper methods for String manipulation
 */

var StringHelper = function () {
    function StringHelper() {
        _classCallCheck(this, StringHelper);
    }

    _createClass(StringHelper, null, [{
        key: 'camelToDash',

        /**
         * Convert camel case format to dash CSS format
         * @param {String} value
         * @static
         */
        value: function camelToDash(value) {
            if (typeof value !== 'string') {
                throw new Error(value + ' should be a string.');
            }

            var CAMEL_REGEX = /(^[a-z]+)|([A-Z]([a-z])*)/g;
            var camelMatches = value.match(CAMEL_REGEX);

            if (camelMatches === null || camelMatches.length === 0) {
                throw new Error(value + ' is not a valid string in camelCase.');
            }

            return camelMatches.map(function (camelMatch) {
                return camelMatch.toLowerCase();
            }).join('-');
        }

        /**
         * Convert dash CSS format to camel case format
         * @param {String} value
         * @static
         */

    }, {
        key: 'dashToCamel',
        value: function dashToCamel(value) {
            var valueParts = value.split('-');

            return valueParts[0] + value.split('-').filter(function (valuePart) {
                return valuePart !== valueParts[0];
            }).map(function (valuePart) {
                return '' + valuePart[0].toUpperCase() + valuePart.substring(1, valuePart.length);
            }).join('');
        }
    }]);

    return StringHelper;
}();
/**
 * GameProfile class
 */

var GameProfile = function () {
    /**
     * Constructor for GameProfile
     */

    function GameProfile() {
        var direction = arguments.length <= 0 || arguments[0] === undefined ? GAME_DIRECTION.LTR : arguments[0];
        var speed = arguments.length <= 1 || arguments[1] === undefined ? GAME_DEFAULT_SPEED : arguments[1];

        _classCallCheck(this, GameProfile);

        this.direction = direction;
        this.height = this.width = 50;
        this.x = 0;
        this.y = 0;
        this.speed = speed;
    }

    /**
     * Paint profile on the graphical context
     * @param {CanvasRenderingContext2D} context
     */

    _createClass(GameProfile, [{
        key: 'paint',
        value: function paint(context) {
            context.beginPath();
            context.strokeStyle = '#fff';
            context.drawImage(GAME_PROFILE_IMAGE, this.x, this.y, this.width, this.height);
            context.stroke();
            context.closePath();
        }

        /**
         * Test if x and y are within the profile
         * @param {Number} x
         * @param {Number} y
         */

    }, {
        key: 'hitTest',
        value: function hitTest(x, y) {
            if (this.x < x && this.x + this.width > x) {
                if (this.y < y && this.y + this.height > y) {
                    return true;
                }
            }

            return false;
        }
    }]);

    return GameProfile;
}();

var GAME_PROFILE_IMAGE = new Image();
GAME_PROFILE_IMAGE.src = 'data:image/jpeg;base64,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';
var GAME_FPS = 30;
var GAME_SCORE_NEEDED_TO_WIN = 1000;

var GAME_DIRECTION = {
    LTR: 'left to right',
    RTL: 'right to left'
};

var GAME_LAYOUT = {
    SCORE_BOARD: {
        position: 'absolute',
        color: '#ffffff',
        textAlign: 'right',
        fontSize: '22px'
    }
};

var GAME_STOP_REASON = {
    WIN: true,
    LOOSE: false
};

var GAME_DEFAULT_SPEED = 5;
var GAME_FAST_SPEED = 10;
var GAME_FASTER_SPEED = 20;
var GAME_FASTEST_SPEED = 35;

var GAME_LEVEL = {
    2: new GameProfile(GAME_DIRECTION.LTR),
    8: new GameProfile(GAME_DIRECTION.RTL),
    52: new GameProfile(GAME_DIRECTION.RTL),
    90: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    135: new GameProfile(GAME_DIRECTION.RTL),
    235: new GameProfile(GAME_DIRECTION.LTR),
    255: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    275: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    300: new GameProfile(GAME_DIRECTION.LTR, GAME_FAST_SPEED),
    315: new GameProfile(GAME_DIRECTION.LTR, GAME_FAST_SPEED),
    355: new GameProfile(GAME_DIRECTION.LTR),
    360: new GameProfile(GAME_DIRECTION.RTL),
    370: new GameProfile(GAME_DIRECTION.LTR),
    375: new GameProfile(GAME_DIRECTION.RTL),
    395: new GameProfile(GAME_DIRECTION.RTL),
    400: new GameProfile(GAME_DIRECTION.LTR, GAME_FAST_SPEED),
    405: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    410: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    425: new GameProfile(GAME_DIRECTION.LTR, GAME_FASTER_SPEED),
    440: new GameProfile(GAME_DIRECTION.LTR, GAME_FAST_SPEED),
    455: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    460: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTER_SPEED),
    475: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTER_SPEED),
    495: new GameProfile(GAME_DIRECTION.LTR, GAME_FAST_SPEED),
    585: new GameProfile(GAME_DIRECTION.LTR, GAME_FASTER_SPEED),
    600: new GameProfile(GAME_DIRECTION.LTR, GAME_FASTER_SPEED),
    610: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTER_SPEED),
    625: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTEST_SPEED),
    635: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTEST_SPEED),
    650: new GameProfile(GAME_DIRECTION.LTR, GAME_FAST_SPEED),
    665: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTEST_SPEED),
    685: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTER_SPEED),
    695: new GameProfile(GAME_DIRECTION.LTR),
    730: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTER_SPEED * 2),
    760: new GameProfile(GAME_DIRECTION.LTR),
    780: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    790: new GameProfile(GAME_DIRECTION.RTL, GAME_FAST_SPEED),
    800: new GameProfile(GAME_DIRECTION.RTL, GAME_FASTER_SPEED),
    815: new GameProfile(GAME_DIRECTION.LTR, GAME_FASTEST_SPEED)
};
/**
 * HuntGame class
 */

var HuntGame = function () {
    /**
     * Constructor HuntGame
     * @param {Number} height
     * @param {Number} width
     * @param {Object} [options]
     *  @param {Function} [options.onWin]
     *  @param {Function} [options.onFail]
     * @param {Object} [style]
     */

    function HuntGame(height, width) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var style = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

        _classCallCheck(this, HuntGame);

        this._height = height;
        this._width = width;
        this._top = parseInt(style.top || 0, 10);
        this._left = parseInt(style.left || 0, 10);
        this._style = style;
        this._canvas = null;
        this._context = null;
        this._profiles = [];

        this._options = options;
        this._score = 0;
        this._interval = null;
        this._currentTick = 0;
        this._timesToAddProfile = Object.keys(GAME_LEVEL).map(function (time) {
            return Number(time);
        });
        this._lastProfileTick = this._timesToAddProfile[this._timesToAddProfile.length - 1];
    }

    /**
     * Initialize the game
     * @param {HTMLElement} rootElement
     */

    _createClass(HuntGame, [{
        key: 'init',
        value: function init(rootElement) {
            var gameVM = this;

            this._canvas = addCanvasToDOM();
            this._scoreBoard = addScoreBoardToDOM.call(this);
            this._context = this._canvas.getContext('2d');

            this._canvas.addEventListener('click', this._onClick.bind(this));
            this.repaint();

            /**
             * Add a new canvas element to the DOM
             * @returns {HTMLCanvasElement}
             */
            function addCanvasToDOM() {
                var canvas = document.createElement('canvas');

                canvas.height = gameVM._height;
                canvas.width = gameVM._width;
                DomHelper.attachStyle(canvas, gameVM._style);

                rootElement.appendChild(canvas);

                return canvas;
            }

            function addScoreBoardToDOM() {
                var div = document.createElement('div');
                var style = GAME_LAYOUT.SCORE_BOARD;

                style.top = this._top + 10 + 'px';
                style.right = this._left + 5 + 'px';

                DomHelper.attachStyle(div, style);
                div.innerHTML = this._score;
                rootElement.appendChild(div);

                return div;
            }
        }

        /**
         * Clean and paint frame
         */

    }, {
        key: 'repaint',
        value: function repaint() {
            var gameVM = this;

            this._context.clearRect(0, 0, this._width, this._height);
            this._profiles.forEach(paintProfile);

            /**
             * Paint a profile/target on the canvas
             * @param {GameProfile} profile
             */
            function paintProfile(profile) {
                profile.paint(gameVM._context);
            }
        }

        /**
         * Start the game
         */

    }, {
        key: 'start',
        value: function start() {
            console.log('START THE GAME', this);

            var TICK = Math.round(1000 / GAME_FPS);
            this._interval = setInterval(this._onTick.bind(this), TICK);
        }

        /**
         * Stop the game
         * @param {Boolean} [reason]
         */

    }, {
        key: 'stop',
        value: function stop() {
            var reason = arguments.length <= 0 || arguments[0] === undefined ? GAME_STOP_REASON.LOOSE : arguments[0];

            clearInterval(this._interval);
            this._canvas.removeEventListener('click', this._onClick.bind(this));

            if (reason === GAME_STOP_REASON.LOOSE && typeof this._options.onFail === 'function') {
                this._options.onFail.call(this);
            } else if (reason === GAME_STOP_REASON.WIN && typeof this._options.onWin === 'function') {
                this._options.onWin.call(this);
            }
        }

        /**
         * Destroy the game
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this._canvas.parentNode.removeChild(this._canvas);
            this._scoreBoard.parentNode.removeChild(this._scoreBoard);
            delete this._context;
        }

        /**
         * Tick event for each interval tick
         * @private
         */

    }, {
        key: '_onTick',
        value: function _onTick() {
            var profileToAdd = GAME_LEVEL[this._currentTick];

            if (this._timesToAddProfile.indexOf(this._currentTick) > -1) {
                addNewProfile.call(this);
            }

            if (this._profiles.length > 0) {
                this._profiles.forEach(moveProfile.bind(this));
                this.repaint();
            } else if (this._currentTick > this._lastProfileTick) {
                this.stop();
            }

            this._currentTick++;

            /**
             * Add a new profile to the list of profiles
             */
            function addNewProfile() {
                if (profileToAdd.direction === GAME_DIRECTION.LTR) {
                    profileToAdd.x = -profileToAdd.width;
                } else {
                    profileToAdd.x = this._width + profileToAdd.width;
                }

                profileToAdd.y = Math.round(Math.random() * this._height * 0.8);
                this._profiles.push(profileToAdd);
            }

            /**
             * Move the profile one step in the right direction
             * @param {GameProfile} profile
             */
            function moveProfile(profile) {
                if (profile.direction === GAME_DIRECTION.LTR) {
                    profile.x += profile.speed;

                    if (profile.x > this._width + profile.width) {
                        this._profiles.splice(this._profiles.indexOf(profile), 1);
                    }
                } else {
                    profile.x -= profile.speed;

                    if (profile.x < -profile.width) {
                        this._profiles.splice(this._profiles.indexOf(profile), 1);
                    }
                }
            }
        }

        /**
         * When the canvas gets clicked
         * @param {MouseEvent} eventData
         * @private
         */

    }, {
        key: '_onClick',
        value: function _onClick(eventData) {
            var hitted = false;

            this._profiles.forEach(testHit.bind(this));

            if (hitted) {
                this.repaint();

                console.log(this._score);

                if (this._score >= GAME_SCORE_NEEDED_TO_WIN) {
                    this.stop(GAME_STOP_REASON.WIN);
                }
            }

            function testHit(profile) {
                if (hitted === false && profile.hitTest(-this._left + eventData.clientX, -this._top + eventData.clientY)) {
                    hitted = true;
                    this._score += profile.speed * 10;
                    this._updateScore();
                    this._profiles.splice(this._profiles.indexOf(profile), 1);
                }
            }
        }

        /**
         * Notify the DOM that the score changed
         * @private
         */

    }, {
        key: '_updateScore',
        value: function _updateScore() {
            this._scoreBoard.innerHTML = this._score;
        }
    }]);

    return HuntGame;
}();

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

        /**
         * Stop the timeline sequence
         */

    }, {
        key: 'stop',
        value: function stop() {
            clearInterval(this._interval);
        }
    }]);

    return Timeline;
}();
/**
 * @author Jakob Kerkhove
 * @description Code example for job application
 */

var SparkCentral = function () {
    /**
     * Constructor for SparkCentral class
     * @cascade
     */

    function SparkCentral() {
        _classCallCheck(this, SparkCentral);

        this.elements = null;
        this.design = null;
        this.timeline = null;

        this._cacheElements();
        this._initDefaultDesign();
        this._initTimeline();

        this.elements.homePrimaryButton.addEventListener('click', this.hunt.bind(this));

        Array.prototype.forEach.call(this.elements.allLinks, function (link) {
            link.setAttribute('href', '#');
            link.setAttribute('onclick', '');
        });

        return this;
    }

    /**
     * Cache all the elements needed
     * @private
     */

    _createClass(SparkCentral, [{
        key: '_cacheElements',
        value: function _cacheElements() {
            var elements = {};

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

    }, {
        key: '_initDefaultDesign',
        value: function _initDefaultDesign() {
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

            this.design = design;
        }

        /**
         * Initialize the timeline
         * @private
         */

    }, {
        key: '_initTimeline',
        value: function _initTimeline() {
            var timeline = new Timeline();

            timeline.insert(ANIMATION_SEQUENCE(this.design, this.elements));
            timeline.start();

            this.timeline = timeline;
        }

        /**
         * Hunt for job candidates
         * @cascade
         */

    }, {
        key: 'hunt',
        value: function hunt() {
            var vm = this;

            var top = '150px';
            var left = Math.round(0.1 * window.innerWidth) + 'px';
            var position = 'absolute';
            var border = '1px #fff solid';
            var borderRadius = '3px';
            var cursor = 'pointer';
            var backgroundImage = 'url(http://i.imgur.com/s7GuTWV.jpg)';
            var backgroundSize = 'cover';
            var backgroundPostion = 'center center';
            var backgroundRepeat = 'no-repeat';
            var height = window.innerHeight - 200;
            var width = window.innerWidth * 0.8;

            vm.huntGame = new HuntGame(height, width, {
                onWin: onWin, onFail: onFail
            }, {
                top: top, left: left, position: position, border: border, borderRadius: borderRadius, cursor: cursor,
                backgroundImage: backgroundImage, backgroundSize: backgroundSize, backgroundRepeat: backgroundRepeat, backgroundPostion: backgroundPostion
            });

            DomHelper.attachStyle(vm.elements.homeContainer, { visibility: 'hidden' });
            vm.huntGame.init(vm.elements.homeJumbotron);
            setTimeout(vm.huntGame.start.bind(vm.huntGame), 1000);

            return this;

            /**
             * When the user won the game
             */
            function onWin() {
                destroyGame();
                showWinnersPage();
            }

            /**
             * Game over...
             */
            function onFail() {
                destroyGame();
                showLosersPage();
            }

            /**
             * Clean everything related to the game
             */
            function destroyGame() {
                vm.huntGame.destroy();
                delete vm.huntGame;
            }

            /**
             * Show the winners page
             */
            function showWinnersPage() {

                vm.elements.homeTitle.innerHTML = 'Congratulations! <br />' + 'You found a perfect fit for the job \'Front End Developer\'.';
                vm.elements.homeParagraph.innerHTML = 'Feel free to contact the candidate...';

                var buttonGroup = vm.elements.homeButtonGroup;

                buttonGroup.innerHTML = '';
                buttonGroup.appendChild(DomHelper.createLinkButton('http://dejakob.com/?sparkcentral', 'Web'));
                buttonGroup.appendChild(DomHelper.createLinkButton('http://linkedin.com/in/jakob-kerkhove-4a987281', 'LinkedIN'));
                buttonGroup.appendChild(DomHelper.createLinkButton('http://github.com/dejakob', 'GitHub'));

                DomHelper.attachStyle(vm.elements.homeContainer, { visibility: 'visible' });
            }

            /**
             * Show the winners page
             */
            function showLosersPage() {

                vm.elements.homeTitle.innerHTML = 'Game over!';
                vm.elements.homeParagraph.innerHTML = 'You failed, but remember: <br />' + 'Success is the result of perfection, ' + 'hard work, learning from failure, loyalty, and persistence. (Colin Powell)';

                var buttonGroup = vm.elements.homeButtonGroup;
                var tryAgainButton = document.createElement('a');

                tryAgainButton.setAttribute('class', 'btn btn-primary');
                tryAgainButton.setAttribute('href', '#');
                tryAgainButton.innerHTML = 'Try again';
                tryAgainButton.onclick = function () {
                    return vm.hunt();
                };

                buttonGroup.innerHTML = '';
                buttonGroup.appendChild(tryAgainButton);

                DomHelper.attachStyle(vm.elements.homeContainer, { visibility: 'visible' });
            }
        }
    }]);

    return SparkCentral;
}();
/**
 * Start the application
 */

window.SparkCentralJobApplication = new SparkCentral();