export default parse;
/**
 * Parse Twine 2 HTML into Story object.
 *
 * See: Twine 2 HTML Output Specification
 * (https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md)
 * @param {string} content - Twine 2 HTML content to parse.
 * @returns {Story} Story
 */
export function parse(content: string): Story;
/**
 * Try to escape Twine 2 meta-characters.
 * @param {string} result - Text to parse.
 * @returns {string} Escaped characters.
 */
export function escapeMetacharacters(result: string): string;
import Story from '../Story.js';
