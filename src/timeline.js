/**
 * Timeline for the application
 * @constructor
 */
function Timeline ()
{
    // 30 fps
    this.tick = 1000 / 30;
    this.items = {};
}

Timeline.prototype = {

    /**
     * Add behaviour to the timeline
     * @param {Number} when [seconds]
     * @param {Function} callback
     */
    add (when, callback)
    {
        if (typeof this.items[when] === 'undefined') {
            this.items[when] = [ callback ];
        }
        else {
            this.items.push(callback);
        }
    },

    /**
     * Start the timeline sequence
     */
    start ()
    {
        const timelineVM = this;
        let currentTick = 0;

        timelineVM._interval = setInterval(timelineInterval, timelineVM.tick);

        function timelineInterval ()
        {
            const currentFrameActions = timelineVM[currentTick];

            if (
                typeof currentFrameActions !== 'undefined' &&
                Array.isArray(currentFrameActions) &&
                currentFrameActions.length > 0
            ) {
                currentFrameActions.forEach(action => action.call(timelineVM));
            }

            currentTick += timelineVM.tick;
        }
    }
};