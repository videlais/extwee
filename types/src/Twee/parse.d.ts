/**
 * Parses Twee 3 text into a Story object.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md Twee 3 Specification}
 * @function parse
 * @param {string} fileContents - File contents to parse
 * @returns {Story} story
 */
export function parse(fileContents: string): Story;
/**
 * Escapes Twee 3 metacharacters according to the specification.
 * This is used when writing Twee files to ensure special characters are properly escaped.
 * @function escapeTweeMetacharacters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
export function escapeTweeMetacharacters(text: string): string;
/**
 * Unescapes Twee 3 metacharacters according to the specification.
 *
 * From the Twee 3 specification:
 * - Encoding: To avoid ambiguity, non-escape backslashes must also be escaped via
 * the same mechanism (i.e. `foo\bar` must become `foo\\bar`).
 * - Decoding: To make decoding more robust, any escaped character within a chunk of
 * encoded text must yield the character minus the backslash (i.e. `\q` must yield `q`).
 * @function unescapeTweeMetacharacters
 * @param {string} text - Text to unescape
 * @returns {string} Unescaped text
 */
export function unescapeTweeMetacharacters(text: string): string;
import { Story } from '../Story.js';
