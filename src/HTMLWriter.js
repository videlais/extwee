/**
 * @external Story
 * @see Story.js
 * @external StoryFormat
 * @see StoryFormat.js
 */

import fs from 'fs';
import Story from './Story.js';
import StoryFormat from './StoryFormat.js';
import { v4 as uuidv4 } from 'uuid';

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
    let storyData = '';

    // Look for StoryTitle
    const storyTitle = story.getPassageByName('StoryTitle');

    if (storyTitle != null) {
      // Use StoryTitle for name
      storyData += `<tw-storydata name="${storyTitle.text}"`;
    } else {
      throw new Error("'name' is required attribute. (Add StoryTitle to story.)");
    }

    // Does start exist?
    if (story.start !== '') {
      // Try to get starting passage
      const startingPassage = story.getPassageByName(story.start);
      // Does it exist currently?
      if (startingPassage !== null) {
        // Add the starting passage
        storyData += ` startnode="${startingPassage.pid}"`;
      } else {
        // Throw error if no starting passage exists
        throw new Error('Starting passage not found');
      }
    } else {
      // Throw error if no starting passage exists
      throw new Error('No starting passage found!');
    }

    // Defaults to 'extwee' if missing.
    storyData += ` creator="${story.creator}"`;

    // Default to extwee version.
    storyData += ` creator-version="${story.creatorVersion}"`;

    // Check if IFID exists.
    if (story.IFID !== '') {
      // Write the existing IFID
      storyData += ` ifid="${story.IFID}"`;
    } else {
      // Generate a new IFID
      // Twine 2 uses v4 (random) UUIDs, using only capital letters
      storyData += ` ifid="${uuidv4().toUpperCase()}"`;
    }

    // Write existing or default value.
    storyData += ` zoom="${story.zoom}"`;

    // Write existing or default value.
    storyData += ` format="${storyFormat.name}"`;

    // Write existing or default value.
    storyData += ` format-version="${storyFormat.version}"`;

    // Add the default.
    storyData += ' options hidden>\n';

    // Start the STYLE.
    storyData += '\t<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">';

    // Get stylesheet passages
    const stylesheetPassages = story.getPassagesByTag('stylesheet');

    // Concatenate passages
    stylesheetPassages.forEach((passage) => {
      // Add text of passages
      storyData += passage.text;
      // Remove from story
      story.removePassage(passage);
    });

    // Close the STYLE
    storyData += '</style>\n';

    // Start the SCRIPT
    storyData += '\t<script role="script" id="twine-user-script" type="text/twine-javascript">';

    // Get stylesheet passages
    const scriptPassages = story.getPassagesByTag('script');

    // Concatenate passages
    scriptPassages.forEach((passage) => {
      // Add text of passages
      storyData += passage.text;
      // Remove from story
      story.removePassage(passage);
    });

    // Close SCRIPT
    storyData += '</script>\n';

    // Build the passages
    story.forEach((passage) => {
      // Start the passage element
      storyData += '\t<tw-passagedata';

      /**
       * pid: (string) Required.
       *   The Passage ID (PID).
       */
      storyData += ` pid="${passage.pid}"`;

      /**
       * name: (string) Required.
       *   The name of the passage.
       */
      storyData += ` name="${passage.name}"`;

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
    storyFormat.source = storyFormat.source.replace(/{{STORY_NAME}}/g, story.name);

    // Replace the story data
    storyFormat.source = storyFormat.source.replace('{{STORY_DATA}}', storyData);

    // Combine everything together.
    outputContents += storyFormat.source;

    try {
      // Try to write.
      fs.writeFileSync(file, outputContents);
    } catch (event) {
      // Throw error
      throw new Error('Error: Cannot write HTML file!');
    }
  }
}
