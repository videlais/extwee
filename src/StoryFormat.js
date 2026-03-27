import { valid } from 'semver';

/**
 * StoryFormat representing a Twine 2 story format.
 * 
 * This class has type checking on all of its properties.
 * If a property is set to a value of the wrong type, a TypeError will be thrown.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-storyformats-spec.md Twine 2 Story Formats Specification}
 * @class
 * @classdesc A class representing a Twine 2 story format.
 * @property {string} name - The name of the story format.
 * @property {string} version - The semantic version of the story format.
 * @property {string} description - The description of the story format.
 * @property {string} author - The author of the story format.
 * @property {string} image - The image of the story format.
 * @property {string} url - The URL of the story format.
 * @property {string} license - The license of the story format.
 * @property {boolean} proofing - The proofing of the story format.
 * @property {string} source - The source of the story format.
 * @example
 * const sf = new StoryFormat();
 * sf.name = 'New';
 * sf.version = '1.0.0';
 * sf.description = 'New';
 * sf.author = 'New';
 * sf.image = 'New';
 * sf.url = 'New';
 * sf.license = 'New';
 * sf.proofing = true;
 * sf.source = 'New';
 */

export default class StoryFormat {
  /**
   * Internal name.
   * @private
   */
  #_name = 'Untitled Story Format';

  /**
   * Internal version.
   * @private
   */
  #_version = '';

  /**
   * Internal description.
   * @private
   */
  #_description = '';

  /**
   * Internal author.
   * @private
   */
  #_author = '';

  /**
   * Internal image.
   * @private
   */
  #_image = '';

  /**
   * Internal URL.
   * @private
   */
  #_url = '';

  /**
   * Internal license.
   * @private
   */
  #_license = '';

  /**
   * Internal proofing.
   * @private
   */
  #_proofing = false;

  /**
   * Internal source.
   * @private
   */
  #_source = '';

  // Constructor with all parameters.
  constructor(name = 'Untitled Story Format', version = '', description = '', author = '', image = '', url = '', license = '', proofing = false, source = '') {
    this.name = name;
    this.version = version;
    this.description = description;
    this.author = author;
    this.image = image;
    this.url = url;
    this.license = license;
    this.proofing = proofing;
    this.source = source;
  }

  /**
   * Name
   * @returns {string} Name.
   */
  get name () { return this.#_name; }

  /**
   * Set name.
   * @param {string} n - Replacement name.
   */
  set name (n) {
    if (typeof n === 'string') {
      this.#_name = n;
    } else {
      throw new TypeError('Name must be a string!');
    }
  }

  /**
   * Version.
   * @returns {string} Version.
   */
  get version () { return this.#_version; }

  /**
   * Set version.
   * @param {string} n - Replacement version.
   */
  set version (n) {
    if (typeof n === 'string') {
      this.#_version = n;
    } else {
      throw new TypeError('Version must be a string!');
    }
  }

  /**
   * Description.
   * @returns {string} Description.
   */
  get description () { return this.#_description; }

  /**
   * Set description.
   * @param {string} d - Replacement description.
   */
  set description (d) {
    if (typeof d === 'string') {
      this.#_description = d;
    } else {
      throw new TypeError('Description must be a string!');
    }
  }

  /**
   * Author.
   * @returns {string} Author.
   */
  get author () { return this.#_author; }

  /**
   * Set author.
   * @param {string} a - Replacement author.
   */
  set author (a) {
    if (typeof a === 'string') {
      this.#_author = a;
    } else {
      throw new TypeError('Author must be a string!');
    }
  }

  /**
   * Image.
   * @returns {string} Image.
   */
  get image () { return this.#_image; }

  /**
   * Set image.
   * @param {string} i - Replacement image.
   */
  set image (i) {
    if (typeof i === 'string') {
      this.#_image = i;
    } else {
      throw new TypeError('Image must be a string!');
    }
  }

  /**
   * URL.
   * @returns {string} URL.
   */
  get url () { return this.#_url; }

  /**
   * Set URL.
   * @param {string} u - Replacement URL.
   */
  set url (u) {
    if (typeof u === 'string') {
      this.#_url = u;
    } else {
      throw new TypeError('URL must be a string!');
    }
  }

  /**
   * License.
   * @returns {string} License.
   */
  get license () { return this.#_license; }

  /**
   * Set license.
   * @param {string} l - Replacement license.
   */
  set license (l) {
    if (typeof l === 'string') {
      this.#_license = l;
    } else {
      throw new TypeError('License must be a string!');
    }
  }

  /**
   * Proofing.
   * @returns {boolean} Proofing.
   */
  get proofing () { return this.#_proofing; }

  /**
   * Set proofing.
   * @param {boolean} p - Replacement proofing.
   */
  set proofing (p) {
    if (typeof p === 'boolean') {
      this.#_proofing = p;
    } else {
      throw new TypeError('Proofing must be a Boolean!');
    }
  }

  /**
   * Source.
   * @returns {string} Source.
   */
  get source () { return this.#_source; }

  /**
   * Set source.
   * @param {string} s - Replacement source.
   */
  set source (s) {
    if (typeof s === 'string') {
      this.#_source = s;
    } else {
      throw new TypeError('Source must be a String!');
    }
  }

  /**
   * Produces a string representation of the story format object.
   * @function toString
   * @returns {string} - A string representation of the story format.
   */
  toString() {
    return JSON.stringify(this, null, "\t");
  }

  /**
   * Produces a JSON representation of the story format object.
   * @function toJSON
   * @returns {object} - A JSON representation of the story format.
   */
  toJSON() {
    // name: (string) Optional. The name of the story format. (Omitting the name will lead to an Untitled Story Format.)
    // Set a default name.
    let name = "Untitled Story Format";

    // Check if the story format is not an empty string.
    if (this.name.length > 0) {
      // Update the name.
      name = this.name;
    }

    // version: (string) Required, and semantic version-style formatting (x.y.z, e.g., 1.2.1) of the version is also required.

    // Check if the version is valid. If not, throw an error.
    if (!valid(this.version)) {
      throw new TypeError('ERROR: Version must be a valid semantic version!');
    }

    return JSON.stringify({
      name,
      version: this.version,
      description: this.description,
      author: this.author,
      image: this.image,
      url: this.url,
      license: this.license,
      proofing: this.proofing,
      source: this.source
    });
  }
}
