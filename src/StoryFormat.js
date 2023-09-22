/**
 * @class StoryFormat
 * @module StoryFormat
 */
export default class StoryFormat {
  /**
   * Internal name
   * @private
   */
  #_name = '';

  /**
   * Internal version
   * @private
   */
  #_version = '';

  /**
   * Internal description
   * @private
   */
  #_description = '';

  /**
   * Internal author
   * @private
   */
  #_author = '';

  /**
   * Internal image
   * @private
   */
  #_image = '';

  /**
   * Internal URL
   * @private
   */
  #_url = '';

  /**
   * Internal license
   * @private
   */
  #_license = '';

  /**
   * Internal proofing
   * @private
   */
  #_proofing = '';

  /**
   * Internal source
   * @private
   */
  #_source = '';

  /**
   * @class
   * @function StoryFormat
   * @param {string} name - Name
   * @param {string} version - Version
   * @param {string} description - Description
   * @param {string} author - Author
   * @param {string} image - Image
   * @param {string} url - URL
   * @param {string} license - License
   * @param {boolean} proofing - If proofing or not
   * @param {string} source - Source
   */
  constructor (
    name = '',
    version = '',
    description = '',
    author = '',
    image = '',
    url = '',
    license = '',
    proofing = false,
    source = ''
  ) {
    // Set name
    this.name = name;

    // Set version
    this.version = version;

    // Set description
    this.description = description;

    // Set author
    this.author = author;

    // Set image
    this.image = image;

    // Set URL
    this.url = url;

    // Set license
    this.license = license;

    // Set proofing
    this.proofing = proofing;

    // Set source
    this.source = source;
  }

  /**
   * Name
   * @public
   * @memberof StoryFormat
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
      throw new Error('Name must be a string!');
    }
  }

  /**
   * Version
   * @public
   * @memberof StoryFormat
   * @returns {string} Version
   */
  get version () { return this.#_version; }

  /**
   * @param {string} n - Replacement version
   */
  set version (n) {
    if (typeof n === 'string') {
      this.#_version = n;
    } else {
      throw new Error('Version must be a string!');
    }
  }

  /**
   * Description
   * @public
   * @memberof StoryFormat
   * @returns {string} Description
   */
  get description () { return this.#_description; }

  /**
   * @param {string} d - Replacement description
   */
  set description (d) {
    if (typeof d === 'string') {
      this.#_description = d;
    } else {
      throw new Error('Description must be a string!');
    }
  }

  /**
   * Author
   * @public
   * @memberof StoryFormat
   * @returns {string} Author
   */
  get author () { return this.#_author; }

  /**
   * @param {string} a - Replacement author
   */
  set author (a) {
    if (typeof a === 'string') {
      this.#_author = a;
    } else {
      throw new Error('Author must be a string!');
    }
  }

  /**
   * Image
   * @public
   * @memberof StoryFormat
   * @returns {string} Image
   */
  get image () { return this.#_image; }

  /**
   * @param {string} i - Replacement image
   */
  set image (i) {
    if (typeof i === 'string') {
      this.#_image = i;
    } else {
      throw new Error('Image must be a string!');
    }
  }

  /**
   * URL
   * @public
   * @memberof StoryFormat
   * @returns {string} URL
   */
  get url () { return this.#_url; }

  /**
   * @param {string} u - Replacement URL
   */
  set url (u) {
    if (typeof u === 'string') {
      this.#_url = u;
    } else {
      throw new Error('URL must be a string!');
    }
  }

  /**
   * License
   * @public
   * @memberof StoryFormat
   * @returns {string} License
   */
  get license () { return this.#_license; }

  /**
   * @param {string} l - Replacement license
   */
  set license (l) {
    if (typeof l === 'string') {
      this.#_license = l;
    } else {
      throw new Error('License must be a string!');
    }
  }

  /**
   * Proofing
   * @public
   * @memberof StoryFormat
   * @returns {boolean} Proofing
   */
  get proofing () { return this.#_proofing; }

  /**
   * @param {boolean} p - Replacement proofing
   */
  set proofing (p) {
    if (typeof p === 'boolean') {
      this.#_proofing = p;
    } else {
      throw new Error('Proofing must be a Boolean!');
    }
  }

  /**
   * Source
   * @public
   * @memberof StoryFormat
   * @returns {string} Source
   */
  get source () { return this.#_source; }

  /**
   * @param {string} s - Replacement source
   */
  set source (s) {
    if (typeof s === 'string') {
      this.#_source = s;
    } else {
      throw new Error('Source must be a String!');
    }
  }

  /**
   * Export as JSON representation.
   * @public
   * @function fromStoryFormat
   * @memberof StoryFormat
   * @returns {string} JSON string.
   */
  toJSON () {
    // Create an initial object for later serialization.
    const s = {
      name: this.name,
      version: this.version,
      description: this.description,
      author: this.author,
      image: this.image,
      url: this.url,
      license: this.license,
      proofing: this.proofing,
      source: this.source
    };

    // Return stringified JSON from object.
    return JSON.stringify(s);
  }

  /**
   * Import JSON representation.
   * (Warning: This will override all current values!)
   * @public
   * @function fromJSON
   * @memberof StoryFormat
   * @param {string} jsonString - JSON string.
   */
  fromJSON (jsonString) {
    // Create future object.
    let result = {};

    // Try to parse the string.
    try {
      result = JSON.parse(jsonString);
    } catch (error) {
      throw new Error('Invalid JSON!');
    }

    // Name
    if (Object.prototype.hasOwnProperty.call(result, 'name')) {
      // Set name.
      this.name = result.name;
    }

    // Version
    if (Object.prototype.hasOwnProperty.call(result, 'version')) {
      // Set version.
      this.version = result.version;
    }

    // Description
    if (Object.prototype.hasOwnProperty.call(result, 'description')) {
      // Set description.
      this.description = result.description;
    }

    // Author
    if (Object.prototype.hasOwnProperty.call(result, 'author')) {
      // Set author.
      this.author = result.author;
    }

    // Image
    if (Object.prototype.hasOwnProperty.call(result, 'image')) {
      // Set image.
      this.image = result.image;
    }

    // URL
    if (Object.prototype.hasOwnProperty.call(result, 'url')) {
      // Set URL.
      this.url = result.url;
    }

    // License
    if (Object.prototype.hasOwnProperty.call(result, 'license')) {
      // Set license.
      this.license = result.license;
    }

    // Proofing
    if (Object.prototype.hasOwnProperty.call(result, 'proofing')) {
      // Set proofing boolean.
      this.proofing = result.proofing;
    }

    // Source
    if (Object.prototype.hasOwnProperty.call(result, 'source')) {
      // Set source.
      this.source = result.source;
    }
  }
}
