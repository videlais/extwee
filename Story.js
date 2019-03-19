/**
 * @class Story
 * @module Story
 */
class Story {
	/**
     * @method Story
     * @constructor
     */
    constructor (title = "", metadata = null, passages = []) {
        this.title = title;
        this.metadata = metadata;
        this.passages = passages;
    }

}

module.exports = Story;
