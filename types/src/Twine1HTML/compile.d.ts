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
export function compile(story: Story, engine?: string, header?: string, name?: string, codeJS?: string, config?: {
    jquery: string;
    modernizr: string;
}): string;
import Story from '../Story.js';
