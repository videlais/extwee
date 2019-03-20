/**
 * @class StoryFormat
 * @module StoryFormat
 */
class StoryFormat {
	/**
     * @method StoryFormat
     * @constructor
     */
    constructor (object) {
        this.name = object.name;
        this.version = object.version;
        this.description = object.description;
        this.author = object.author;
        this.image = object.image;
        this.url = object.url;
        this.license = object.license;
        this.proofing = object.proofing;
        this.source = object.source;
    }

}

module.exports = StoryFormat;
