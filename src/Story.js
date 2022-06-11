import Passage from './Passage.js';

const name = 'extwee';
const version = '2.0.4';

/**
 * @class Story
 * @module Story
 */
export default class Story {
  /**
   * Internal name of story
   *
   * @private
   */
  #_name = '';

  /**
   * Internal start
   *
   * @private
   */
  #_start = '';

  /**
   * Internal IFID
   *
   * @private
   */
  #_IFID = '';

  /**
   * Internal story format
   *
   * @private
   */
  #_format = '';

  /**
   * Internal version of story format
   */
  #_formatVersion = '';

  /**
   * Internal zoom level
   */
  #_zoom = 0;

  /**
   * Passages
   *
   * @private
   */
  #_passages = [];

  /**
   * Creator
   *
   * @private
   */
  #_creator = '';

  /**
   * CreatorVersion
   *
   * @private
   */
  #_creatorVersion = '';

  /**
   * Metadata
   *
   * @private
   */
  #_metadata = null;

  /**
   * Tag Colors
   *
   * @private
   */
  #_tagColors = {};

  /**
   * Internal PID counter
   *
   * @private
   */
  #_PIDCounter = 1;

  /**
   * @function Story
   * @class
   */
  constructor () {
    // Store the creator and version
    this.#_creator = name;
    this.#_creatorVersion = version;
    // Set metadata to an object
    this.#_metadata = {};
  }

  /**
   * Each story has a name
   *
   * @public
   * @readonly
   * @memberof Story
   * @returns {string} Name
   */
  get name () { return this.#_name; }

  /**
   * @param {string} a - Replacement story name
   */
  set name (a) {
    if (typeof a === 'string') {
      this.#_name = a;
    } else {
      throw new Error('Story name must be a string');
    }
  }

  /**
   * Tag Colors object (each property is a tag and its color)
   *
   * @public
   * @readonly
   * @memberof Story
   * @returns {object} tag colors array
   */
  get tagColors () { return this.#_tagColors; }

  /**
   * @param {object} a - Replacement tag colors
   */
  set tagColors (a) {
    if (a instanceof Object) {
      this.#_tagColors = a;
    } else {
      throw new Error('Tag colors must be an object!');
    }
  }

  /**
   * Interactive Fiction ID (IFID) of Story
   *
   * @public
   * @readonly
   * @memberof Story
   * @returns {string} IFID
   */
  get IFID () { return this.#_IFID; }

  /**
   * @param {string} i - Replacement IFID
   */
  set IFID (i) {
    if (typeof i === 'string') {
      this.#_IFID = i;
    } else {
      throw new Error('IFID must be a String!');
    }
  }

  /**
   * Name of start passage
   *
   * @public
   * @readonly
   * @memberof Story
   * @returns {string} start
   */
  get start () { return this.#_start; }

  /**
   * @param {string} s - Replacement start
   */
  set start (s) {
    if (typeof s === 'string') {
      this.#_start = s;
    } else {
      throw new Error('start (passage name) must be a String!');
    }
  }

  /**
   * Story format version of Story
   *
   * @public
   * @readonly
   * @memberof Story
   * @returns {string} story format version
   */
  get formatVersion () { return this.#_formatVersion; }

  /**
   * @param {string} f - Replacement format version
   */
  set formatVersion (f) {
    if (typeof f === 'string') {
      this.#_formatVersion = f;
    } else {
      throw new Error('Story format version must be a String!');
    }
  }

  /**
   * Metadata of Story
   *
   * @public
   * @readonly
   * @memberof Story
   * @returns {object} metadata of story
   */
  get metadata () { return this.#_metadata; }

  /**
   * @param {object} o - Replacement metadata
   */
  set metadata (o) {
    if (typeof o === 'object') {
      this.#_metadata = o;
    } else {
      throw new Error('Story metadata must be Object!');
    }
  }

  /**
   * Story format of Story
   *
   * @public
   * @readonly
   * @memberof Story
   * @returns {string} format
   */
  get format () { return this.#_format; }

  /**
   * @param {string} f - Replacement format
   */
  set format (f) {
    if (typeof f === 'string') {
      this.#_format = f;
    } else {
      throw new Error('Story format must be a String!');
    }
  }

  /**
   * Program used to create Story
   *
   * @public
   * @memberof Story
   * @returns {string} Creator Program
   */
  get creator () { return this.#_creator; }

  /**
   * @param {string} c - Creator Program of Story
   */
  set creator (c) {
    if (typeof c === 'string') {
      this.#_creator = c;
    } else {
      throw new Error('Creator must be String');
    }
  }

  /**
   * Version used to create Story
   *
   * @public
   * @memberof Story
   * @returns {string} Version
   */
  get creatorVersion () { return this.#_creatorVersion; }

  /**
   * @param {string} c - Version of creator program
   */
  set creatorVersion (c) {
    if (typeof c === 'string') {
      this.#_creatorVersion = c;
    } else {
      throw new Error('Creator version must be a string!');
    }
  }

  /**
   * Zoom level
   *
   * @public
   * @memberof Story
   * @returns {number} Zoom level
   */
  get zoom () { return this.#_zoom; }

  /**
   * @param {number} n - Replacement zoom level
   */
  set zoom (n) {
    if (typeof n === 'number') {
      // Parse float with a fixed length and then force into Number
      this.#_zoom = Number(Number.parseFloat(n).toFixed(2));
    } else {
      throw new Error('Zoom level must be a Number!');
    }
  }

  /**
   * Add a passage to the story
   *
   * @public
   * @function addPassage
   * @memberof Story
   * @param {Passage} p - Passage to add to Story
   */
  addPassage (p) {
    // Check if passed argument is a Passage
    if (p instanceof Passage) {
      // Does this passage already exist in the collection?
      if (this.getPassageByName(p.name) === null) {
        // StoryData is the only passage with special parsing needs.
        // All other passages are added to the internal passages array.
        if (p.name === 'StoryData') {
          // Try to parse JSON
          try {
            // Attempt to parse storyData JSON
            const metadata = JSON.parse(p.text);

            // IFID
            if (Object.prototype.hasOwnProperty.call(metadata, 'ifid')) {
              this.IFID = metadata.ifid;
            }

            // format
            if (Object.prototype.hasOwnProperty.call(metadata, 'format')) {
              this.format = metadata.format;
            }

            // formatVersion
            if (Object.prototype.hasOwnProperty.call(metadata, 'formatVersion')) {
              this.formatVersion = metadata.formatVersion;
            }

            // zoom
            if (Object.prototype.hasOwnProperty.call(metadata, 'zoom')) {
              this.zoom = metadata.zoom;
            }

            // start
            if (Object.prototype.hasOwnProperty.call(metadata, 'start')) {
              this.start = metadata.start;
            }

            // tag colors
            if (Object.prototype.hasOwnProperty.call(metadata, 'tag-colors')) {
              this.tagColors = metadata['tag-colors'];
            }
          } catch (event) {
            // Ignore errors
          }
        } else {
          // Look for Start
          if (p.name === 'Start' && this.start === '') {
            // Set Start as starting passage (unless overwritten by start property)
            this.start = 'Start';
          }

          // Test for default value.
          // (This might occur if using Story directory
          //  outside of using HTMLParser or TweeParser.)
          if (p.pid === -1) {
            // Set the internal counter.
            p.pid = this.#_PIDCounter;
            // Update the internal counter.
            this.#_PIDCounter++;
          }

          // Push the passage to the array
          this.#_passages.push(p);
        }
      } else {
        // Warn user
        console.warn('Ignored passage with same name as existing one!');
      }
    } else {
      // We can only add passages to array
      throw new Error('Can only add Passages to the story!');
    }
  }

  /**
   * Remove a passage from the story by name
   *
   * @public
   * @function removePassage
   * @memberof Story
   * @param {string} name - Passage name to remove
   */
  removePassage (name) {
    this.#_passages = this.#_passages.filter(passage => passage.name !== name);
  }

  /**
   * Find passages by tag
   *
   * @public
   * @function getPassagesByTag
   * @memberof Story
   * @param {string} t - Passage name to search for
   * @returns {Array} Return array of passages
   */
  getPassagesByTag (t) {
    // Look through passages
    return this.#_passages.filter((passage) => {
      // Look through each passage's tags
      return passage.tags.some((tag) => t === tag);
    });
  }

  /**
   * Find passage by name
   *
   * @public
   * @function getPassageByName
   * @memberof Story
   * @param {string} name - Passage name to search for
   * @returns {Passage | null} Return passage or null
   */
  getPassageByName (name) {
    // Look through passages
    const results = this.#_passages.find((passage) => passage.name === name);
    // Return entry or null, if not found
    return results !== undefined ? results : null;
  }

  /**
   * Find passage by PID
   *
   * @public
   * @function getPassageByPID
   * @memberof Story
   * @param {number} pid - Passage PID to search for
   * @returns {Passage | null} Return passage or null
   */
  getPassageByPID (pid) {
    // Look through passages
    const results = this.#_passages.find((passage) => passage.pid === pid);
    // Return passages or null
    return results !== undefined ? results : null;
  }

  /**
   * Size (number of passages).
   * Does not include StoryAuthor, StoryTitle, UserScript, or UserStylesheet passages
   *
   * @public
   * @function size
   * @memberof Story
   * @returns {number} Return number of passages
   */
  size () {
    return this.#_passages.length;
  }

  /**
   * forEach-style iterator of passages in Story
   *
   * @public
   * @function forEach
   * @memberof Story
   * @param {Function} callback - Callback function
   */
  forEach (callback) {
    // Check if argument is a function
    if (typeof callback !== 'function') {
      // Throw error
      throw new Error('Callback must be a function!');
    }

    // Use internal forEach
    this.#_passages.forEach((element, index) => {
      // Call callback function with element and index
      callback(element, index);
    });
  }
}
