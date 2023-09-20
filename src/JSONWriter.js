import Story from './Story.js';
import StoryFormat from './StoryFormat.js';
import Passage from './Passage.js';

export default class JSONWriter {
  /**
   * Export Story as JSON string.
   * @public
   * @static
   * @function fromStory
   * @param {Story} storyObj - Story to convert to JSON.
   * @returns {string} JSON string.
   */
  static fromStory (storyObj) {
    if (!(storyObj instanceof Story)) {
      throw new Error('Not a Story object!');
    }

    // Create an initial object for later serialization.
    const s = {
      name: storyObj.name,
      tagColors: storyObj.tagColors,
      ifid: storyObj.IFID,
      start: storyObj.start,
      formatVersion: storyObj.formatVersion,
      metadata: storyObj.metadata,
      format: storyObj.format,
      creator: storyObj.creator,
      creatorVersion: storyObj.creatorVersion,
      zoom: storyObj.zoom,
      passages: []
    };

    // For each passage, convert into simple object.
    storyObj.forEach((p) => {
      s.passages.push({
        name: p.name,
        tags: p.tags,
        metadata: p.metadata,
        text: p.text
      });
    });

    // Return stringified Story object.
    return JSON.stringify(s);
  }

  /**
   * Export Passage as JSON string.
   * @public
   * @static
   * @function fromPassage
   * @param {Passage} passageObj - Passage to convert to JSON.
   * @returns {string} JSON string.
   */
  static fromPassage (passageObj) {
    if (!(passageObj instanceof Passage)) {
      throw new Error('Not a Passage object!');
    }

    // Create an initial object for later serialization.
    const p = {
      name: passageObj.name,
      tags: passageObj.tags,
      metadata: passageObj.metadata,
      text: passageObj.text
    };

    // Return stringified JSON from object.
    return JSON.stringify(p);
  }

  /**
   * Export StoryFormat as JSON string.
   * @public
   * @static
   * @function fromStoryFormat
   * @param {StoryFormat} storyFormatObj - StoryFormat to convert to JSON.
   * @returns {string} JSON string.
   */
  static fromStoryFormat (storyFormatObj) {
    if (!(storyFormatObj instanceof StoryFormat)) {
      throw new Error('Not a StoryFormat object!');
    }

    // Create an initial object for later serialization.
    const s = {
      name: storyFormatObj.name,
      version: storyFormatObj.version,
      description: storyFormatObj.description,
      author: storyFormatObj.author,
      image: storyFormatObj.image,
      url: storyFormatObj.url,
      license: storyFormatObj.license,
      proofing: storyFormatObj.proofing,
      source: storyFormatObj.source
    };

    // Return stringified JSON from object.
    return JSON.stringify(s);
  }
}
