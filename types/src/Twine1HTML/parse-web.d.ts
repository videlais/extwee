/**
 * Web-optimized Twine 1 HTML parser with reduced dependencies
 * Parses Twine 1 HTML into a Story object using lightweight DOM parsing
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md Twine 1 HTML Documentation}
 * @function parse
 * @param {string} content - Twine 1 HTML content to parse.
 * @returns {Story} Story object
 */
export function parse(content: string): Story;
import { Story } from '../Story.js';
