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

      // Borrowed from Underscore
      // https://github.com/jashkenas/underscore/blob/master/underscore.js#L1319-L1323
      let isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
      };

      if(isObject(object) ) {

        this.name = object.name || null;
        this.version = object.version || null;
        this.description = object.description || null;
        this.author = object.author || null;
        this.image = object.image || null;
        this.url = object.url || null;
        this.license = object.license || null;
        this.proofing = object.proofing || null;
        this.source = object.source || null;

      } else {

        throw new Error("Expected JSON object!");

      }

    }

}

module.exports = StoryFormat;
