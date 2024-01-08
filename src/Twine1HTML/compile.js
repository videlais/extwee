import { Story } from '../Story.js';

/**
 * Write a combination of Story object, `engine.js` (from Twine 1), `header.html`, and optional `code.js`.
 * @param {Story} story - Story object to write.
 * @param {string} engine - Source of `engine.js` file from Twine 1.
 * @param {string} header - `header.html` content for Twine 1 story format.
 * @param {string} name - Name of the story format (needed for `code.js` inclusion).
 * @param {string} codeJS - `code.js` content with additional JavaScript.
 * @param {object} config - Limited configuration object acting in place of `StorySettings`.
 * @param {string} config.jquery - jQuery source.
 * @param {string} config.modernizr - Modernizr source.
 * @returns {string} Twine 1 HTML.
 */
function compile (story, engine = '', header = '', name = '', codeJS = '', config = { jquery: '', modernizr: '' }) {
  // We must have a Story object.
  if (!(story instanceof Story)) {
    throw new TypeError('Error: story must be a Story object!');
  }

  // Replace the "VERSION" with story.creator.
  header = header.replaceAll(/"VERSION"/gm, story.creator);

  // Replace the "TIME" with new Date().
  header = header.replaceAll(/"TIME"/gm, new Date());

  // Replace the ENGINE with `engine.js` code.
  header = header.replaceAll(/"ENGINE"/gm, engine);

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
    // Replace JQUERY with jQuery.
    header = header.replaceAll(/"JQUERY"/gm, config.jquery);
  }

  // Does 'modernizr' exist?
  if (Object.prototype.hasOwnProperty.call(config, 'modernizr')) {
    // Replace "MODERNIZR" with Modernizr.
    header = header.replaceAll(/"MODERNIZR"/gm, config.modernizr);
  }

  // Return code.
  return header;
}

export { compile };
