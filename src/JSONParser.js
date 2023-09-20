import Story from './Story.js';
import StoryFormat from './StoryFormat.js';
import Passage from './Passage.js';

export default class JSONParser {
  /**
   * Import JSON string and return Story object.
   * @public
   * @static
   * @function toStory
   * @param {string} jsonString - JSON string to convert to Story.
   * @returns {Story} Story object.
   */
  static toStory (jsonString) {
    // Create default Story.
    const s = new Story();

    // Create future object.
    let result = {};

    // Try to parse the string.
    try {
      result = JSON.parse(jsonString);
    } catch (error) {
      throw new Error('Invalid JSON!');
    }

    // Name
    if (Object.prototype.hasOwnProperty.call(result, 'name')) {
      // Convert to String (if not String).
      s.name = String(result.name);
    }

    // Start Passage
    if (Object.prototype.hasOwnProperty.call(result, 'start')) {
      // Convert to String (if not String).
      s.start = String(result.start);
    }

    // IFID
    if (Object.prototype.hasOwnProperty.call(result, 'ifid')) {
      // Convert to String (if not String).
      // Enforce the uppercase rule of Twine 2 and Twee 3.
      s.IFID = String(result.ifid).toUpperCase();
    }

    // Format
    if (Object.prototype.hasOwnProperty.call(result, 'format')) {
      // Convert to String (if not String).
      s.format = String(result.format);
    }

    // Format Version
    if (Object.prototype.hasOwnProperty.call(result, 'formatVersion')) {
      // Convert to String (if not String).
      s.formatVersion = String(result.formatVersion);
    }

    // Creator
    if (Object.prototype.hasOwnProperty.call(result, 'creator')) {
      // Convert to String (if not String).
      s.creator = String(result.creator);
    }

    // Creator Version
    if (Object.prototype.hasOwnProperty.call(result, 'creatorVersion')) {
      // Convert to String (if not String).
      s.creatorVersion = String(result.creatorVersion);
    }

    // Zoom
    if (Object.prototype.hasOwnProperty.call(result, 'zoom')) {
      // Set Zoom.
      s.zoom = result.zoom;
    }

    // Tag Colors
    if (Object.prototype.hasOwnProperty.call(result, 'tagColors')) {
      // Set tagColors.
      s.tagColors = result.tagColors;
    }

    // Metadata
    if (Object.prototype.hasOwnProperty.call(result, 'metadata')) {
      // Set metadata.
      s.metadata = result.metadata;
    }

    // Passages
    if (Object.prototype.hasOwnProperty.call(result, 'passages')) {
      // Is this an array?
      if (Array.isArray(result.passages)) {
        // For each passage, convert into Passage objects.
        result.passages.forEach((p) => {
          // Create default passage.
          const newP = new Passage();

          // Does this have a name?
          if (Object.prototype.hasOwnProperty.call(p, 'name')) {
            // Set name.
            newP.name = p.name;
          }

          // Does this have tags?
          if (Object.prototype.hasOwnProperty.call(p, 'tags')) {
            // Set tags.
            newP.tags = p.tags;
          }

          // Does this have metadata?
          if (Object.prototype.hasOwnProperty.call(p, 'metadata')) {
            // Set metadata.
            newP.metadata = p.metadata;
          }

          // Does this have text?
          if (Object.prototype.hasOwnProperty.call(p, 'text')) {
            // Set text.
            newP.text = p.text;
          }

          // Add the new passage.
          s.addPassage(newP);
        });
      }
    }

    // Return Story.
    return s;
  }

  /**
   * Import JSON string and return Passage object.
   * @public
   * @static
   * @function toPassage
   * @param {string} jsonString - JSON string to convert to Passage.
   * @returns {Passage} Passage object.
   */
  static toPassage (jsonString) {
    // Create default Passage.
    const p = new Passage();

    // Create future object.
    let result = {};

    // Try to parse the string.
    try {
      result = JSON.parse(jsonString);
    } catch (error) {
      throw new Error('Invalid JSON!');
    }

    // Name?
    if (Object.prototype.hasOwnProperty.call(result, 'name')) {
      // Set name.
      p.name = String(result.name);
    }

    // Tags?
    if (Object.prototype.hasOwnProperty.call(result, 'tags')) {
      // Set tags.
      p.tags = result.tags;
    }

    // Metadata?
    if (Object.prototype.hasOwnProperty.call(result, 'metadata')) {
      // Set metadata.
      p.metadata = result.metadata;
    }

    // Text?
    if (Object.prototype.hasOwnProperty.call(result, 'text')) {
      // Set text.
      p.text = String(result.text);
    }

    // Return Passage.
    return p;
  }

  /**
   * Import JSON string and return StoryFormat object.
   * @public
   * @static
   * @function toPassage
   * @param {string} jsonString - JSON string to convert to StoryFormat.
   * @returns {StoryFormat} StoryFormat object.
   */
  static toStoryFormat (jsonString) {
    // Create default Passage.
    const st = new StoryFormat();

    // Create future object.
    let result = {};

    // Try to parse the string.
    try {
      result = JSON.parse(jsonString);
    } catch (error) {
      throw new Error('Invalid JSON!');
    }

    // Name
    if (Object.prototype.hasOwnProperty.call(result, 'name')) {
      // Set name.
      st.name = result.name;
    }

    // Version
    if (Object.prototype.hasOwnProperty.call(result, 'version')) {
      // Set version.
      st.version = result.version;
    }

    // Description
    if (Object.prototype.hasOwnProperty.call(result, 'description')) {
      // Set description.
      st.description = result.description;
    }

    // Author
    if (Object.prototype.hasOwnProperty.call(result, 'author')) {
      // Set author.
      st.author = result.author;
    }

    // Image
    if (Object.prototype.hasOwnProperty.call(result, 'image')) {
      // Set image.
      st.image = result.image;
    }

    // URL
    if (Object.prototype.hasOwnProperty.call(result, 'url')) {
      // Set URL.
      st.url = result.url;
    }

    // License
    if (Object.prototype.hasOwnProperty.call(result, 'license')) {
      // Set license.
      st.license = result.license;
    }

    // Proofing
    if (Object.prototype.hasOwnProperty.call(result, 'proofing')) {
      // Set proofing boolean.
      st.proofing = result.proofing;
    }

    // Source
    if (Object.prototype.hasOwnProperty.call(result, 'source')) {
      // Set source.
      st.source = result.source;
    }

    // Return StoryFormat object.
    return st;
  }
}
