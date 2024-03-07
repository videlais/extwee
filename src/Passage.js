import { encode } from 'html-entities';

/**
  * Passage class.
  * @class
  * @classdesc Represents a passage in a Twine story.
  * @property {string} name - Name of the passage.
  * @property {Array} tags - Tags for the passage.
  * @property {object} metadata - Metadata for the passage.
  * @property {string} text - Text content of the passage.
  * @method {string} toTwee - Return a Twee representation.
  * @method {string} toJSON - Return JSON representation.
  * @method {string} toTwine2HTML - Return Twine 2 HTML representation.
  * @method {string} toTwine1HTML - Return Twine 1 HTML representation.
  * @example
  * const p = new Passage('Start', 'This is the start of the story.');
  * console.log(p.toTwee());
  * // :: Start
  * // This is the start of the story.
  * //
  * console.log(p.toJSON());
  * // {"name":"Start","tags":[],"metadata":{},"text":"This is the start of the story."}
  * console.log(p.toTwine2HTML());
  * // <tw-passagedata pid="1" name="Start" tags="" >This is the start of the story.</tw-passagedata>
  * console.log(p.toTwine1HTML());
  * // <div tiddler="Start" tags="" modifier="extwee" twine-position="10,10">This is the start of the story.</div>
  * @example
  * const p = new Passage('Start', 'This is the start of the story.', ['start', 'beginning'], {position: '10,10', size: '100,100'});
  * console.log(p.toTwee());
  * // :: Start [start beginning] {"position":"10,10","size":"100,100"}
  * // This is the start of the story.
  * //
  * console.log(p.toJSON());
  * // {"name":"Start","tags":["start","beginning"],"metadata":{"position":"10,10","size":"100,100"},"text":"This is the start of the story."}
  * console.log(p.toTwine2HTML());
  * // <tw-passagedata pid="1" name="Start" tags="start beginning" position="10,10" size="100,100">This is the start of the story.</tw-passagedata>
  * console.log(p.toTwine1HTML());
  * // <div tiddler="Start" tags="start beginning" modifier="extwee" twine-position="10,10">This is the start of the story.</div>
  */ 
export default class Passage {
  /**
   * Name of the Passage
   * @private
   * @type {string}
   */
  #_name = '';

  /**
   * Internal array of tags
   * @private
   * @type {Array}
   */
  #_tags = [];

  /**
   * Internal metadata of passage
   * @private
   * @type {object}
   */
  #_metadata = {};

  /**
   * Internal text of the passage
   * @private
   * @type {string}
   */
  #_text = '';

  /**
   * Create a passage.
   * @param {string} name - Name
   * @param {string} text - Content
   * @param {Array} tags - Tags
   * @param {object} metadata - Metadata
   */
  constructor (name = '', text = '', tags = [], metadata = {}) {
    // Set name
    this.name = name;

    // Set tags
    this.tags = tags;

    // Set metadata
    this.metadata = metadata;

    // Sets text
    this.text = text;
  }

  /**
   * Name
   * @returns {string} Name
   */
  get name () { return this.#_name; }

  /**
   * @param {string} s - Name to replace
   * @throws {Error} Name must be a String!
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
   * @returns {Array} Tags
   */
  get tags () { return this.#_tags; }

  /**
   * @param {Array} t - Replacement array
   * @throws {Error} Tags must be an array!
   */
  set tags (t) {
    // Test if tags is an array
    if (Array.isArray(t)) {
      // Set the tags.
      this.#_tags = t;
    } else {
      throw new Error('Tags must be an array!');
    }
  }

  /**
   * Metadata
   * @returns {object} Metadata
   */
  get metadata () { return this.#_metadata; }

  /**
   * @param {object} m - Replacement object
   * @throws {Error} Metadata must be an object literal!
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
   * @returns {string} Text
   */
  get text () { return this.#_text; }

  /**
   * @param {string} t - Replacement text
   * @throws {Error} Text should be a String!
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
   * Return a Twee representation.
   * 
   * See: https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md
   * 
   * @method toTwee
   * @returns {string} String form of passage.
   */
  toTwee () {
    // Start empty string.
    let content = '';

    // Write the name.
    content += `:: ${this.name}`;

    // Test if it has any tags.
    if (this.tags.length > 0) {
      // Write output of tags.
      content += ` [${this.tags.join(' ')}]`;
    }

    // Check if any properties exist.
    if (Object.keys(this.metadata).length > 0) {
      // Write out a space and then passage metadata.
      content += ` ${JSON.stringify(this.metadata)}`;
    }

    // Add newline, text, and two newlines.
    content += `\n${this.text}\n\n`;

    // Return string.
    return content;
  }

  /**
   * Return JSON representation.
   * @method toJSON
   * @returns {string} JSON string.
   */
  toJSON () {
    // Create an initial object for later serialization.
    const p = {
      name: this.name,
      tags: this.tags,
      metadata: this.metadata,
      text: this.text
    };

    // Return stringified JSON from simple object.
    return JSON.stringify(p);
  }

  /**
   * Return Twine 2 HTML representation.
   * (Default Passage ID is 1.)
   * @method toTwine2HTML
   * @param {number} pid - Passage ID (PID) to record in HTML.
   * @returns {string} Twine 2 HTML string.
   */
  toTwine2HTML (pid = 1) {
    // Start the passage element.
    let passageData = '\t<tw-passagedata';

    /**
     * pid: (string) Required.
     *   The Passage ID (PID).
     */
    passageData += ` pid="${pid}"`;

    /**
     * name: (string) Required.
     *   The name of the passage.
     */
    passageData += ` name="${ encode( this.name ) }"`;

    /**
     * tags: (string) Optional.
     *   Any tags for the passage separated by spaces.
     */
    passageData += ` tags="${ encode( this.#_tags.join(' ') ) }" `;

    /**
     * position: (string) Optional.
     *   Comma-separated X and Y position of the upper-left of the passage
     *   when viewed within the Twine 2 editor.
     */
    if (Object.prototype.hasOwnProperty.call(this.#_metadata, 'position')) {
      passageData += ` position="${this.#_metadata.position}" `;
    }

    /**
     * size: (string) Optional.
     *   Comma-separated width and height of the passage
     *   when viewed within the Twine 2 editor.
     */
    if (Object.prototype.hasOwnProperty.call(this.#_metadata, 'size')) {
      passageData += `size="${this.#_metadata.size}" `;
    }

    // Add the text and close the element.
    passageData += `>${ encode( this.text ) }</tw-passagedata>\n`;

    // Return the Twine 2 HTML element.
    return passageData;
  }

  /**
   * Return Twine 1 HTML representation.
   * @method toTwine1HTML
   * @returns {string} Twine 1 HTML string.
   */
  toTwine1HTML () {
    /**
     * <div
        created="2023 06 02 012 1"
        modifier="twee"
        twine-position="10,10">[[One passage]]</div>
     */
    // Start the passage element
    let passageData = '\t<div';

    /**
     * tiddler: (string) Required.
     *   The name of the passage.
     */
    passageData += ` tiddler="${ encode( this.name ) }"`;

    /**
     * tags: (string) Required.
     *   Any tags for the passage separated by spaces.
     */
    passageData += ` tags="${ encode( this.#_tags.join(' ') ) }" `;

    /**
     * modifier: (string) Optional.
     *  Name of the tool that last edited the passage.
     *  Generally, for versions of Twine 1, this value will be "twee".
     *  Twee compilers may place their own name (e.g. "tweego" for Tweego).
     */
    passageData += ' modifier="extwee"';

    /**
     * twine-position: (string) Required.
     * Comma-separated X and Y coordinates of the passage within Twine 1.
     */
    // If the metadata contains 'position', we will use it.
    if (Object.prototype.hasOwnProperty.call(this.#_metadata, 'position')) {
      passageData += ` twine-position="${this.#_metadata.position}"`;
    } else {
      // Default is 10, 10
      passageData += ' twine-position="10,10"';
    }

    /**
     * text: (string) Required.
     * Text content of the passage.
     */
    passageData += `>${ encode( this.#_text ) }</div>`;

    // Return the HTML representation.
    return passageData;
  }
}
