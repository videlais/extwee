const pkg = require('../package.json');
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
    this.name = 'Unknown';
    this.metadata = {
      ifid: '',
      format: '',
      formatVersion: '',
      zoom: '',
      start: null
    };

    this.passages = [];

    // Store the creator and version
    this.creator = pkg.name;
    this.creatorVersion = pkg.version;
  }

  /**
   * Search for passages with the 'stylesheet' tag
   *
   * @function getStylePassages
   * @returns {Array} - Empty or array of passages
   */
  getStylePassages () {
    let stylePassages = [];

    if (this.passages.length > 0) {
      stylePassages = this.passages.filter(function (passage) {
        const results = passage.tags.filter(tag => tag === 'stylesheet');
        return (results.length > 0);
      });
    }

    return stylePassages;
  }

  /**
   * Search for passages with the 'script' tag
   *
   * @function getScriptPassages
   * @returns {Array}  - Empty or array of passages
   */
  getScriptPassages () {
    let scriptPassages = [];

    if (this.passages.length > 0) {
      scriptPassages = this.passages.filter(function (passage) {
        const results = passage.tags.filter(tag => tag === 'script');
        return (results.length > 0);
      });
    }

    return scriptPassages;
  }

  /**
   * Delete specific passages by their tag
   *
   * @function deleteAllByTag
   * @param {string} searchTag - Tag to search for
   * @returns {void}
   */
  deleteAllByTag (searchTag) {
    if (this.passages.length > 0) {
      this.passages = this.passages.filter(function (passage) {
        return !passage.tags.includes(searchTag);
      });
    }
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

module.exports = Story;
