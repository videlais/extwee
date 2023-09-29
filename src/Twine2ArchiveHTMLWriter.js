import fs from 'node:fs';
import Story from './Story.js';

export default class Twine2ArchiveHTMLWriter {
  /**
   * Write array of Story objects into Twine 2 HTML Archive.
   * @param {string} file - Path of where to write file.
   * @param {Array} stories - Array of Story objects.
   */
  static write (file, stories) {
    // Can only parse string values.
    if (typeof file !== 'string') {
      throw new TypeError('Content is not a string!');
    }

    // Can only accept array.
    if (!Array.isArray(stories)) {
      throw new TypeError('Stories is not array!');
    }

    // Output
    let outputContents = '';

    // Go through each entry (which must be a Story).
    for (const story of stories) {
      // If this is not a story, throw a TypeError.
      if (!(story instanceof Story)) {
        // Throw TypeError.
        throw new TypeError('Error: story must be a Story object!');
      }

      // Append content.
      outputContents += story.toTwine2HTML();

      // Append newlines.
      outputContents += '\n\n';
    }

    try {
      // Try to write.
      fs.writeFileSync(file, outputContents);
    } catch (event) {
      // Throw error
      throw new Error('Error: Cannot write Twine 2 HTML file!');
    }
  }
}
