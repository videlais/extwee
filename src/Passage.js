/**
 * @class Passage
 * @module Passage
 */
export default class Passage {
  /**
   * Name of the Passage
   *
   * @private
   */
  #_name = null;

  /**
   * Internal array of tags
   *
   * @private
   */
  #_tags = [];

  /**
   * Internal metadata of passage
   *
   * @private
   */
  #_metadata = {};

  /**
   * Internal text of the passage
   *
   * @private
   */
  #_text = '';

  /**
   * Internal PID of passage
   *
   * @private
   */
  #_pid = -1;

  /**
   * @function Passage
   * @class
   * @param {string} name - Name
   * @param {string} text - Content
   * @param {Array} tags - Tags
   * @param {object} metadata - Metadata
   * @param {number} pid - Passage ID (PID)
   */
  constructor (name = '', text = '', tags = [], metadata = {}, pid = -1) {
    // Set name
    this.name = name;

    // Set tags
    this.tags = tags;

    // Set metadata
    this.metadata = metadata;

    // Sets text
    this.text = text;

    // Sets pid
    this.pid = pid;
  }

  /**
   * Name
   *
   * @public
   * @memberof Passage
   * @returns {string} Name
   */
  get name () { return this.#_name; }

  /**
   * @param {string} s - Name to replace
   */
  set name (s) {
    if (typeof s === 'string') {
      this.#_name = s;
    } else {
      throw new Error('Name must be a String!');
    }
  }

  /**
   * Tags
   *
   * @public
   * @memberof Passage
   * @returns {Array} Tags
   */
  get tags () { return this.#_tags; }

  /**
   * @param {Array} t - Replacement array
   */
  set tags (t) {
    // Test if tags is an array
    if (Array.isArray(t)) {
      this.#_tags = t;
    } else {
      throw new Error('Tags must be an array!');
    }
  }

  /**
   * Metadata
   *
   * @public
   * @memberof Passage
   * @returns {object} Metadata
   */
  get metadata () { return this.#_metadata; }

  /**
   * @param {object} m - Replacement object
   */
  set metadata (m) {
    // Test if metadata was an object
    if (typeof m === 'object') {
      this.#_metadata = m;
    } else {
      throw new Error('Metadata should be an object literal!');
    }
  }

  /**
   * Text
   *
   * @public
   * @memberof Passage
   * @returns {string} Text
   */
  get text () { return this.#_text; }

  /**
   * @param {string} t - Replacement text
   */
  set text (t) {
    // Test if text is a String
    if (typeof t === 'string') {
      this.#_text = t;
    } else {
      throw new Error('Text should be a String!');
    }
  }

  /**
   * Passage ID (PID)
   *
   * @public
   * @memberof Passage
   * @returns {number} Passage ID (PID)
   */
  get pid () { return this.#_pid; }

  /**
   * @param {number} p - Replacement PID
   */
  set pid (p) {
    // Test if PID is a number
    if (Number.isInteger(p)) {
      this.#_pid = p;
    } else {
      throw new Error('PID should be a number!');
    }
  }

  /**
   * Return a String representation
   * 
   * @public
   * @memberof Passage
   * @returns {string} String form of passage
   */
  toString() {
    // Start empty string.
    let content = '';
    // Write the name
    content += `:: ${this.name}`;

    // Test if it has any tags
    if (this.tags.length > 0) {
      // Write output of tags
      content += ` [${this.tags.join(' ')}]`;
    }
    
    // Check if any properties exist
    if(Object.keys(this.metadata).length > 0) {
      // Write out a space and then passage metadata
      content += ` ${JSON.stringify(this.metadata)}`;
    }
          
    // Add newline, text, and two newlines
    content += `\n${this.text}\n\n`;

    // Return string.
    return content;
  }
}
