import Passage from './Passage.js';
import { generate as generateIFID } from './IFID/generate.js';
import { encode } from 'html-entities';

const creatorName = 'extwee';
const creatorVersion = '2.2.2';

/**
 * Story class.
 * @class
 * @classdesc Represents a Twine story.
 * @property {string} name - Name of the story.
 * @property {string} IFID - Interactive Fiction ID (IFID) of Story.
 * @property {string} start - Name of start passage.
 * @property {string} format - Story format of Story.
 * @property {string} formatVersion - Story format version of Story.
 * @property {number} zoom - Zoom level.
 * @property {Array} passages - Array of Passage objects. @see {@link Passage}
 * @property {string} creator - Program used to create Story.
 * @property {string} creatorVersion - Version used to create Story.
 * @property {object} metadata - Metadata of Story.
 * @property {object} tagColors - Tag Colors
 * @method {number} addPassage - Add a passage to the story and returns the new length of the passages array.
 * @method {number} removePassageByName - Remove a passage from the story by name and returns the new length of the passages array.
 * @method {Array} getPassagesByTag - Find passages by tag.
 * @method {Array} getPassageByName - Find passage by name.
 * @method {number} size - Size (number of passages).
 * @method {string} toJSON - Export Story as JSON representation.
 * @method {string} toTwee - Return Twee representation.
 * @method {string} toTwine2HTML - Return Twine 2 HTML representation.
 * @method {string} toTwine1HTML - Return Twine 1 HTML representation.
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
   * Creates a story.
   * @param {string} name - Name of the story.
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
   * Interactive Fiction ID (IFID) of Story.
   * @returns {string} IFID
   */
  get IFID () { return this.#_IFID; }

  /**
   * @param {string} i - Replacement IFID.
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
   * Passages in Story.
   * @returns {Array} Passages
   * @property {Array} passages - Passages
  */
  get passages () { return this.#_passages; }

  /**
   * Set passages in Story.
   * @param {Array} p - Replacement passages
   * @property {Array} passages - Passages
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
   * Add a passage to the story.
   * Passing `StoryData` will override story metadata and `StoryTitle` will override story name.
   * @method addPassage
   * @param {Passage} p - Passage to add to Story.
   * @returns {number} Return new length of passages array.
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
      } catch (event) {
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

    // This is not StoryData or StoryTitle.
    // Push the passage to the array.
    return this.#_passages.push(p);
  }

  /**
   * Remove a passage from the story by name.
   * @method removePassageByName
   * @param {string} name - Passage name to remove.
   * @returns {number} Return new length of passages array.
   */
  removePassageByName (name) {
    this.#_passages = this.#_passages.filter(passage => passage.name !== name);
    return this.#_passages.length;
  }

  /**
   * Find passages by tag.
   * @method getPassagesByTag
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
   * @method getPassageByName
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
   * @method size
   * @returns {number} Return number of passages
   */
  size () {
    return this.#_passages.length;
  }

  /**
   * Export Story as JSON representation.
   * @method toJSON
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
   * Return Twee representation.
   *
   * See: Twee 3 Specification
   * (https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md)
   * 
   * @method toTwee
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

    // For each passage, append it to the output.
    this.passages.forEach((passage) => {
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
   * 
   *  The only required attributes are `name` and `ifid` of the `<tw-storydata>` element. All others are optional.
   * 
   * The `<tw-storydata>` element may have any number of optional attributes, which are:
   * - `startnode`: (integer) Optional. The PID of the starting passage.
   * - `creator`: (string) Optional. The name of the program that created the story.
   * - `creator-version`: (string) Optional. The version of the program that created the story.
   * - `zoom`: (decimal) Optional. The zoom level of the story.
   * - `format`: (string) Optional. The format of the story.
   * - `format-version`: (string) Optional. The version of the format of the story.
   * 
   * @method toTwine2HTML
   * @returns {string} Twine 2 HTML string
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

    // 'Start' passage (if there is not a 'start' value set).
    let startPassagePID = null;

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

      // Have we found the 'Start' passage?
      if (p.name === 'Start') {
        // If so, set the PID based on index.
        startPassagePID = PIDcounter;
      }

      // Increase and keep looking.
      PIDcounter++;
    });

    // startnode: (integer) Optional.
    //
    // Maps to <tw-storydata startnode>.
    //
    // Check if startnode exists.
    if(this.start !== '') {
      // Set starting passage PID.
      storyData += ` startnode="${startPID}"`;
    }

    /**
     * If we came from Twee or another source, we might not have a start value.
     * 
     * We might, however, have a passage with the name "Start".
     */
    if(this.start === '' && startPassagePID !== null) {
      // Set starting passage PID.
      storyData += ` startnode="${startPassagePID}"`;
    }
    
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

    // Filter out passages with tag of 'stylesheet'.
    const stylesheetPassages = passages.filter((passage) => passage.tags.includes('stylesheet'));

    // Remove stylesheet passages from the main array.
    passages = passages.filter(p => !p.tags.includes('stylesheet'));

    // Were there any stylesheet passages?
    if (stylesheetPassages.length > 0) {
      // Start the STYLE.
      storyData += '\t<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">';

      // Concatenate passages.
      stylesheetPassages.forEach((passage) => {
        // Add text of passages.
        storyData += passage.text;
      });

      // Close the STYLE.
      storyData += '</style>\n';
    }

    // Filter out passages with tag of 'script'.
    const scriptPassages = passages.filter((passage) => passage.tags.includes('script'));

    // Remove script passages from the main array.
    passages = passages.filter(p => !p.tags.includes('script'));

    // Were there any script passages?
    if (scriptPassages.length > 0) {
      // Start the SCRIPT.
      storyData += '\t<script role="script" id="twine-user-script" type="text/twine-javascript">';

      // Concatenate passages.
      scriptPassages.forEach((passage) => {
        // Add text of passages.
        storyData += passage.text;
      });

      // Close SCRIPT.
      storyData += '</script>\n';
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
   * 
   * @method toTwine1HTML
   * @returns {string} Twine 1 HTML string.
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
