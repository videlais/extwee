/**
 * Parses story format content into a {@link StoryFormat} object.
 *
 * Story formats are generally JSONP files containing a JSON object with the following properties:
 * - name: (string) Optional. (Omitting the name will lead to an Untitled Story Format.)
 * - version: (string) Required, and semantic version-style formatting (x.y.z, e.g., 1.2.1) of the version is also required.
 * - author: (string) Optional.
 * - description: (string) Optional.
 * - image: (string) Optional.
 * - url: (string) Optional.
 * - license: (string) Optional.
 * - proofing: (boolean) Optional (defaults to false).
 * - source: (string) Required.
 *
 * If existing properties do not match their expected type, a warning will be produced and incoming value will be ignored.
 *
 * This function does "soft parsing." It will not throw an error if a specific property is missing or malformed.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-storyformats-spec.md Twine 2 Story Formats Specification}
 * @function parse
 * @param {string} contents - JSONP content.
 * @throws {Error} - Unable to find Twine 2 JSON chunk!
 * @throws {Error} - Unable to parse Twine 2 JSON chunk!
 * @returns {StoryFormat} StoryFormat object.
 * @example
 * const contents = `{
 * "name": "My Story Format",
 * "version": "1.0.0",
 * "author": "Twine",
 * "description": "A story format.",
 * "image": "icon.svg",
 * "url": "https://example.com",
 * "license": "MIT",
 * "proofing": false,
 * "source": "<html></html>"
 * }`;
 * const storyFormat = parse(contents);
 * console.log(storyFormat);
 * // => StoryFormat {
 * //      name: 'My Story Format',
 * //      version: '1.0.0',
 * //      description: 'A story format.',
 * //      image: 'icon.svg',
 * //      url: 'https://example.com',
 * //      license: 'MIT',
 * //      proofing: false,
 * //      source: '<html></html>'
 * //    }
 */
export function parse(contents: string): StoryFormat;
import StoryFormat from '../StoryFormat.js';
