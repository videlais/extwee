/**
 * @class Passage
 * @module Passage
 */
class Passage {
	/**
     * @method Passage
     * @constructor
     */
    constructor (name = "", tags = [], metadata = {}, text = "", pid = 1) {
        this.name = name;
        this.tags = tags;
        this.metadata = metadata;
        this.text = text;
        this.pid = pid;
    }

}

module.exports = Passage;
