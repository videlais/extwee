import StoryFormat from '../StoryFormat.js';
import { valid } from 'semver';

/**
 * Parse a Story Format `format.js` file into a StoryFormat object.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-storyformats-spec.md Twine 2 Story Formats Specification}
 * @function parse
 * @param {string} contents - Content
 * @throws {Error} - Unable to find Twine2 JSON chunk!
 * @throws {Error} - Unable to parse Twine2 JSON chunk!
 * @returns {StoryFormat} StoryFormat object
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
function parse (contents) {
  // Harlowe has malformed JSON, so we have to test for it
  const harlowePosition = contents.indexOf('harlowe');

  if (harlowePosition !== -1) {
    // The 'setup' property is malformed
    const setupPosition = contents.lastIndexOf(',"setup": function');
    contents = contents.slice(0, setupPosition) + '}';
  }

  // Find the start of story format or -1, if not found
  const openingCurlyBracketPosition = contents.indexOf('{');
  // Find the end of story format or -1, if not found
  const closingCurlyBracketPosition = contents.lastIndexOf('}');

  // Look for JSON among the story format
  // If either is -1, this is not valid JSON
  if (openingCurlyBracketPosition === -1 || closingCurlyBracketPosition === -1) {
    // Either start or end curly brackets were now found!
    throw new Error('Error: Unable to find Twine2 JSON chunk!');
  } else {
    // Slice out the JSON based on curly brackets
    contents = contents.slice(openingCurlyBracketPosition, closingCurlyBracketPosition + 1);
  }

  // Create an object literal
  let jsonContent = {};

  try {
    jsonContent = JSON.parse(contents);
  } catch (event) {
    throw new Error('Error: Unable to parse Twine2 JSON chunk!');
  }

  /**
   * - name: (string) Optional. Name of the story format.
   *      (Omitting the name will lead to an Untitled Story Format.)
   */
  if (!Object.prototype.hasOwnProperty.call(jsonContent, 'name')) {
    // Use the default name
    jsonContent.name = 'Untitled Story Format';
  }

  /**
   * author: (string) Optional.
   */
  if (!Object.prototype.hasOwnProperty.call(jsonContent, 'author')) {
    // Use the default author
    jsonContent.author = '';
  }

  // Description is optional, so we have to test for it
  if (!Object.prototype.hasOwnProperty.call(jsonContent, 'description')) {
    // Use the default description
    jsonContent.description = '';
  }

  /**
   * image: (string) Optional. The filename of an image (ideally SVG)
   *      served from the same directory as the format.js file.
   */
  if (!Object.prototype.hasOwnProperty.call(jsonContent, 'image')) {
    // Use the default image
    jsonContent.image = '';
  }

  /**
   * url: (string) Optional. The URL of the directory containing the format.js file.
   */
  if (!Object.prototype.hasOwnProperty.call(jsonContent, 'url')) {
    // Use the default url
    jsonContent.url = '';
  }

  /**
   * license: (string) Optional. The license under which the story format is released.
   */
  if (!Object.prototype.hasOwnProperty.call(jsonContent, 'license')) {
    // Use the default license.
    jsonContent.license = '';
  }

  /**
   * proofing: (boolean) Optional (defaults to false). True if the story format
   *      is a "proofing" format. The distinction is relevant only in the Twine 2 UI.
   */
  if (!Object.prototype.hasOwnProperty.call(jsonContent, 'proofing')) {
    // Use the default proofing.
    jsonContent.proofing = false;
  }

  /**
   * version: (string) Required, and semantic version-style formatting
   *      (x.y.z, e.g., 1.2.1) of the version is also required.
   */
  if (!Object.prototype.hasOwnProperty.call(jsonContent, 'version')) {
    // Produce a warning.
    console.warn('Warning: Processed story format does not have required version property!');
  }

  // Test if version is semantic-style, which is required
  if (valid(jsonContent.version) === null) {
    // Produce a warning.
    console.warn('Warning: Processed story format\'s version is not a valid semantic value!');
  }

  /**
   * source: (string) Required. Full HTML output of the story format.
   * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-storyformats-spec.md Twine 2 Story Formats Specification}
   */
  if (!Object.prototype.hasOwnProperty.call(jsonContent, 'source')) {
    // Throw error
    console.warn('Warning: Processed story format does not have required source property!');
  }

  // Pass all values to the constructor and return the result.
  return new StoryFormat(
    jsonContent.name,
    jsonContent.version,
    jsonContent.description,
    jsonContent.author,
    jsonContent.image,
    jsonContent.url,
    jsonContent.license,
    jsonContent.proofing,
    jsonContent.source
  );
}

export { parse };
