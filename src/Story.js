import Passage from './Passage.js';
import { v4 as uuidv4 } from 'uuid';

const creatorName = 'extwee';
const version = '2.2.0';

export default class Story {
  /**
   * Internal name of story
   * @private
   */
  #_name = '';

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
   */
  #_zoom = 0;

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
   * Creates a story.
   * @param {string} name - Name of the story.
   */
  constructor (name = '') {
    // Every story has a name.
    this.name = name;
    // Store the creator.
    this.#_creator = creatorName;
    this.#_creatorVersion = version;
    // Set metadata to an object.
    this.#_metadata = {};
  }

  /**
   * Each story has a name
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
   * Name of start passage.
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
   * Story format version of Story.
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
   * Metadata of Story.
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
   * Story format of Story.
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
   * Program used to create Story.
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
   * Version used to create Story.
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
   * Zoom level.
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
   * Add a passage to the story.
   * `StoryData` will override story metadata and `StoryTitle` will override story name.
   * @param {Passage} p - Passage to add to Story.
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
      console.warn('Ignored passage with same name as existing one!');
      //
      return;
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
      } catch (event) {
        // Ignore errors.
      }

      // Don't add StoryData to passages.
      return;
    }

    // Parse StoryTitle.
    if (p.name === 'StoryTitle') {
      // If there is a StoryTitle passage, we accept the name.
      // Set internal name based on StoryTitle.
      this.name = p.text;
      // Once we override story.name, return.
      return;
    }

    // This is not StoryData or StoryTitle.
    // Push the passage to the array.
    this.#_passages.push(p);
  }

  /**
   * Remove a passage from the story by name.
   * @param {string} name - Passage name to remove
   */
  removePassageByName (name) {
    this.#_passages = this.#_passages.filter(passage => passage.name !== name);
  }

  /**
   * Find passages by tag.
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
   * Find passage by name.
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
   * Size (number of passages).
   * @returns {number} Return number of passages
   */
  size () {
    return this.#_passages.length;
  }

  /**
   * forEach-style iterator of passages in Story.
   * @param {Function} callback - Callback function
   */
  forEachPassage (callback) {
    // Check if argument is a function.
    if (typeof callback !== 'function') {
      // Throw error
      throw new Error('Callback must be a function!');
    }

    // Use internal forEach.
    this.#_passages.forEach((element, index) => {
      // Call callback function with element and index.
      callback(element, index);
    });
  }

  /**
   * Export Story as JSON representation.
   * @returns {string} JSON string.
   */
  toJSON () {
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
      passages: []
    };

    // For each passage, convert into simple object.
    this.forEachPassage((p) => {
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
   * Return Twee representation.
   *
   * See: Twee 3 Specification
   * (https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md)
   * @returns {string} Twee String
   */
  toTwee () {
    // Write the StoryData first.
    let outputContents = ':: StoryData\n';

    // Create default object.
    const metadata = {};

    /**
     * ifid: (string) Required. Maps to <tw-storydata ifid>.
     */
    // Is there an IFID?
    if (this.IFID === '') {
      // Generate a new IFID for this work.
      // Twine 2 uses v4 (random) UUIDs, using only capital letters.
      metadata.ifid = uuidv4().toUpperCase();
    } else {
      // Use existing (non-default) value.
      metadata.ifid = this.IFID;
    }

    /**
     * format: (string) Optional. Maps to <tw-storydata format>.
     */
    metadata.format = this.format;

    /**
     * format-version: (string) Optional. Maps to <tw-storydata format-version>.
     */
    metadata['format-version'] = this.formatVersion;

    /**
     * zoom: (decimal) Optional. Maps to <tw-storydata zoom>.
     */
    metadata.zoom = this.zoom;

    /**
     * start: (string) Optional.
     * Maps to <tw-passagedata name> of the node whose pid matches <tw-storydata startnode>.
     */
    metadata.start = this.start;

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

    // For each passage, append it to the output.
    this.forEachPassage((passage) => {
      outputContents += passage.toTwee();
    });

    // Return the Twee string.
    return outputContents;
  }

  /**
   * Return Twine 2 HTML.
   *
   * See: Twine 2 HTML Output
   * (https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md)
   * @returns {string} Twine 2 HTML string
   */
  toTwine2HTML () {
    // Prepare HTML content.
    let storyData = `<tw-storydata name="${this.name}"`;
    // Passage Identification (PID) counter.
    // (Twine 2 starts with 1, so we mirror that.)
    let PIDcounter = 1;

    // Does start exist?
    if (this.start === '') {
      // We can't create a Twine 2 HTML file without a starting passage.
      throw new Error('No starting passage!');
    }

    // Try to find starting passage.
    // If it doesn't exist, we throw an error.
    if (this.getPassageByName(this.start) === null) {
      // We can't create a Twine 2 HTML file without a starting passage.
      throw new Error('Starting passage not found');
    }

    // Set initial PID value.
    let startPID = 1;
    // We have to do a bit of nonsense here.
    // Twine 2 HTML cares about PID values.
    this.forEachPassage((p) => {
      // Have we found the starting passage?
      if (p.name === this.start) {
        // If so, set the PID based on index.
        startPID = PIDcounter;
      }
      // Increase and keep looking.
      PIDcounter++;
    });

    // Set starting passage PID.
    storyData += ` startnode="${startPID}"`;

    // Defaults to 'extwee' if missing.
    storyData += ` creator="${this.creator}"`;

    // Default to extwee version.
    storyData += ` creator-version="${this.creatorVersion}"`;

    // Check if IFID exists.
    if (this.IFID !== '') {
      // Write the existing IFID.
      storyData += ` ifid="${this.IFID}"`;
    } else {
      // Generate a new IFID.
      // Twine 2 uses v4 (random) UUIDs, using only capital letters.
      storyData += ` ifid="${uuidv4().toUpperCase()}"`;
    }

    // Write existing or default value.
    storyData += ` zoom="${this.zoom}"`;

    // Write existing or default value.
    storyData += ` format="${this.#_format}"`;

    // Write existing or default value.
    storyData += ` format-version="${this.#_formatVersion}"`;

    // Add the default attributes.
    storyData += ' options hidden>\n';

    // Start the STYLE.
    storyData += '\t<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">';

    // Get stylesheet passages.
    const stylesheetPassages = this.getPassagesByTag('stylesheet');

    // Concatenate passages.
    stylesheetPassages.forEach((passage) => {
      // Add text of passages.
      storyData += passage.text;
    });

    // Close the STYLE.
    storyData += '</style>\n';

    // Start the SCRIPT.
    storyData += '\t<script role="script" id="twine-user-script" type="text/twine-javascript">';

    // Get stylesheet passages.
    const scriptPassages = this.getPassagesByTag('script');

    // Concatenate passages.
    scriptPassages.forEach((passage) => {
      // Add text of passages.
      storyData += passage.text;
    });

    // Close SCRIPT.
    storyData += '</script>\n';

    // Reset the PID counter.
    PIDcounter = 1;

    // Build the passages HTML.
    this.forEachPassage((passage) => {
      // Append each passage element using the PID counter.
      storyData += passage.toTwine2HTML(PIDcounter);
      // Increase counter inside loop.
      PIDcounter++;
    });

    // Close the HTML element.
    storyData += '</tw-storydata>';

    // Return HTML contents.
    return storyData;
  }

  /**
   * Return Twine 1 HTML.
   *
   * See: Twine 1 HTML Output
   * (https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md)
   * @returns {string} Twine 1 HTML string.
   */
  toTwine1HTML () {
    // Begin HTML output.
    let outputContents = '';

    // Process passages (if any).
    this.forEachPassage((p) => {
      // Output HTML output per passage.
      outputContents += `\t${p.toTwine1HTML()}`;
    });

    // Return Twine 1 HTML content.
    return outputContents;
  }
}
