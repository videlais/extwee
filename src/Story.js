import { name, version } from '../package.json';
import Passage from './Passage.js';
/**
 * @class Story
 * @module Story
 */
export default class Story {
  /**
   * Name
   *
   * @private
   */
  #_name = 'Unknown';

  /**
   * Internal IFID
   *
   * @private
   */
  #_IFID = ''

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
  #_zoom = '';

  /**
   * Internal state metadata
   *
   * @private
   */
  #_start = null;

  /**
   * Passages
   *
   * @private
   */
  #_passages = [];

  /**
   * UserScript Passage
   *
   * @private
   */
  #_scriptPassage = null;

  /**
   * UserStylesheet Passage
   *
   * @private
   */
  #_stylesheetPassage = null;

  /**
   * StoryTitle Passage
   *
   * @private
   */
  #_storyTitlePassage = null;

  /**
   * StoryAuthor Passage
   *
   * @private
   */
  #_storyAuthorPassage = null;

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
   * @function Story
   * @class
   */
  constructor () {
    // Store the creator and version
    this.#_creator = name;
    this.#_creatorVersion = version;
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
   * Name
   *
   * @public
   * @memberof Story
   * @returns {string} Name
   */
  get name () { return this.#_name; }

  /**
   * @param {string} n - Replacement name
   */
  set name (n) {
    if (typeof n === 'string') {
      this.#_name = n;
    } else {
      throw new Error('Name must be a String!');
    }
  }

  /**
   * Zoom level
   *
   * @public
   * @memberof Story
   * @returns {string} Zoom level
   */
  get zoom () { return this.#_zoom; }

  /**
   * @param {string} n - Replacement zoom level
   */
  set zoom (n) {
    if (typeof n === 'string') {
      this.#_zoom = n;
    } else {
      throw new Error('Zoom level must be a String!');
    }
  }

  /**
   * Start passage
   *
   * @public
   * @memberof Story
   * @returns {Passage|null} Passage or null
   */
  get start () { return this.#_start; }

  /**
   * @param {Passage} p - Replacement start passage
   */
  set start (p) {
    if (p instanceof Passage) {
      this.#_start = p;
    } else {
      throw new Error('Start passage must be an instance of Passage!');
    }
  }

  /**
   * UserScript passage
   *
   * @public
   * @memberof Story
   * @returns {Passage|null} Passage or null
   */
  get scriptPassage () { return this.#_scriptPassage; }

  /**
   * @param {Passage} p - Replacement UserScript passage
   */
  set scriptPassage (p) {
    if (p instanceof Passage) {
      this.#_scriptPassage = p;
    } else {
      throw new Error('UserScript passage must be an instance of Passage!');
    }
  }

  /**
   * UserStylesheet passage
   *
   * @public
   * @memberof Story
   * @returns {Passage|null} Passage or null
   */
  get stylesheetPassage () { return this.#_stylesheetPassage; }

  /**
   * @param {Passage} p - Replacement UserStylesheet passage
   */
  set stylesheetPassage (p) {
    if (p instanceof Passage) {
      this.#_stylesheetPassage = p;
    } else {
      throw new Error('UserStylesheet passage must be an instance of Passage!');
    }
  }

  /**
   * StoryTitle passage
   *
   * @public
   * @memberof Story
   * @returns {Passage|null} Passage or null
   */
  get storyTitlePassage () { return this.#_storyTitlePassage; }

  /**
   * @param {Passage} p - Replacement UserStylesheet passage
   */
  set storyTitlePassage (p) {
    if (p instanceof Passage) {
      this.#_storyTitlePassage = p;
    } else {
      throw new Error('StoryTitle passage must be an instance of Passage!');
    }
  }

  /**
   * StoryAuthor passage
   *
   * @public
   * @memberof Story
   * @returns {Passage|null} Passage or null
   */
  get storyAuthorPassage () { return this.#_storyAuthorPassage; }

  /**
   * @param {Passage} p - Replacement UserStylesheet passage
   */
  set storyAuthorPassage (p) {
    if (p instanceof Passage) {
      this.#_storyAuthorPassage = p;
    } else {
      throw new Error('StoryAuthor passage must be an instance of Passage!');
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
        // Push the passage to the array
        this.#_passages.push(p);
      } else {
        // Warn user
        // console.warn('Ignored passage with same name as existing one!');
      }
    } else {
      // We can only add passages to array
      throw new Error('Can only add Passages to the story!');
    }
  }

  /**
   * Remove a passage from the story
   *
   * @public
   * @function removePassage
   * @memberof Story
   * @param {Passage} p - Passage to remove
   */
  removePassage (p) {
    // Check if passed argument is a Passage
    if (p instanceof Passage) {
      // Filter out any passages with the same hash as argument
      this.#_passages = this.#_passages.filter((passage) => passage.hash !== p.hash);
    } else {
      // We can only remove passages
      throw new Error('Must pass Passage to compare!');
    }
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
