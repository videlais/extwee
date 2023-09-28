/**
 * A passage is the smallest unit of a Twine story.
 */
export default class Passage {
  /**
   * Name of the Passage
   * @private
   */
  #_name = null;

  /**
   * Internal array of tags
   * @private
   */
  #_tags = [];

  /**
   * Internal metadata of passage
   * @private
   */
  #_metadata = {};

  /**
   * Internal text of the passage
   * @private
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
   * Return a Twee representation.
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
    passageData += ` name="${this.name}"`;

    /**
     * tags: (string) Optional.
     *   Any tags for the passage separated by spaces.
     */
    passageData += ` tags="${this.#_tags.join(' ')}" `;

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

    /**
     * Escape passage Twine 2 passage text.
     * @param {string} text - Text to escape.
     * @returns {string} Escaped text.
     */
    const escape = function (text) {
      const rules = [
        ['&', '&amp;'],
        ['<', '&lt;'],
        ['>', '&gt;'],
        ['"', '&quot;'],
        ["'", '&#x27;'],
        ['`', '&#x60;']
      ];

      rules.forEach(([rule, template]) => {
        text = text.replaceAll(rule, template);
      });

      return text;
    };

    // Add the text and close the element.
    passageData += `>${escape(this.text)}</tw-passagedata>\n`;

    // Return the Twine 2 HTML element.
    return passageData;
  }

  /**
   * Return Twine 1 HTML representation.
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
    passageData += ` tiddler="${this.name}"`;

    /**
     * tags: (string) Required.
     *   Any tags for the passage separated by spaces.
     */
    passageData += ` tags="${this.#_tags.join(' ')}" `;

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
    passageData += `>${this.#_text}</div>`;

    // Return the HTML representation.
    return passageData;
  }
}
