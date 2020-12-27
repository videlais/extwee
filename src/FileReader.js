import fs from 'fs';
/**
 * @class FileReader
 * @module FileReader
 */
export default class FileReader {
  /**
   * Read a text file
   *
   * @static
   * @public
   * @function readFile
   * @memberof FileReader
   * @param {string} file - Path of file to read
   * @returns {string} Content of file
   */
  static read (file) {
    // Setup default value
    let contents = '';

    // Attempt to find the file
    if (fs.existsSync(file)) {
      // The file exists.
      contents = fs.readFileSync(file, 'utf8');
    } else {
      // Throw error if file does not exist
      throw new Error('Error: File not found!');
    }

    // Return default or updated values
    return contents;
  }
}
