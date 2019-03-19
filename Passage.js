/**
 * @class Passage
 * @module Passage
 */
class Passage {
	/**
     * @method Passage
     * @constructor
     */
    constructor (name = "", tags = [], metadata = {}, text = "") {
        this.name = name;
        this.tags = tags
        this.metadata = metadata;
        this.text = text;
    }

}

module.exports = Passage;
