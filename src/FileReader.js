const fs = require('fs');
/**
 * @class FileReader
 * @module FileReader
 */
class FileReader {
  /**
   * @function FileReader
   * @class
   * @param {string} file - File to read
   */
  constructor (file) {
    this.contents = '';
    this.readFile(file);
  }

  /**
   * Read a text file
   *
   * @function readFile
   * @param {string} file - File to read
   * @returns {void}
   */
  readFile (file) {
    // Attempt to find the file
    if (fs.existsSync(file)) {
      // The file exists.
      this.contents = fs.readFileSync(file, 'utf8');
    } else {
      throw new Error('Error: File not found!');
    }
  }
}

module.exports = FileReader;
