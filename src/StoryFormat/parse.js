import StoryFormat from '../StoryFormat.js';
import { valid } from 'semver';

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
function parse (contents) {
  // Create a StoryFormat object.
  const sf = new StoryFormat();

  /**
   * Beginning with Harlowe 2.0.0 (2021), the `setup` property is added.
   * It is not a valid JSON property and must be removed.
   */

  // Some versions of Harlowe can have a `setup` property, so we have to test for it.
  const setupPosition = contents.indexOf('harlowe');

  // If the `setup` property is found, we have to remove it.
  if (setupPosition !== -1) {
    // The 'setup' property is malformed.
    const setupPosition = contents.lastIndexOf(',"setup": function');
    // Remove the 'setup' property.
    contents = contents.slice(0, setupPosition) + '}';
  }

  // Find the start of story format or -1, if not found.
  const openingCurlyBracketPosition = contents.indexOf('{');
  // Find the end of story format or -1, if not found.
  const closingCurlyBracketPosition = contents.lastIndexOf('}');

  // Look for JSON among the story format.
  // If either is -1, this is not valid JSON.
  if (openingCurlyBracketPosition === -1 || closingCurlyBracketPosition === -1) {
    // Either start or end curly brackets were now found!
    throw new Error('Error: Unable to find Twine 2 JSON chunk!');
  } else {
    // Slice out the JSON based on curly brackets
    contents = contents.slice(openingCurlyBracketPosition, closingCurlyBracketPosition + 1);
  }

  // Create an object literal
  let jsonContent = {};

  // Attempt to parse the JSON.
  try {
    jsonContent = JSON.parse(contents);
  } catch (event) {
    throw new Error('Error: Unable to parse Twine 2 JSON chunk!');
  }

  /**
   * - name: (string) Optional. Name of the story format.
   *      (Omitting the name will lead to an Untitled Story Format.)
   */
  if (Object.prototype.hasOwnProperty.call(jsonContent, 'name')) {
    // Test if name is a string.
    if (typeof jsonContent.name !== 'string') {
      // Produce a warning.
      console.warn('Warning: Processed story format\'s name is not a string. It will be ignored.');
    } else {
      // Save the name.
      sf.name = jsonContent.name;
    }
  }

  /**
   * author: (string) Optional.
   */
  if (Object.prototype.hasOwnProperty.call(jsonContent, 'author')) {
    // Test if author is a string.
    if (typeof jsonContent.author !== 'string') {
      // Produce a warning.
      console.warn('Warning: Processed story format\'s author is not a string. It will be ignored.');
    } else {
      // Save the author.
      sf.author = jsonContent.author;
    }
  }

  /**
   * description: (string) Optional.
   */
  if (Object.prototype.hasOwnProperty.call(jsonContent, 'description')) {
    // Test if description is a string.
    if (typeof jsonContent.description !== 'string') {
      // Produce a warning.
      console.warn('Warning: Processed story format\'s description is not a string. It will be ignored.');
    } else {
      // Save the description.
      sf.description = jsonContent.description;
    }
  }

  /**
   * image: (string) Optional. The filename of an image (ideally SVG)
   *      served from the same directory as the format.js file.
   */
  if (Object.prototype.hasOwnProperty.call(jsonContent, 'image')) {
    // Test if image is a string.
    if (typeof jsonContent.image !== 'string') {
      // Produce a warning.
      console.warn('Warning: Processed story format\'s image is not a string. It will be ignored.');
    } else {
      // Save the image.
      sf.image = jsonContent.image;
    }
  }

  /**
   * url: (string) Optional. The URL of the directory containing the `format.js` file.
   */
  if (Object.prototype.hasOwnProperty.call(jsonContent, 'url')) {
    // Test if url is a string.
    if (typeof jsonContent.url !== 'string') {
      // Produce a warning.
      console.warn('Warning: Processed story format\'s url is not a string. It will be ignored.');
    } else {
      // Save the url.
      sf.url = jsonContent.url;
    }
  }

  /**
   * license: (string) Optional. The license under which the story format is released.
   */
  if (Object.prototype.hasOwnProperty.call(jsonContent, 'license')) {
    // Test if license is a string.
    if (typeof jsonContent.license !== 'string') {
      // Produce a warning.
      console.warn('Warning: Processed story format\'s license is not a string. It will be ignored.');
    } else {
      // Save the license.
      sf.license = jsonContent.license;
    }
  }

  /**
   * proofing: (boolean) Optional (defaults to false). True if the story format
   *      is a "proofing" format. The distinction is relevant only in the Twine 2 UI.
   */
  if (Object.prototype.hasOwnProperty.call(jsonContent, 'proofing')) {
    // Test if proofing is a boolean.
    if (typeof jsonContent.proofing !== 'boolean') {
      // Produce a warning.
      console.warn('Warning: Processed story format\'s proofing is not a boolean. It will be ignored.');
    } else {
      // Save the proofing.
      sf.proofing = jsonContent.proofing;
    }
  }

  /**
   * version: (string) Required, and semantic version-style formatting
   *      (x.y.z, e.g., 1.2.1) of the version is also required.
   */
  if (Object.prototype.hasOwnProperty.call(jsonContent, 'version')) {
    // Test if version is a string.
    if (typeof jsonContent.version !== 'string') {
      // Produce a warning.
      console.warn('Warning: Processed story format\'s version is not a string! It will be ignored.');
    } else {
      // Test if version is a valid semantic version.
      if (valid(jsonContent.version)) {
        // Save the version.
        sf.version = jsonContent.version;
      } else {
        // Produce a warning.
        console.warn('Warning: Processed story format\'s version is not semantic! It will be ignored.');
      }
    }
  } else {
    // Produce a warning.
    console.warn('Warning: Processed story format does not have version property!');
  }

  /**
   * source: (string) Required. Full HTML output of the story format.
   * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-storyformats-spec.md Twine 2 Story Formats Specification}
   */
  if (Object.prototype.hasOwnProperty.call(jsonContent, 'source')) {
    // Test if source is a string.
    if (typeof jsonContent.source !== 'string') {
      // Produce a warning.
      console.warn('Warning: Processed story format\'s source is not a string! It will be ignored.');
    } else {
      // Save the source.
      sf.source = jsonContent.source;
    }
  } else {
    // Warn if source is not found.
    console.warn('Warning: Processed story format does not have source property!');
  }

  // Return the StoryFormat object.
  return sf;
}

export { parse };
