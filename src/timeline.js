class Timeline
{
    /**
     * Timeline constructor
     * @constructor
     */
    constructor ()
    {
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
    add (from, to, animation)
    {
        if (typeof from !== 'number') {
            throw new Error(`${from} is not a valid start time.`);
        }

        if (typeof to !== 'number') {
            throw new Error(`${to} is not a valid end time.`);
        }

        if (!(animation instanceof Animation)) {
            throw new Error(`${animation} is not a valid end time.`);
        }

        return this.insert([ [ from, to, animation ] ]);
    }

    /**
     * Insert a sequence of timeline data
     * @param {Array.<Array>} sequence
     * @cascade
     */
    insert (sequence)
    {
        const timelineVm = this;
        let i = 0;

        sequence.forEach(cacheHashMapForTimeline);

        this.items.sort((a, b) => a.from > b.from);
        this._endTimeOfSequence = i;

        return this;

        /**
         * Cache a hash map of the timeline moments to optimize the interval
         */
        function cacheHashMapForTimeline (sequenceItem)
        {
            const from = sequenceItem[0];
            const to = sequenceItem[1];
            const animation = sequenceItem[2];

            timelineVm.items.push(sequenceItem);

            const indexOfItem = timelineVm.items.length - 1;

            for (i = from - from % timelineVm.tick; i <= to; i += timelineVm.tick) {
                if (
                    typeof timelineVm._timelineMapping[i] !== 'undefined' &&
                    Array.isArray(timelineVm._timelineMapping[i])
                ) {
                    timelineVm._timelineMapping[i].push(indexOfItem);
                }
                else {
                    timelineVm._timelineMapping[i] = [ indexOfItem ];
                }
            }
        }
    }

    /**
     * Start the timeline sequence
     * @cascade
     */
    start ()
    {
        const timelineVm = this;
        let currentTick = 0;

        this._interval = setInterval(eachTick, timelineVm.tick);

        return this;

        /**
         * Method gets called on each tick of the interval
         */
        function eachTick ()
        {
            const indexesOfSequenceItems = timelineVm._timelineMapping[currentTick];

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
        function callAnimationOfSequenceItem (sequenceItemIndex)
        {
            const sequenceItem = timelineVm.items[sequenceItemIndex];
            const from = sequenceItem[0];
            const to = sequenceItem[1];
            const animation = sequenceItem[2];

            if (!(animation instanceof Animation)) {
                throw new Error(`${animation} is not an Animation`);
            }

            const percentage = (currentTick - from) / (to - from);
            animation.onTick(percentage);

            if (currentTick > to - timelineVm.tick) {
                animation.onComplete();
            }
        }
    }
}