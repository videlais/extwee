/**
 * @class Passage
 * @module Passage
 */
class Passage {
  /**
   * @function Passage
   * @class
   * @param {string} name - Name of passage
   * @param {Array} tags - Tags
   * @param {object} metadata - Metadata
   * @param {string} text - Passage Content
   * @param {number} pid - Passage ID (PID)
   */
  constructor (name = '', tags = [], metadata = {}, text = '', pid = 1) {
    this.name = name;
    this.tags = tags;
    this.metadata = metadata;
    this.text = text;
    this.pid = pid;
  }
}

module.exports = Passage;
