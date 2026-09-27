/**
 * Write a combination of Story object, `engine.js` (from Twine 1), `header.html`, and optional `code.js`.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md Twine 1 HTML Documentation}
 * @function compile
 * @param {Story} story - Story object to write.
 * @param {string} [engine] - Source of `engine.js` file from Twine 1.
 * @param {string} [header] - `header.html` content for Twine 1 story format.
 * @param {string} [name] - Name of the story format (needed for `code.js` inclusion).
 * @param {string} [codeJS] - `code.js` content with additional JavaScript.
 * @param {object} [config] - Limited configuration object acting in place of `StorySettings`.
 * @param {string} config.jquery - jQuery source.
 * @param {string} config.modernizr - Modernizr source.
 * @returns {string} Twine 1 HTML.
 * @throws {TypeError} Error: story must be a Story object!
 * @example
 * import { readFileSync } from 'node:fs';
 * import { parseTwee, compileTwine1HTML } from 'extwee';
 * const story = parseTwee(readFileSync('story.twee', 'utf8'));
 * const html = compileTwine1HTML(
 *   story,
 *   readFileSync('engine.js', 'utf8'),
 *   readFileSync('sugarcane/header.html', 'utf8'),
 *   'sugarcane',
 *   readFileSync('sugarcane/code.js', 'utf8')
 * );
 */
export function compile(story: Story, engine?: string, header?: string, name?: string, codeJS?: string, config?: {
    jquery: string;
    modernizr: string;
}): string;
import { Story } from '../Story.js';
