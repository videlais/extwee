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
 * @class HTMLWriter
 * @module HTMLWriter
 */
export default class HTMLWriter {
  /**
   * Write story to file using story format and adding any CSS and JS
   *
   * @public
   * @static
   * @function writeFile
   * @param {string} file - File to write
   * @param {Story} story - Story object to write
   * @param {StoryFormat} storyFormat - StoryFormat to write
   */
  static write (file, story, storyFormat) {
    if (!(story instanceof Story)) {
      throw new Error('Error: story must be a Story object!');
    }

    if (!(storyFormat instanceof StoryFormat)) {
      throw new Error('storyFormat must be a StoryFormat object!');
    }

    let outputContents = '';

    // Build <tw-storydata>
    let storyData =
            `<tw-storydata name="${story.name}" ` +
            `startnode="${story.start.pid}" ` +
            `creator="${story.creator}" ` +
            `creator-version="${story.creatorVersion}" ` +
            `ifid="${story.IFID}" ` +
            `zoom="${story.zoom}" ` +
            `format="${storyFormat.name}" ` +
            `format-version="${storyFormat.version}" ` +
            'options hidden>\n';

    // Start the STYLE
    storyData += '<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">';

    // Check if there is stylesheet content
    if (story.stylesheetPassage !== null) {
      // Get the text
      storyData += story.stylesheetPassage.text;
    }

    // Close the STYLE
    storyData += '</style>\n';

    // Start the SCRIPT
    storyData += '<script role="script" id="twine-user-script" type="text/twine-javascript">';

    // Check if there is script content
    if (story.scriptPassage !== null) {
      // Get the text
      storyData += story.scriptPassage.text;
    }

    // Close SCRIPT
    storyData += '</script>\n';

    // Build the passages
    story.forEach((passage) => {
      /**
       * pid: (string) Required.
       *   The Passage ID (PID).
       *
       * name: (string) Required.
       *   The name of the passage.
       */
      storyData += `<tw-passagedata pid="${passage.pid}" name="${passage.name}"`;

      /**
       * tags: (string) Optional.
       *   Any tags for the passage separated by spaces.
       */
      if (passage.tags.length > 1) {
        storyData += ` tags="${passage.tags.join(' ')}" `;
      } else if (passage.tags.length === 1) {
        storyData += ` tags="${passage.tags[0]}" `;
      }

      /**
       * position: (string) Optional.
       *   Comma-separated X and Y position of the upper-left of the passage
       *   when viewed within the Twine 2 editor.
       */
      if (Object.prototype.hasOwnProperty.call(passage.metadata, 'position')) {
        storyData += ` position="${passage.metadata.position}" `;
      }

      /**
       * size: (string) Optional.
       *   Comma-separated width and height of the passage
       *   when viewed within the Twine 2 editor.
       */
      if (Object.prototype.hasOwnProperty.call(passage.metadata, 'size')) {
        storyData += `size="${passage.metadata.size}" `;
      }

      storyData += `>${passage.text}</tw-passagedata>\n`;
    });

    storyData += '</tw-storydata>';

    // Replace the story name in the source file
    storyFormat.source = storyFormat.source.replace('{{STORY_NAME}}', story.name);

    // Replace the story data
    storyFormat.source = storyFormat.source.replace('{{STORY_DATA}}', storyData);

    outputContents += storyFormat.source;

    try {
      // Try to write
      fs.writeFileSync(file, outputContents);
    } catch (event) {
      // Throw error
      throw new Error('Error: Cannot write HTML file!');
    }
  }
}
