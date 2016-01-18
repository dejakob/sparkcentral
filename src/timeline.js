/**
 * Timeline for the application
 * @constructor
 */
function Timeline ()
{
    this.items = {};
}

Timeline.prototype = {

    /**
     * Add behaviour to the timeline
     * @param when
     * @param callback
     */
    add (when, callback)
    {
        if (typeof this.items[when] === 'undefined') {
            this.items[when] = [ callback ];
        }
        else {
            this.items.push(callback);
        }
    }
};