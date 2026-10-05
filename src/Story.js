import Passage from './Passage.js';
import { generate as generateIFID } from './IFID/generate.js';
import { encode } from 'html-entities';

import { version } from './version.js';

// Set the creator name.
// This is used to identify the program that created the story.
const creatorName = 'extwee';

// Set the creator version.
const creatorVersion = version;

/**
 * Story class.
 * @class
 * @classdesc Represents a Twine story.
 * @property {string} name - Title shown to players and in Twine's library.
 * @property {string} IFID - Interactive Fiction ID (IFID) of Story.
 * @property {string} start - Name of start passage.
 * @property {string} format - Story format name (e.g. `Harlowe`).
 * @property {string} formatVersion - Semantic version of the story format.
 * @property {number} zoom - Zoom level.
 * @property {Passage[]} passages - Passages in the story. See {@link Passage}.
 * @property {string} creator - Program used to create Story.
 * @property {string} creatorVersion - Version used to create Story.
 * @property {Record<string, unknown>} metadata - Additional story metadata.
 * @property {Record<string, string>} tagColors - Map of tag names to colors.
 * @property {string} storyJavaScript - Story-wide JavaScript.
 * @property {string} storyStylesheet - Story-wide CSS.
 * @example
 * const story = new Story('My Story');
 * story.IFID = '12345678-1234-5678-1234-567812345678';
 * story.start = 'Start';
 * story.format = 'SugarCube';
 * story.formatVersion = '2.31.0';
 * story.zoom = 1;
 * story.creator = 'extwee';
 * story.creatorVersion = '2.2.1';
 */
class Story {
  /**
   * Internal name of story
   * @private
   */
  #_name = 'Untitled Story';

  /**
   * Internal start
   * @private
   */
  #_start = '';

  /**
   * Internal IFID
   * @private
   */
  #_IFID = '';

  /**
   * Internal story format
   * @private
   */
  #_format = '';

  /**
   * Internal version of story format
   */
  #_formatVersion = '';

  /**
   * Internal zoom level
   * Default is 1 (100%)
   */
  #_zoom = 1;

  /**
   * Passages
   * @private
   */
  #_passages = [];

  /**
   * Creator
   * @private
   */
  #_creator = '';

  /**
   * CreatorVersion
   * @private
   */
  #_creatorVersion = '';

  /**
   * Metadata
   * @private
   */
  #_metadata = null;

  /**
   * Tag Colors
   * @private
   */
  #_tagColors = {};

  /**
   * Story JavaScript
   * @private
   */
  #_storyJavaScript = '';

  /**
   * Story Stylesheet
   * @private
   */
  #_storyStylesheet = '';

  /**
   * Creates a story.
   * @param {string} name - Story title (defaults to `Untitled Story`).
   */
  constructor (name = 'Untitled Story') {
    // Every story has a name.
    this.name = name;
    
    // Store the creator.
    this.#_creator = creatorName;
    
    // Store the creator version.
    this.#_creatorVersion = creatorVersion;
    
    // Set metadata to an object.
    this.#_metadata = {};
  }

  /**
   * Story title, written as the `StoryTitle` passage in Twee and as `<tw-storydata name>` in Twine 2 HTML.
   * @returns {string} Current story title.
   */
  get name () { return this.#_name; }

  /**
   * Set the story title.
   * @param {string} a - New story title.
   * @throws {Error} Story name must be a string
   */
  set name (a) {
    if (typeof a === 'string') {
      this.#_name = a;
    } else {
      throw new Error('Story name must be a string');
    }
  }

  /**
   * Map of passage tag names to display colors (e.g. `{ "bar": "green" }`), written as `<tw-tag>` elements.
   * @returns {Record<string, string>} Tag-to-color map.
   */
  get tagColors () { return this.#_tagColors; }

  /**
   * Replace the tag-to-color map.
   * @param {Record<string, string>} a - New tag-to-color map.
   * @throws {Error} Tag colors must be a plain object!
   */
  set tagColors (a) {
    if (a !== null && typeof a === 'object' && !Array.isArray(a)) {
      this.#_tagColors = a;
    } else {
      throw new Error('Tag colors must be a plain object!');
    }
  }

  /**
   * Interactive Fiction ID (IFID) of Story. Twine 2 expects an uppercase UUID v4.
   * @returns {string} Current IFID, or an empty string if none has been set.
   */
  get IFID () { return this.#_IFID; }

  /**
   * Set story IFID.
   * @param {string} i - New IFID.
   * @throws {Error} IFID must be a String!
   */
  set IFID (i) {
    if (typeof i === 'string') {
      this.#_IFID = i;
    } else {
      throw new Error('IFID must be a String!');
    }
  }

  /**
   * Name of the passage where the story begins.
   * @returns {string} Start passage name, or an empty string if not set.
   */
  get start () { return this.#_start; }

  /**
   * Set start passage name.
   * @param {string} s - Name of the new start passage.
   * @throws {Error} start (passage name) must be a String!
   */
  set start (s) {
    if (typeof s === 'string') {
      this.#_start = s;
    } else {
      throw new Error('start (passage name) must be a String!');
    }
  }

  /**
   * Semantic version of the story format (e.g. `2.28.2`).
   * @returns {string} Format version, or an empty string if not set.
   */
  get formatVersion () { return this.#_formatVersion; }

  /**
   * Set story format version.
   * @param {string} f - New format version.
   * @throws {Error} Story format version must be a String!
   */
  set formatVersion (f) {
    if (typeof f === 'string') {
      this.#_formatVersion = f;
    } else {
      throw new Error('Story format version must be a String!');
    }
  }

  /**
   * Additional story metadata not covered by other properties.
   * @returns {Record<string, unknown>} Metadata object.
   */
  get metadata () { return this.#_metadata; }

  /**
   * Replace story metadata.
   * @param {Record<string, unknown>} o - New metadata object.
   * @throws {Error} Story metadata must be a non-null Object!
   */
  set metadata (o) {
    if (o !== null && typeof o === 'object') {
      this.#_metadata = o;
    } else {
      throw new Error('Story metadata must be a non-null Object!');
    }
  }

  /**
   * Name of the story format used to play the story (e.g. `Harlowe`, `SugarCube`).
   * @returns {string} Story format name, or an empty string if not set.
   */
  get format () { return this.#_format; }

  /**
   * Set story format.
   * @param {string} f - New story format name.
   * @throws {Error} Story format must be a String!
   */
  set format (f) {
    if (typeof f === 'string') {
      this.#_format = f;
    } else {
      throw new Error('Story format must be a String!');
    }
  }

  /**
   * Name of the program that created the story. Defaults to `extwee`.
   * @returns {string} Creator program name.
   */
  get creator () { return this.#_creator; }

  /**
   * Set creator program.
   * @param {string} c - New creator program name.
   * @throws {Error} Creator must be String
   */
  set creator (c) {
    if (typeof c === 'string') {
      this.#_creator = c;
    } else {
      throw new Error('Creator must be String');
    }
  }

  /**
   * Version of the program that created the story. Defaults to the current Extwee version.
   * @returns {string} Creator program version.
   */
  get creatorVersion () { return this.#_creatorVersion; }

  /**
   * Set creator version.
   * @param {string} c - New creator program version.
   * @throws {Error} Creator version must be a string!
   */
  set creatorVersion (c) {
    if (typeof c === 'string') {
      this.#_creatorVersion = c;
    } else {
      throw new Error('Creator version must be a string!');
    }
  }

  /**
   * Twine 2 story map zoom level, where `1` is 100%.
   * @returns {number} Zoom level.
   */
  get zoom () { return this.#_zoom; }

  /**
   * Set zoom level. The value is rounded to two decimal places.
   * @param {number} n - New zoom level.
   * @throws {Error} Zoom level must be a finite Number!
   */
  set zoom (n) {
    if (typeof n === 'number' && Number.isFinite(n)) {
      // Parse float with a fixed length and then force into Number
      this.#_zoom = Number(Number.parseFloat(n).toFixed(2));
    } else {
      throw new Error('Zoom level must be a finite Number!');
    }
  }

  /**
   * Passages in the story. Does not include `StoryData`, `StoryTitle`, or `script`/`stylesheet`-tagged passages, which {@link Story#addPassage} stores in other properties.
   * @returns {Passage[]} Passages in story order.
   */
  get passages () { return this.#_passages; }

  /**
   * Replace all passages in the story. Unlike {@link Story#addPassage}, no special passages are processed.
   * @param {Passage[]} p - New passages.
   * @throws {Error} Passages must be an Array!
   * @throws {Error} Passages must be an Array of Passage objects!
   */
  set passages (p) {
    if (Array.isArray(p)) {
      if (p.every((passage) => passage instanceof Passage)) {
        this.#_passages = p;
      } else {
        throw new Error('Passages must be an Array of Passage objects!');
      }
    } else {
      throw new Error('Passages must be an Array!');
    }
  }

  /**
   * Story-wide CSS. Text from `stylesheet`-tagged passages added through {@link Story#addPassage} is appended here.
   * @returns {string} CSS text (may be empty).
   */
  get storyStylesheet () {
    return this.#_storyStylesheet;
  }

  /**
   * Set story stylesheet.
   * @param {string} s - New story stylesheet.
   * @throws {Error} Story stylesheet must be a string!
   */
  set storyStylesheet (s) {
    if (typeof s === 'string') {
      this.#_storyStylesheet = s;
    } else {
      throw new Error('Story stylesheet must be a string!');
    }
  }

  /**
   * Story-wide JavaScript. Text from `script`-tagged passages added through {@link Story#addPassage} is appended here.
   * @returns {string} JavaScript source (may be empty).
   */
  get storyJavaScript () {
    return this.#_storyJavaScript;
  }

  /**
   * Set story JavaScript.
   * @param {string} s - New story JavaScript.
   * @throws {Error} Story JavaScript must be a string!
   */
  set storyJavaScript (s) {
    if (typeof s === 'string') {
      this.#_storyJavaScript = s;
    } else {
      throw new Error('Story JavaScript must be a string!');
    }
  }

  /**
   * Add a passage to the story.
   * Some passages are consumed instead of stored:
   * - `StoryData` sets IFID, format, format version, zoom, start, and tag colors.
   * - `StoryTitle` sets the story name.
   * - `script`- and `stylesheet`-tagged passages are appended to `storyJavaScript` and `storyStylesheet`.
   *
   * A passage whose name already exists is ignored with a console warning.
   * @param {Passage} p - Passage to add to Story.
   * @returns {number} New length of the passages array.
   * @throws {Error} Can only add Passages to the story!
   */
  addPassage (p) {
    // Check if passed argument is a Passage.
    if (!(p instanceof Passage)) {
      // We can only add passages to array.
      throw new Error('Can only add Passages to the story!');
    }

    // Does this passage already exist in the collection?
    // If it does, we ignore it and return.
    if (this.getPassageByName(p.name) !== null) {
      // Warn user
      console.warn(`Warning: A passage with the name "${p.name}" already exists!`);
      //
      return this.#_passages.length;
    }

    // Parse StoryData.
    if (p.name === 'StoryData') {
      // Try to parse JSON.
      try {
        // Attempt to parse storyData JSON.
        const metadata = JSON.parse(p.text);

        // IFID.
        if (Object.prototype.hasOwnProperty.call(metadata, 'ifid')) {
          this.IFID = metadata.ifid;
        }

        // Format.
        if (Object.prototype.hasOwnProperty.call(metadata, 'format')) {
          this.format = metadata.format;
        }

        // formatVersion.
        if (Object.prototype.hasOwnProperty.call(metadata, 'format-version')) {
          this.formatVersion = metadata['format-version'];
        }

        // Zoom.
        if (Object.prototype.hasOwnProperty.call(metadata, 'zoom')) {
          this.zoom = metadata.zoom;
        }

        // Start.
        if (Object.prototype.hasOwnProperty.call(metadata, 'start')) {
          this.start = metadata.start;
        }

        // Tag colors.
        if (Object.prototype.hasOwnProperty.call(metadata, 'tag-colors')) {
          this.tagColors = metadata['tag-colors'];
        }
      } catch {
        // Ignore errors.
      }

      // Don't add StoryData to passages.
      return this.#_passages.length;
    }

    // Parse StoryTitle.
    if (p.name === 'StoryTitle') {
      // If there is a StoryTitle passage, we accept the name.
      // Set internal name based on StoryTitle.
      this.name = p.text;
      // Once we override story.name, return.
      return this.#_passages.length;
    }

    // Parse Start
    if (p.name === 'Start') {
      // Have we already encountered StoryData?
      if (this.start == '') {
        // Set internal start based on Start.
        /**
         * Four possible scenarios:
         * 1. StoryData has already been encountered, and we will never get here.
         * 2. StoryData exists and will be encountered after Start.
         * 3. StoryData does not exist.
         * 4. Start is the first and only passage.
         */
        this.start = p.name;
      }
    }

    // Parse passages with "script" tag
    if (p.tags.includes('script')) {
      // Add the passage text to storyJavaScript
      this.#_storyJavaScript += (this.#_storyJavaScript.length > 0 ? '\n\n' : '') + p.text;
      // Don't add script-tagged passages to the passages array
      return this.#_passages.length;
    }

    // Parse passages with "stylesheet" tag
    if (p.tags.includes('stylesheet')) {
      // Add the passage text to storyStylesheet
      this.#_storyStylesheet += (this.#_storyStylesheet.length > 0 ? '\n\n' : '') + p.text;
      // Don't add script-tagged passages to the passages array
      return this.#_passages.length;
    }

    // This is not StoryData or StoryTitle.
    // Push the passage to the array.
    return this.#_passages.push(p);
  }

  /**
   * Remove a passage from the story by name.
   * @param {string} name - Passage name to remove.
   * @returns {number} New length of the passages array.
   */
  removePassageByName (name) {
    this.#_passages = this.#_passages.filter(passage => passage.name !== name);
    return this.#_passages.length;
  }

  /**
   * Find passages by tag.
   * @param {string} t - Tag to search for.
   * @returns {Passage[]} Passages with the tag (empty if none match).
   */
  getPassagesByTag (t) {
    // Look through passages
    return this.#_passages.filter((passage) => {
      // Look through each passage's tags
      return passage.tags.some((tag) => t === tag);
    });
  }

  /**
   * Find passage by name.
   * @param {string} name - Passage name to search for.
   * @returns {Passage | null} Matching passage, or `null` if not found.
   */
  getPassageByName (name) {
    // Look through passages
    const results = this.#_passages.find((passage) => passage.name === name);
    // Return entry or null, if not found
    return results !== undefined ? results : null;
  }

  /**
   * Number of passages in {@link Story#passages}.
   * @returns {number} Passage count.
   */
  size () {
    return this.#_passages.length;
  }

  /**
   * Export Story as a Twine 2 JSON string. Same as {@link Story#toJSONString}.
   *
   * **Note:** Unlike the usual `toJSON()` convention, this returns a string, not an object.
   * Do not pass a Story to `JSON.stringify()`, directly or nested; the output will be encoded twice.
   * Use {@link Story#toJSONString} when you need JSON text. This is planned to return an object in 3.0.
   * @see {@link https://github.com/videlais/extwee/issues/799 Issue #799}
   * @returns {string} Story serialized as indented JSON.
   */
  toJSON () {
    return this.toJSONString();
  }

  /**
   * Export Story as a Twine 2 JSON string.
   * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-jsonoutput-doc.md Twine 2 JSON Output}
   * @returns {string} Story serialized as JSON indented with 4 spaces.
   */
  toJSONString () {
    // Create an initial object for later serialization.
    const s = {
      name: this.name,
      tagColors: this.tagColors,
      ifid: this.IFID,
      start: this.start,
      formatVersion: this.formatVersion,
      metadata: this.metadata,
      format: this.format,
      creator: this.creator,
      creatorVersion: this.creatorVersion,
      zoom: this.zoom,
      style: this.storyStylesheet,
      script: this.storyJavaScript,
      passages: []
    };

    // For each passage, convert into simple object.
    this.passages.forEach((p) => {
      s.passages.push({
        name: p.name,
        tags: p.tags,
        metadata: p.metadata,
        text: p.text
      });
    });

    // Return stringified Story object.
    return JSON.stringify(s, null, 4);
  }

  /**
   * Return Twee 3 representation. A new IFID is generated (with a warning) if the current one is not a UUID v4.
   * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md Twee 3 Specification}
   * @returns {string} Twee 3 source text.
   */
  toTwee () {
    // Write the StoryData first.
    let outputContents = ':: StoryData\n';

    // Create default object.
    const metadata = {};

    /**
     * ifid: (string) Required. Maps to <tw-storydata ifid>.
     */
    // Test if IFID is in UUID format.
    if (this.IFID.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/) === null) {
      // Generate a new IFID for this work.
      metadata.ifid = generateIFID();

      // Write the existing IFID.
      console.warn('Warning: IFID is not in UUIDv4 format! A new IFID was generated.');
    } else {
      // Write the IFID.
      metadata.ifid = this.IFID;
    }

    /**
     * format: (string) Optional. Maps to <tw-storydata format>.
     */
    // Does format exist?
    if (this.format !== '') {
      // Write the existing format.
      metadata.format = this.format;
    }

    /**
     * format-version: (string) Optional. Maps to <tw-storydata format-version>.
     */
    // Does formatVersion exist?
    if (this.formatVersion !== '') {
      // Write the existing formatVersion.
      metadata['format-version'] = this.formatVersion;
    }

    /**
     * zoom: (decimal) Optional. Maps to <tw-storydata zoom>.
     */
    // Does zoom exist?
    if (this.zoom !== 0) {
      // Write the existing zoom.
      metadata.zoom = this.zoom;
    }

    /**
     * start: (string) Optional.
     * Maps to <tw-passagedata name> of the node whose pid matches <tw-storydata startnode>.
     * 
     * If there is no start value, the "Start" passage is assumed to be the starting passage.
     */
    // Does start exist?
    if (this.start !== '') {
      // Write the existing start.
      metadata.start = this.start;
    }
   
    /**
     * tag-colors: (object of tag(string):color(string) pairs) Optional.
     * Pairs map to <tw-tag> nodes as <tw-tag name>:<tw-tag color>.
     */
    const numberOfColors = Object.keys(this.tagColors).length;

    // Are there any colors?
    if (numberOfColors > 0) {
      // Add a tag-colors property
      metadata['tag-colors'] = this.tagColors;
    }

    // Write out the story metadata.
    outputContents += `${JSON.stringify(metadata, undefined, 2)}`;

    // Add two newlines.
    outputContents += '\n\n';

    // Write story name as StoryTitle.
    outputContents += ':: StoryTitle\n' + this.name;

    // Add two newlines.
    outputContents += '\n\n';

    // Write out the story stylesheet, if any.
    if (this.#_storyStylesheet.length > 0) {
      outputContents += ':: StoryStylesheet [stylesheet]\n' + this.#_storyStylesheet + '\n\n';
    }

    // Write out the story JavaScript, if any.
    if (this.#_storyJavaScript.length > 0) {
      outputContents += ':: StoryJavaScript [script]\n' + this.#_storyJavaScript + '\n\n';
    }

    // For each passage, append it to the output.
    this.passages.forEach((passage) => {
      outputContents += passage.toTwee();
    });

    // Return the Twee string.
    return outputContents;
  }

  /**
   * Return Twine 2 HTML `<tw-storydata>` element (without the surrounding story format template).
   * If no IFID is set, a new one is generated.
   *
   * The only required attributes are `name` and `ifid` of the `<tw-storydata>` element. All others are optional.
   * 
   * The `<tw-storydata>` element may have any number of optional attributes, which are:
   * - `startnode`: (integer) Optional. The PID of the starting passage.
   * - `creator`: (string) Optional. The name of the program that created the story.
   * - `creator-version`: (string) Optional. The version of the program that created the story.
   * - `zoom`: (decimal) Optional. The zoom level of the story.
   * - `format`: (string) Optional. The format of the story.
   * - `format-version`: (string) Optional. The version of the format of the story.
   * 
   * Because story stylesheet data can be represented as a passage, property value, or both, all approaches are encoded.
   * 
   * Because story JavaScript can be represented as a passage, property value, or both, all approaches are encoded.
   * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md Twine 2 HTML Output}
   * @returns {string} `<tw-storydata>` element with its child passages.
   */
  toTwine2HTML () {
    // Get the passages.
    // Make a local copy, as we might be modifying it.
    let passages = this.passages;

    // Twine 2 HTML starts with a <tw-storydata> element.
    // See: Twine 2 HTML Output

    // name: (string) Required. The name of the story.
    //
    // Maps to <tw-storydata name>.
    //
    let storyData = `<tw-storydata name="${ encode( this.name ) }"`;

    // ifid: (string) Required. 
    //   An IFID is a sequence of between 8 and 63 characters, 
    //   each of which shall be a digit, a capital letter or a
    //    hyphen that uniquely identify a story (see Treaty of Babel).
    //
    // Maps to <tw-storydata ifid>.
    //
    // Check if IFID exists.
    if (this.IFID !== '') {
      // Write the existing IFID.
      storyData += ` ifid="${ this.IFID }"`;
    } else {
      // Generate a new IFID.
      // Twine 2 uses v4 (random) UUIDs, using only capital letters.
      storyData += ` ifid="${ generateIFID() }"`;
    }

    // Passage Identification (PID) counter.
    // (Twine 2 starts with 1, so we mirror that.)
    let PIDcounter = 1;

    // Set initial PID value.
    let startPID = 1;

    // We have to do a bit of nonsense here.
    // Twine 2 HTML cares about PID values.
    passages.forEach((p) => {
      // Have we found the starting passage?
      if (p.name === this.start) {
        // If so, set the PID based on index.
        startPID = PIDcounter;
      }

      // Increase and keep looking.
      PIDcounter++;
    });

    // Are there any passages?
    if (passages.length === 0) {
      // No passages, so we can't set a startnode.
      startPID = 0;
    }

    /**
     * Multiple possible scenarios:
     * 1. No passages. (StartPID is 0.)
     * 2. Start is the first or only passage. (StartPID is 1.)
     * 3. Starting passage is not the first passage. (StartPID is > 1.)
     */

    // startnode: (integer) Optional. The PID of the starting passage.
    storyData += ` startnode="${startPID}"`;
    
    // creator: (string) Optional. The name of the program that created the story.
    // Maps to <tw-storydata creator>.
    if(this.creator !== '') {
      // Write existing creator.
      storyData += ` creator="${ encode( this.creator ) }"`;
    }

    // creator-version: (string) Optional. The version of the program that created the story.
    // Maps to <tw-storydata creator-version>.
    if(this.creatorVersion !== '') {
       // Default to extwee version.
      storyData += ` creator-version="${this.creatorVersion}"`;
    }

    // zoom: (decimal) Optional. The zoom level of the story.
    // Maps to <tw-storydata zoom>.
    if(this.zoom !== 1) {
      // Write existing or default value.
      storyData += ` zoom="${this.zoom}"`;
    }

    // format: (string) Optional. The format of the story.
    // Maps to <tw-storydata format>.
    if(this.format !== '') {
      // Write existing or default value.
      storyData += ` format="${this.format}"`;
    }
   
    // format-version: (string) Optional. The version of the format of the story.
    // Maps to <tw-storydata format-version>.
    if(this.formatVersion !== '') {
      // Write existing or default value.
      storyData += ` format-version="${this.formatVersion}"`;
    }

    // Add the default attributes.
    storyData += ' options hidden>\n';

    // We may have passages with tags of 'stylesheet', story stylesheet data, both, or none.

    // Step 1: Add all passages with tag of 'stylesheet' to the stylesheet element.
    // Filter out passages with tag of 'stylesheet'.
    const stylesheetPassages = passages.filter((passage) => passage.tags.includes('stylesheet'));

    // Remove stylesheet passages from the main array.
    passages = passages.filter(p => !p.tags.includes('stylesheet'));

    // Were there any stylesheet passages?
    /* istanbul ignore next */
    if (stylesheetPassages.length > 0) {
      // Start the STYLE.
      storyData += '\t<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">';

      // Concatenate passages with separators to keep passage content distinct.
      storyData += stylesheetPassages.map((passage) => passage.text).join('\n\n');

      // Close the STYLE.
      storyData += '</style>\n';
    }

    // Step 2: Check if the internal stylesheet data is empty.
    // If it is not empty, add it to the stylesheet element.
    if (this.#_storyStylesheet.length > 0) {
      // Add the internal stylesheet.
      storyData += `\t<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">${this.#_storyStylesheet}</style>\n`;
    }

    // We may have passages with tags of 'script', story JavaScript data, both, or none.

    // Step 1: Add all passages with tag of 'script' to the script element.
    // Filter out passages with tag of 'script'.
    const scriptPassages = passages.filter((passage) => passage.tags.includes('script'));

    // Were there any script passages?
    /* istanbul ignore next */
    if (scriptPassages.length > 0) {
      // Start the SCRIPT.
      storyData += '\t<script role="script" id="twine-user-script" type="text/twine-javascript">';

      // Concatenate passages with separators to keep passage content distinct.
      storyData += scriptPassages.map((passage) => passage.text).join('\n\n');

      // Close SCRIPT.
      storyData += '</script>\n';
    }

    // Step 2: Check if the internal JavaScript data is empty.
    // If it is not empty, add it to the script element.
    if (this.#_storyJavaScript.length > 0) {
      // Add the internal JavaScript.
      storyData += `\t<script role="script" id="twine-user-script" type="text/twine-javascript">${this.#_storyJavaScript}</script>\n`;
    }

    // Reset the PID counter.
    PIDcounter = 1;

    // Build the passages HTML.
    this.passages.forEach((passage) => {
      // Append each passage element using the PID counter.
      storyData += passage.toTwine2HTML(PIDcounter);
      // Increase counter inside loop.
      PIDcounter++;
    });

    // Generate <tw-tag> elements for each tag, if any.
    const tagList = Object.keys(this.tagColors);

    // For each tag, generate a <tw-tag> element.
    tagList.forEach((tag) => {
      // Add the <tw-tag> element.
      storyData += `\t<tw-tag name="${encode(tag)}" color="${encode(String(this.tagColors[tag]))}"></tw-tag>\n`;
    });

    // Close the HTML element.
    storyData += '</tw-storydata>';

    // Return HTML contents.
    return storyData;
  }

  /**
   * Return Twine 1 HTML passage elements (without the surrounding story format template).
   * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md Twine 1 HTML Output}
   * @returns {string} Concatenated `<div tiddler>` passage elements.
   */
  toTwine1HTML () {
    // Begin HTML output.
    let outputContents = '';

    // Process passages (if any).
    this.passages.forEach((p) => {
      // Output HTML output per passage.
      outputContents += `\t${p.toTwine1HTML()}`;
    });

    // Return Twine 1 HTML content.
    return outputContents;
  }

 
}

export { Story, creatorName, creatorVersion };
