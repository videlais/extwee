import fs from 'fs';
import Story from './Story.js';

export default class Twine1HTMLWriter {
  /**
   * Write a combination of Story, `header.html`, and optional `code.js`.
   * The `engine.js` file is licensed under GPL from Twine 1.4.2 source code.
   * @param {string} file - File to write.
   * @param {Story} story - Story object to write.
   * @param {string} header - `header.html` content for Twine 1 story format.
   * @param {string} name - Name of the story format (needed for `code.js` inclusion).
   * @param {string} codeJS - `code.js` content with additional JavaScript.
   * @param {object} config - Limited configuration object acting in place of `StorySettings`.
   * @param {boolean} config.jquery - If historical jQuery should be included or not.
   * @param {boolean} config.modernizr - If historical Modernizr should be included or not.
   */
  static write (file, story, header = '', name = '', codeJS = '', config = { jquery: false, modernizr: false }) {
    // We must have a Story object.
    if (!(story instanceof Story)) {
      throw new TypeError('Error: story must be a Story object!');
    }

    // Replace the "VERSION" with story.creator.
    header = header.replaceAll(/"VERSION"/gm, story.creator);

    // Replace the "TIME" with new Date().
    header = header.replaceAll(/"TIME"/gm, new Date());

    // Read the `engine.js` code.
    const engineJS = fs.readFileSync(`${process.cwd()}/Twine1/engine.js`);

    // Replace the ENGINE with `engine.js` code.
    header = header.replaceAll(/"ENGINE"/gm, engineJS);

    // Replace the NAME (e.g. "JONAH") with `engine.js` code.
    header = header.replaceAll(`"${name.toUpperCase()}"`, codeJS);

    // Replace "STORY_SIZE".
    header = header.replaceAll(/"STORY_SIZE"/gm, `"${story.size()}"`);

    // Replace "STORY" with Twine 1 HTML.
    header = header.replaceAll(/"STORY"/gm, story.toTwine1HTML());

    // Replace START_AT with ''.
    header = header.replaceAll(/"START_AT"/gm, '\'\'');

    // Does 'jquery' exist?
    if (Object.prototype.hasOwnProperty.call(config, 'jquery')) {
      // Is this true?
      if (config.jquery === true) {
        // Read the jquery code.
        const jquery = fs.readFileSync(`${process.cwd()}/Twine1/jquery.js`);
        // Replace JQUERY with jQuery.
        header = header.replaceAll(/"JQUERY"/gm, jquery);
      }
    }

    // Does 'modernizr' exist?
    if (Object.prototype.hasOwnProperty.call(config, 'modernizr')) {
      // Is this true?
      if (config.modernizr === true) {
        // Read the modernizr code.
        const modernizr = fs.readFileSync(`${process.cwd()}/Twine1/modernizr.js`);
        // Replace JQUERY with jQuery.
        header = header.replaceAll(/"MODERNIZR"/gm, modernizr);
      }
    }

    try {
      // Try to write.
      fs.writeFileSync(file, header);
    } catch (event) {
      // Throw error.
      throw new Error('Error: Cannot write Twine 1 HTML file!');
    }
  }
}
