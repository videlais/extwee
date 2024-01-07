/**
 * Parses Twee 3 text into a Story object.
 *
 * See: Twee 3 Specification
 * (https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md)
 * @param {string} fileContents - File contents to parse
 * @returns {Story} story
 */
export function parse(fileContents: string): Story;
import Story from '../Story.js';
