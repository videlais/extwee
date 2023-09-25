/**
 * @external Story
 * @see Story.js
 * @external StoryFormat
 * @see StoryFormat.js
 */

import fs from 'fs';
import Story from './Story.js';
import StoryFormat from './StoryFormat.js';

/**
 * @class Twine2HTMLWriter
 * @module Twine2HTMLWriter
 */
export default class Twine2HTMLWriter {
  /**
   * Write a combination of Story + StoryFormat into Twine 2 HTML file.
   * @public
   * @static
   * @function writeFile
   * @param {string} file - File to write.
   * @param {Story} story - Story object to write.
   * @param {StoryFormat} storyFormat - StoryFormat to write.
   */
  static write (file, story, storyFormat) {
    if (!(story instanceof Story)) {
      throw new Error('Error: story must be a Story object!');
    }

    if (!(storyFormat instanceof StoryFormat)) {
      throw new Error('storyFormat must be a StoryFormat object!');
    }

    let outputContents = '';
    const storyData = story.toTwine2HTML();

    // Replace the story name in the source file.
    storyFormat.source = storyFormat.source.replaceAll(/{{STORY_NAME}}/gm, story.name);

    // Replace the story data.
    storyFormat.source = storyFormat.source.replaceAll(/{{STORY_DATA}}/gm, storyData);

    // Combine everything together.
    outputContents += storyFormat.source;

    try {
      // Try to write.
      fs.writeFileSync(file, outputContents);
    } catch (event) {
      // Throw error
      throw new Error('Error: Cannot write Twine 2 HTML file!');
    }
  }
}
