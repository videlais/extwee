import { encode } from 'html-entities';
import { escapeTweeMetacharacters } from './Twee/parse.js';

/**
 * Passage class.
 * @class
 * @classdesc Represents a passage in a Twine story.
 * @property {string} name - Unique name, used as the target of links.
 * @property {string[]} tags - Tags for the passage.
 * @property {Record<string, unknown>} metadata - Metadata for the passage (e.g. `position`, `size`).
 * @property {string} text - Text content of the passage.
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
   * @type {string[]}
   */
  #_tags = [];

  /**
   * Internal metadata of passage
   * @private
   * @type {Record<string, unknown>}
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
   * @param {string} name - Passage name, unique within a story.
   * @param {string} text - Passage body text.
   * @param {string[]} tags - Tags applied to the passage.
   * @param {Record<string, unknown>} metadata - Passage metadata (e.g. `{ position: '10,10', size: '100,100' }`).
   * @throws {Error} If any argument has the wrong type (see the individual setters).
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
   * Passage name, used as the target of links and unique within a story.
   * @returns {string} Name used to link to this passage.
   */
  get name () { return this.#_name; }

  /**
   * Set passage name.
   * @param {string} s - New passage name.
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
   * Passage tags. The `script` and `stylesheet` tags have special meaning when the passage is added to a story.
   * @returns {string[]} Tag list (may be empty).
   */
  get tags () { return this.#_tags; }

  /**
   * Set passage tags.
   * @param {string[]} t - New passage tags.
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
   * Passage metadata. `position` and `size` are written to Twine HTML output; all keys are written to Twee output.
   * @returns {Record<string, unknown>} Key/value metadata (may be empty).
   */
  get metadata () { return this.#_metadata; }

  /**
   * Set passage metadata.
   * @param {Record<string, unknown>} m - New passage metadata.
   * @throws {Error} Metadata should be an object literal!
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
   * Passage body text (unencoded).
   * @returns {string} Unencoded body text.
   */
  get text () { return this.#_text; }

  /**
   * Set passage text.
   * @param {string} t - New passage text.
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
   * Return a Twee 3 representation. Metacharacters in the name and tags are escaped, as are lines starting with `::`.
   * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md Twee 3 Specification}
   * @returns {string} Twee 3 passage, ending with a blank line.
   */
  toTwee () {
    // Start empty string.
    let content = '';

    // Write the name with proper escaping for metacharacters.
    content += `:: ${escapeTweeMetacharacters(this.name)}`;

    // Test if it has any tags.
    if (this.tags.length > 0) {
      // Write output of tags with proper escaping.
      const escapedTags = this.tags.map(tag => escapeTweeMetacharacters(tag));
      content += ` [${escapedTags.join(' ')}]`;
    }

    // Check if any properties exist.
    if (Object.keys(this.metadata).length > 0) {
      // Write out a space and then passage metadata.
      content += ` ${JSON.stringify(this.metadata)}`;
    }

    // Split the text into lines.
    const lines = this.text.split('\n');

    // For each line, check if it begins with a double-colon.
    for (let i = 0; i < lines.length; i++) {
      // Check if the line begins with a double-colon.
      if (lines[i].startsWith('::')) {
        // Escape the double-colon.
        lines[i] = `\\${lines[i]}`;
      }
    }

    // Rejoin the lines.
    const output = lines.join('\n');

    // Add newline and text.
    content += `\n${output}\n\n`;

    // Return string.
    return content;
  }

  /**
   * Return JSON representation.
   * @returns {string} JSON string with `name`, `tags`, `metadata`, and `text`.
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
   * Return Twine 2 HTML `<tw-passagedata>` element with HTML-encoded text.
   * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md#passages Twine 2 HTML Output: Passages}
   * @param {number} [pid] - Passage ID (PID) to record in HTML. Defaults to `1`.
   * @returns {string} `<tw-passagedata>` element.
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
    // NOTE: Passage text content MUST be HTML-encoded to prevent
    // malformed HTML and ensure proper parsing by the browser.
    // The story format retrieves content via .innerHTML which automatically
    // decodes entities back to their original characters at runtime.
    passageData += `>${ encode( this.text ) }</tw-passagedata>\n`;

    // Return the Twine 2 HTML element.
    return passageData;
  }

  /**
   * Return Twine 1 HTML `<div tiddler>` element with HTML-encoded text. Position defaults to `10,10`.
   * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md Twine 1 HTML Output}
   * @returns {string} `<div tiddler>` element.
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
    // NOTE: Passage text content MUST be HTML-encoded to prevent
    // malformed HTML and ensure proper parsing by the browser.
    passageData += `>${ encode( this.#_text ) }</div>`;

    // Return the HTML representation.
    return passageData;
  }
}
