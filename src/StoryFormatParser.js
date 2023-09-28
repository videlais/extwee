import StoryFormat from './StoryFormat.js';
import semver from 'semver';

export default class StoryFormatParser {
  /**
   * Parse a Story Format file.
   * @param {string} contents - Content
   * @returns {StoryFormat} StoryFormat object
   */
  static parse (contents) {
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
      throw new Error('Unable to find Twine2 JSON chunk!');
    } else {
      // Slice out the JSON based on curly brackets
      contents = contents.slice(openingCurlyBracketPosition, closingCurlyBracketPosition + 1);
    }

    // Create an object literal
    let jsonContent = {};

    try {
      jsonContent = JSON.parse(contents);
    } catch (event) {
      throw new Error('Unable to parse Twine2 JSON chunk!');
    }

    /**
     * The following keys are found in most or all story formats:
     * - name: (string) Optional. Name of the story format.
     *      (Omitting the name will lead to an Untitled Story Format.)
     * - version: (string) Required, and semantic version-style formatting
     *      (x.y.z, e.g., 1.2.1) of the version is also required.
     * - author: (string) Optional.
     * - description: (string) Optional.
     * - image: (string) Optional. The filename of an image (ideally SVG)
     *      served from the same directory as the format.js file.
     * - url: (string) Optional. The URL of the directory containing the format.js file.
     * - license: (string) Optional.
     * - proofing: (boolean) Optional (defaults to false). True if the story format
     *      is a "proofing" format. The distinction is relevant only in the Twine 2 UI.
     * - source: (string) Required. Full HTML output of the story format.
     * (See: https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-storyformats-spec.md)
     */

    // Name is optional, so we have to test for it
    if (!Object.prototype.hasOwnProperty.call(jsonContent, 'name')) {
      // Use the default name
      jsonContent.name = 'Untitled Story Format';
    }

    // Author is optional, so we have to test for it
    if (!Object.prototype.hasOwnProperty.call(jsonContent, 'author')) {
      // Use the default author
      jsonContent.author = '';
    }

    // Description is optional, so we have to test for it
    if (!Object.prototype.hasOwnProperty.call(jsonContent, 'description')) {
      // Use the default description
      jsonContent.description = '';
    }

    // Image is optional, so we have to test for it
    if (!Object.prototype.hasOwnProperty.call(jsonContent, 'image')) {
      // Use the default image
      jsonContent.image = '';
    }

    // URL is optional, so we have to test for it
    if (!Object.prototype.hasOwnProperty.call(jsonContent, 'url')) {
      // Use the default url
      jsonContent.url = '';
    }

    // License is optional, so we have to test for it
    if (!Object.prototype.hasOwnProperty.call(jsonContent, 'license')) {
      // Use the default license
      jsonContent.license = '';
    }

    // Proofing is optional, so we have to test for it
    if (!Object.prototype.hasOwnProperty.call(jsonContent, 'proofing')) {
      // Use the default proofing
      jsonContent.proofing = false;
    }

    // Version is required, so we have to test for it
    if (!Object.prototype.hasOwnProperty.call(jsonContent, 'version')) {
      // Throw error
      throw new Error('Processed story format does not have required version property!');
    }

    // Test if version is semantic-style, which is required
    if (semver.valid(jsonContent.version) === null) {
      throw new Error('Processed story format\'s version is not a valid semantic value!');
    }

    // Source is required, so we have to test for it
    if (!Object.prototype.hasOwnProperty.call(jsonContent, 'source')) {
      // Throw error
      throw new Error('Processed story format does not have required source property!');
    }

    // Pass all values to the constructor and return the result
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
}
