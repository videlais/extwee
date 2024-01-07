/**
 * Parses Twine 1 HTML into a Story object.
 *
 * See: Twine 1 HTML Output Documentation
 * (https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md)
 * @param {string} content - Twine 1 HTML content to parse.
 * @returns {Story} Story object
 */
export function parse(content: string): Story;
import Story from '../Story.js';
