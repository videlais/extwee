/**
 * @class StoryFormat
 * @module StoryFormat
 */
class StoryFormat {
  /**
   * @function StoryFormat
   * @class
   * @param {object} object - Object literal to become StoryFormat object
   */
  constructor (object) {
    if (typeof object === 'object') {
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
      // Set all properties to null
      this.name = null;
      this.version = null;
      this.description = null;
      this.author = null;
      this.image = null;
      this.url = null;
      this.license = null;
      this.proofing = null;
      this.source = null;
    }
  }
}

module.exports = StoryFormat;
