import fs from 'fs';

export default class FileReader {
  /**
   * Read a text file.
   * @param {string} file - Path of file to read
   * @returns {string} Content of file
   */
  static read (file) {
    // Setup default value.
    let contents = '';

    // Attempt to find the file.
    if (fs.existsSync(file)) {
      // The file exists.
      contents = fs.readFileSync(file, 'utf8');
    } else {
      // Throw error if file does not exist.
      throw new Error('Error: File not found!');
    }

    // Return default or updated values.
    return contents;
  }

  /**
   * Read a binary file and return a Buffer of raw data.
   * @param {string} file - Path of file to read.
   * @returns {string} Content of file.
   */
  static readBinaryAsBuffer (file) {
    // Setup default value.
    let contents = '';

    // Attempt to find the file.
    if (fs.existsSync(file)) {
      // The file exists.
      contents = fs.readFileSync(file, 'binary');
    } else {
      // Throw error if file does not exist.
      throw new Error('Error: File not found!');
    }

    // Return default or updated values.
    return Buffer.from(contents, 'binary');
  }
}
