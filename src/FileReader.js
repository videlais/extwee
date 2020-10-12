const fs = require('fs');
/**
 * @class FileReader
 * @module FileReader
 */
class FileReader {
  /**
   * Read a text file
   *
   * @function readFile
   * @param {string} file - File to read
   * @returns {string} content
   */
  static read (file) {
    // Setup default value
    let contents = '';

    // Attempt to find the file
    if (fs.existsSync(file)) {
      // The file exists.
      contents = fs.readFileSync(file, 'utf8');
    } else {
      throw new Error('Error: File not found!');
    }

    // Return default or updated values
    return contents;
  }
}

module.exports = FileReader;
