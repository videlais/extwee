/**
 * @class StoryFormat
 * @module StoryFormat
 */
export default class StoryFormat {
  /**
   * Internal name
   *
   * @private
   */
  #_name = '';

  /**
   * Internal version
   *
   * @private
   */
  #_version = '';

  /**
   * Internal description
   *
   * @private
   */
  #_description = '';

  /**
   * Internal author
   *
   * @private
   */
  #_author = '';

  /**
   * Internal image
   *
   * @private
   */
  #_image = '';

  /**
   * Internal URL
   *
   * @private
   */
  #_url = '';

  /**
   * Internal license
   *
   * @private
   */
  #_license = '';

  /**
   * Internal proofing
   *
   * @private
   */
  #_proofing = '';

  /**
   * Internal source
   *
   * @private
   */
  #_source = '';

  /**
   * @function StoryFormat
   * @class
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
   *
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
   *
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
   *
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
   *
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
   *
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
   *
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
   *
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
   *
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
   *
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
}
