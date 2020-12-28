/**
 * @external Story
 * @see Story.js
 * @external Passage
 * @see Passage.js
 */

import fs from 'fs';
import Story from './Story.js';
import Passage from './Passage.js';

/**
 * @class TweeWriter
 * @module TweeWriter
 */
export default class TweeWriter {
  /**
   * Write to a file using a Story object
   *
   * @static
   * @param {Story} story - Story format to write
   * @param {string} file - File to write to
   * @returns {void}
   */
  static write (story, file) {
    if (!(story instanceof Story)) {
      throw new Error('Not a Story object!');
    }

    // Write StoryTitle first
    let outputContents = `:: StoryTitle\n${story.name}\n\n`;

    // Write the StoryData second
    outputContents += ':: StoryData\n';

    // Test if story.metadata is an object or not
    if (typeof story.metadata === 'object') {
      // Write any metadata in pretty format
      outputContents += ` ${JSON.stringify(story.metadata, undefined, 2)}`;
    } else {
      // If, for whatever reason, story.metadata is not an object, throw error.
      throw new Error('Story Metadata MUST be an object!');
    }

    // Add two newlines
    outputContents += '\n\n';

    // Are there any passages?
    if (story.passages.length > 0) {
      // Build the contents
      for (const passage of story.passages) {
        // Concatenate passage
        outputContents += this.concatPassage(passage, outputContents);
      }
    } else {
      // Create empty Start passage
      outputContents += ':: Start\n';
    }

    try {
      // Try to write
      fs.writeFileSync(file, outputContents);
    } catch (event) {
      // Throw error
      throw new Error('Error: Cannot write Twee file!');
    }
  }

  /**
   * Concatenate a Passage's content to a String value
   *
   * @public
   * @static
   * @param {Passage} passage - Passage to concatenate
   * @param {string} content - Existing value to append
   * @returns {string} Appended string value
   */
  static concatPassage (passage, content) {
    // Test if argument is Passage
    if (passage instanceof Passage) {
      // Write the name
      content += `:: ${passage.name} `;

      // Test if it has any tags
      if (passage.tags.length > 0) {
        // Write output of tags
        content += `[${passage.tags.join(' ')}`;
      }

      // Write out a space and then passage metadata
      content += ` ${JSON.stringify(passage.metadata)}`;

      // Add newline, text, and two newlines
      content += `\n${passage.text}\n\n`;
    } else {
      // Can only write Passage.
      // If this is not a Passage, throw error!
      throw new Error('Argument must be instance of Passage!');
    }

    // Return the appended content
    return content;
  }
}
