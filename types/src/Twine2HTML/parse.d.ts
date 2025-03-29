/**
 * Parse Twine 2 HTML into Story object.
 *
 * See: Twine 2 HTML Output Specification
 * (https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md)
 *
 * Produces warnings for:
 * - Missing name attribute on `<tw-storydata>` element.
 * - Missing IFID attribute on `<tw-storydata>` element.
 * - Malformed IFID attribute on `<tw-storydata>` element.
 * @function parse
 * @param {string} content - Twine 2 HTML content to parse.
 * @returns {Story} Story object based on Twine 2 HTML content.
 * @throws {TypeError} Content is not a string.
 * @throws {Error} Not Twine 2 HTML content!
 * @throws {Error} Cannot parse passage data without name!
 * @throws {Error} Passages are required to have PID!
 */
export function parse(content: string): Story;
import { Story } from '../Story.js';
