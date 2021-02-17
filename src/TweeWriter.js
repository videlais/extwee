/**
 * @external Story
 * @see Story.js
 * @external Passage
 * @see Passage.js
 */

import fs from 'fs';
import Story from './Story.js';
import { v4 as uuidv4 } from 'uuid';

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

    // Write the StoryData first.
    let outputContents = ':: StoryData\n';

    // Create default object.
    const metadata = {};

    // Is there an IFID?
    if (story.IFID === '') {
      // Generate a new IFID for this work.
      // Twine 2 uses v4 (random) UUIDs, using only capital letters.
      metadata.ifid = uuidv4().toUpperCase();
    } else {
      // Use existing (non-default) value.
      metadata.ifid = story.IFID;
    }

    // Is there a format?
    if (story.format !== '') {
      // Using existing format
      metadata.format = story.format;
    }

    // Is there a formatVersion?
    if (story.formatVersion !== '') {
      // Using existing format version
      metadata['format-version'] = story.formatVersion;
    }

    // Is there a zoom?
    if (story.zoom !== 0) {
      // Using existing zoom.
      metadata.zoom = story.zoom;
    }

    // Is there a start?
    if (story.start !== '') {
      // Using existing start
      metadata.start = story.start;
    }

    // Get number of colors.
    const numberOfColors = Object.keys(story.tagColors).length;
    // Are there any colors?
    if (numberOfColors > 0) {
      // Add a tag-colors property
      metadata['tag-colors'] = story.tagColors;
    }

    // Write out the story metadata.
    outputContents += `${JSON.stringify(metadata, undefined, 2)}`;

    // Add two newlines.
    outputContents += '\n\n';

    // For each passage, append it to the output.
    story.forEach((passage) => {
      // For each passage, append it to the output.
      outputContents += passage.toString();
    });

    try {
      // Try to write
      fs.writeFileSync(file, outputContents);
    } catch (event) {
      // Throw error
      throw new Error('Error: Cannot write Twee file!');
    }
  }
}
