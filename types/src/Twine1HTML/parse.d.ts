/**
 * Parses Twine 1 HTML into a Story object.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md Twine 1 HTML Documentation}
 * @function parse
 * @param {string} content - Twine 1 HTML content to parse.
 * @returns {Story} Story object
 * @throws {Error} Cannot find #storeArea or #store-area!
 * @example
 * import { readFileSync } from 'node:fs';
 * import { parseTwine1HTML } from 'extwee';
 * const story = parseTwine1HTML(readFileSync('story.html', 'utf8'));
 * console.log(story.size());
 */
export function parse(content: string): Story;
import { Story } from '../Story.js';
