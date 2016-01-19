/**
 * @author Jakob Kerkhove (@dejakob)
 * @description
 *  Code example for my Job application at SparkCentral
 *  Go to http://www.sparkcentral.com/ and paste all code into the console.
 *  Uncompiled version: http://github.com/dejakob/sparkcentral
 */
"use strict";
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ANIMATION_TYPE = {
    COLOR: 'color'
};

var Animation = function () {
    /**
     * Animation constructor
     * @param {Object} [options]
     *  @param {String} [options.type]
     *  @param {Function} [options.onChange]
     */

    function Animation() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Animation);

        this.type = options.type;
        this.onChange = options.onChange;
        this.currentValue = null;
    }

    _createClass(Animation, [{
        key: 'onTick',
        value: function onTick() {
            if (typeof this.onChange === 'function') {
                this.onChange(this.currentValue);
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
 *  @param {Number} options.duration
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
            return 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ');';
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
            }
        }
    }]);

    return Timeline;
}();
'use strict';

/**
 * @author Jakob Kerkhove
 * @description Code example for job application
 */
SparkCentral.call({}, window);

function SparkCentral(window) {
    this.design = initDefaultDesign();
    this.elements = cacheElements();
    this.timeline = initTimeline.call(this);

    /**
     * Cache all the elements needed
     */
    function cacheElements() {
        var elements = {};

        elements.mainHeader = document.querySelector('.main-header');
        elements.homeJumbotron = document.querySelector('.jumbotron.home');

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

        return design;
    }

    /**
     * Initialize the timeline
     * @returns {Timeline}
     */
    function initTimeline() {
        var _this = this;

        var timeline = new Timeline();
        var animationSequence = [[2000, 3000, new ColorAnimation({
            from: this.design.colors.blue,
            to: this.design.colors.darkBlue,
            onChange: function onChange(color) {
                _this.elements.homeJumbotron.innerHTML = color;console.log('jumbo', color, _this.elements.homeJumbotron);
            }
        })]];

        timeline.insert(animationSequence);
        timeline.start();

        return timeline;
    }
}