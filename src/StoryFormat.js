import { valid } from 'semver';

/**
 * StoryFormat representing a Twine 2 story format.
 * 
 * This class has type checking on all of its properties.
 * If a property is set to a value of the wrong type, a TypeError will be thrown.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-storyformats-spec.md Twine 2 Story Formats Specification}
 * @class
 * @classdesc A class representing a Twine 2 story format.
 * @property {string} name - Display name shown in Twine (e.g. `Harlowe`).
 * @property {string} version - The semantic version of the story format.
 * @property {string} description - HTML description shown in Twine's story format list.
 * @property {string} author - Person or group credited with creating the story format.
 * @property {string} image - File name of an icon (relative to the format file) shown in Twine.
 * @property {string} url - Home page URL of the story format.
 * @property {string} license - License identifier (e.g. `MIT`).
 * @property {boolean} proofing - Whether this is a proofing format rather than a playable one.
 * @property {string} source - HTML template containing `{{STORY_NAME}}` and `{{STORY_DATA}}` placeholders.
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

  /**
   * Create a story format.
   * @param {string} [name] - Display name (defaults to `Untitled Story Format`).
   * @param {string} [version] - Semantic version (e.g. `1.0.0`).
   * @param {string} [description] - HTML description shown in Twine.
   * @param {string} [author] - Author name.
   * @param {string} [image] - Icon file name, relative to the format file.
   * @param {string} [url] - Home page URL.
   * @param {string} [license] - License name.
   * @param {boolean} [proofing] - Whether this is a proofing format.
   * @param {string} [source] - HTML template with `{{STORY_NAME}}` and `{{STORY_DATA}}` placeholders.
   * @throws {TypeError} If any argument has the wrong type (see the individual setters).
   */
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
   * Name of the story format as shown in Twine (e.g. `Harlowe`).
   * @returns {string} Display name.
   */
  get name () { return this.#_name; }

  /**
   * Set name.
   * @param {string} n - New story format name.
   * @throws {TypeError} Name must be a string!
   */
  set name (n) {
    if (typeof n === 'string') {
      this.#_name = n;
    } else {
      throw new TypeError('Name must be a string!');
    }
  }

  /**
   * Semantic version of the story format. Must be valid semver when calling {@link StoryFormat#toJSON}.
   * @returns {string} Version string.
   */
  get version () { return this.#_version; }

  /**
   * Set version. Semver validity is not checked until {@link StoryFormat#toJSON}.
   * @param {string} n - New version string.
   * @throws {TypeError} Version must be a string!
   */
  set version (n) {
    if (typeof n === 'string') {
      this.#_version = n;
    } else {
      throw new TypeError('Version must be a string!');
    }
  }

  /**
   * HTML description shown in Twine's story format list.
   * @returns {string} Description markup.
   */
  get description () { return this.#_description; }

  /**
   * Set description.
   * @param {string} d - New description markup.
   * @throws {TypeError} Description must be a string!
   */
  set description (d) {
    if (typeof d === 'string') {
      this.#_description = d;
    } else {
      throw new TypeError('Description must be a string!');
    }
  }

  /**
   * Person or group credited with creating the story format.
   * @returns {string} Author name.
   */
  get author () { return this.#_author; }

  /**
   * Set author.
   * @param {string} a - New author name.
   * @throws {TypeError} Author must be a string!
   */
  set author (a) {
    if (typeof a === 'string') {
      this.#_author = a;
    } else {
      throw new TypeError('Author must be a string!');
    }
  }

  /**
   * File name of the icon shown in Twine, relative to the story format file.
   * @returns {string} Icon file name.
   */
  get image () { return this.#_image; }

  /**
   * Set image.
   * @param {string} i - New icon file name.
   * @throws {TypeError} Image must be a string!
   */
  set image (i) {
    if (typeof i === 'string') {
      this.#_image = i;
    } else {
      throw new TypeError('Image must be a string!');
    }
  }

  /**
   * Home page URL of the story format.
   * @returns {string} Home page URL.
   */
  get url () { return this.#_url; }

  /**
   * Set URL.
   * @param {string} u - New home page URL.
   * @throws {TypeError} URL must be a string!
   */
  set url (u) {
    if (typeof u === 'string') {
      this.#_url = u;
    } else {
      throw new TypeError('URL must be a string!');
    }
  }

  /**
   * License of the story format (e.g. `MIT`).
   * @returns {string} License name.
   */
  get license () { return this.#_license; }

  /**
   * Set license.
   * @param {string} l - New license name.
   * @throws {TypeError} License must be a string!
   */
  set license (l) {
    if (typeof l === 'string') {
      this.#_license = l;
    } else {
      throw new TypeError('License must be a string!');
    }
  }

  /**
   * Whether this is a proofing format (for reviewing a story) rather than a playable one.
   * @returns {boolean} `true` for proofing formats.
   */
  get proofing () { return this.#_proofing; }

  /**
   * Set proofing.
   * @param {boolean} p - `true` to mark as a proofing format.
   * @throws {TypeError} Proofing must be a Boolean!
   */
  set proofing (p) {
    if (typeof p === 'boolean') {
      this.#_proofing = p;
    } else {
      throw new TypeError('Proofing must be a Boolean!');
    }
  }

  /**
   * HTML template of the story format, containing `{{STORY_NAME}}` and `{{STORY_DATA}}` placeholders.
   * @returns {string} HTML template.
   */
  get source () { return this.#_source; }

  /**
   * Set source.
   * @param {string} s - New HTML template.
   * @throws {TypeError} Source must be a String!
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
   * @returns {string} Tab-indented JSON string.
   * @throws {TypeError} ERROR: Version must be a valid semantic version!
   */
  toString() {
    return JSON.stringify(JSON.parse(this.toJSONString()), null, "\t");
  }

  /**
   * Produces a JSON string of the story format. Same as {@link StoryFormat#toJSONString}.
   *
   * **Note:** Unlike the usual `toJSON()` convention, this returns a string, not an object.
   * Do not pass a StoryFormat to `JSON.stringify()`, directly or nested; the output will be encoded twice.
   * Use {@link StoryFormat#toJSONString} when you need JSON text. This is planned to return an object in 3.0.
   * @see {@link https://github.com/videlais/extwee/issues/799 Issue #799}
   * @returns {string} JSON string of all story format properties.
   * @throws {TypeError} ERROR: Version must be a valid semantic version!
   */
  toJSON() {
    return this.toJSONString();
  }

  /**
   * Produces a JSON string of the story format. An empty name is written as `Untitled Story Format`.
   * @returns {string} JSON string of all story format properties.
   * @throws {TypeError} ERROR: Version must be a valid semantic version!
   */
  toJSONString() {
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
