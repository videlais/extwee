import { name, version } from '../package.json';
import Passage from './Passage';

/**
 * @class Story
 * @module Story
 */
class Story {
  /**
   * @function Story
   * @class
   */
  constructor () {
    // Name of the story
    this.name = 'Unknown';

    // Story metadata
    this.metadata = {
      ifid: '',
      format: '',
      formatVersion: '',
      zoom: '',
      start: null
    };

    // Internal passages
    this.passages = [];

    // Store the user script separately
    this.scriptPassage = null;

    // Store the user stylesheet separately
    this.stylesheetPassage = null;

    // Store the creator and version
    this.creator = name;
    this.creatorVersion = version;
  }

  /**
   * Add a passage to the story
   *
   * @function addPassage
   * @param {Passage} p - Passage to add to Story
   */
  addPassage (p) {
    // Check if passed argument is a PAssage
    if (p instanceof Passage) {
      // Push the passage to the array
      this.passages.push(p);
    } else {
      // Throw an error
      throw new Error('Can only add Passages to the story!');
    }
  }

  /**
   * Find passages by tags
   *
   * @function getPassagesByTag
   * @param {string} t - Passage name to search for
   * @returns {Array} Return array of passages
   */
  getPassagesByTag (t = '') {
    // Look through passages
    return this.passages.filter((passage) => {
      // Look through each passage's tags
      return passage.tags.some((tag) => t === tag);
    });
  }

  /**
   * Find passage by name
   *
   * @function getPassageByName
   * @param {string} name - Passage name to search for
   * @returns {object | null} Return passage or null
   */
  getPassageByName (name = '') {
    // Look through passages
    const results = this.passages.filter((passage) => passage.name === name);
    // Return first entry or null, if not found
    return results.length > 0 ? results[0] : null;
  }

  /**
   * Find passage by PID
   *
   * @function getPassageByPID
   * @param {number} pid - Passage PID to search for
   * @returns {object | null} Return passage or null
   */
  getPassageByPID (pid = -1) {
    // Look through passages
    const results = this.passages.filter((passage) => passage.pid === pid);
    // Return first entry or null, if not found
    return results.length > 0 ? results[0] : null;
  }

  /**
   * Find the starting passages
   *
   * @function getStartingPassage
   * @returns {string|null} Return passage name or null
   */
  getStartingPassage () {
    let pid = null;

    // Is there a start property?
    if (Object.prototype.hasOwnProperty.call(this.metadata, 'start')) {
      // Check if the property is null
      if (this.metadata.start !== null) {
        // Look for the passage by name
        const result = this.getPassageByName(this.metadata.start);
        // If the search found something, save the PID
        if (result !== null) {
          pid = result.pid;
        }
      }
    } else {
      // Since there was not a 'start' property, look for Start passage
      const results = this.getPassageByName('Start');
      // Did we get any results?
      if (results !== null) {
        // Save the first one
        pid = results.pid;
      }
    }

    // We either found it or this will be null
    return pid;
  }
}

export default Story;
