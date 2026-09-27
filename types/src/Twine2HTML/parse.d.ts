/**
 * Parse Twine 2 HTML into Story object.
 *
 * Produces warnings for:
 * - Missing name attribute on `<tw-storydata>` element.
 * - Missing IFID attribute on `<tw-storydata>` element.
 * - Malformed IFID attribute on `<tw-storydata>` element.
 * - Missing name or pid attribute on `<tw-passagedata>` elements (defaults are used).
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md Twine 2 HTML Output Specification}
 * @function parse
 * @param {string} content - Twine 2 HTML content to parse.
 * @returns {Story} Story object based on Twine 2 HTML content.
 * @throws {TypeError} Content is not a string!
 * @throws {TypeError} Not Twine 2 HTML content!
 * @example
 * import { readFileSync } from 'node:fs';
 * import { parseTwine2HTML } from 'extwee';
 * const story = parseTwine2HTML(readFileSync('story.html', 'utf8'));
 * console.log(story.toTwee());
 */
export function parse(content: string): Story;
import { Story } from '../Story.js';
