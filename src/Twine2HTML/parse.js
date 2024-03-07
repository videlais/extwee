import { parse as HtmlParser } from 'node-html-parser';
import { Story } from '../Story.js';
import Passage from '../Passage.js';
import { decode } from 'html-entities';

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
function parse (content) {
  // Create new story.
  const story = new Story();

  // Can only parse string values.
  if (typeof content !== 'string') {
    throw new TypeError('TypeError: Content is not a string!');
  }

  // Set default start node.
  let startNode = null;

  // Send to node-html-parser
  // Enable getting the content of 'script', 'style', and 'pre' elements
  // Get back a DOM
  const dom = new HtmlParser(
    content,
    {
      lowerCaseTagName: false,
      script: true,
      style: true,
      pre: true
    });

  // Pull out the `<tw-storydata>` element.
  const storyDataElements = dom.getElementsByTagName('tw-storydata');

  // Did we find any elements?
  if (storyDataElements.length === 0) {
    // If there is not a single `<tw-storydata>` element, this is not a Twine 2 story!
    throw new TypeError('TypeError: Not Twine 2 HTML content!');
  }

  // We only parse the first element found.
  const storyData = storyDataElements[0];

  /**
   * name: (string) Required.
   *   The name of the story.
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'name')) {
    // Set the story name
    story.name = storyData.attributes.name;
  } else {
    // Name is a required field. Warn user.
    console.warn('Warning: The name attribute is missing from tw-storydata!');
  }

  /**
   * ifid: (string) Required.
   *   An IFID is a sequence of between 8 and 63 characters,
   *   each of which shall be a digit, a capital letter or a
   *   hyphen that uniquely identify a story (see Treaty of Babel).
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'ifid')) {
    // Update story IFID.
    story.IFID = storyData.attributes.ifid;
  } else {
    // Name is a required filed. Warn user.
    console.warn('Warning: The ifid attribute is missing from tw-storydata!');
  }

  // Check if the IFID has valid formatting.
  if (story.IFID.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/) === null) {
    // IFID is not valid.
    console.warn('Warning: The IFID is not in valid UUIDv4 formatting on tw-storydata!');
  }

  /**
   * creator: (string) Optional.
   *   The name of program used to create the file.
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'creator')) {
    // Update story creator
    story.creator = storyData.attributes.creator;
  }

  /**
   * creator-version: (string) Optional.
   *   The version of the program used to create the file.
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'creator-version')) {
    // Update story creator version
    story.creatorVersion = storyData.attributes['creator-version'];
  }

  /**
   * format: (string) Optional.
   *   The story format used to create the story.
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'format')) {
    // Update story format
    story.format = storyData.attributes.format;
  }

  /**
   * format-version: (string) Optional.
   *   The version of the story format used to create the story.
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'format-version')) {
    // Update story format version
    story.formatVersion = storyData.attributes['format-version'];
  }

  /**
   * zoom: (string) Optional.
   *   The decimal level of zoom (i.e. 1.0 is 100% and 1.2 would be 120% zoom level).
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'zoom')) {
    // Update story zoom
    story.zoom = Number(Number.parseFloat(storyData.attributes.zoom).toFixed(2));
  }

  /**
   * startnode: (string) Optional.
   *   The PID matching a `<tw-passagedata>` element whose content should be displayed first.
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'startnode')) {
    // Take string value and convert to Int
    startNode = Number.parseInt(storyData.attributes.startnode, 10);
  }

  // Pull out the `<tw-passagedata>` element.
  const storyPassages = dom.querySelectorAll('tw-passagedata');

  // Move through the passages
  for (const passage in storyPassages) {
    // Get the passage attributes
    const attr = storyPassages[passage].attributes;
    // Get the passage text
    const text = storyPassages[passage].rawText;

    /**
     * position: (string) Optional.
     *   Comma-separated X and Y position of the upper-left
     *   of the passage when viewed within the Twine 2 editor.
     */
    // Set a default position.
    let position = null;
    // Does position exist?
    if (Object.prototype.hasOwnProperty.call(attr, 'position')) {
      // Update position.
      position = attr.position;
    }

    /**
     * size: (string) Optional.
     *   Comma-separated width and height of the
     *   passage when viewed within the Twine 2 editor.
     */
    // Set a default size.
    let size = null;
    // Does size exist?
    if (Object.prototype.hasOwnProperty.call(attr, 'size')) {
      // Update size.
      size = attr.size;
    }

    /**
     * name: (string) Required.
     *   The name of the passage.
     *
     *   https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md#passages
     */
    // Create a default value
    let name = 'Untitled Passage';
    // Does name exist?
    if (Object.prototype.hasOwnProperty.call(attr, 'name')) {
      // Escape the name
      name = attr.name;
    } else {
      console.warn('Warning: name attribute is missing! Default passage name will be used.');
    }

    /**
     * tags: (string) Optional.
     *  A space-separated list of tags for the passage.
     *
     *  https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md#passages
     */
    // Create empty tag array.
    let tags = [];
    // Does the tags attribute exist?
    if (Object.prototype.hasOwnProperty.call(attr, 'tags')) {
      // Escape any tags
      // (Attributes can, themselves, be empty strings.)
      if (attr.tags.length > 0 && attr.tags !== '""') {
        // Escape the tags
        tags = attr.tags;
        // Split by spaces into an array
        tags = tags.split(' ');
      }

      // Remove any empty strings.
      tags = tags.filter(tag => tag !== '');
    }

    /**
     * metadata: (object) Optional.
     *  An object containing additional metadata about the passage.
     *
     * Twine 2 HTML does not support metadata, but other formats do.
     */
    // Create metadata for passage.
    const metadata = {};

    // Does position exist?
    if (position !== null) {
      // Add the property to metadata
      metadata.position = position;
    }

    // Does size exist?
    if (size !== null) {
      // Add the property to metadata
      metadata.size = size;
    }

    /**
     * pid: (string) Required.
     *   The Passage ID (PID).
     *   (Note: This is subject to change during editing with Twine 2.)
     *
     *   https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md#passages
     */
    // Create a default PID
    let pid = 1;
    // Does pid exist?
    if (Object.prototype.hasOwnProperty.call(attr, 'pid')) {
      // Parse string into int
      // Update PID
      pid = Number.parseInt(attr.pid, 10);
    } else {
      console.warn('Warning: pid attribute is missing! Default PID will be used.');
    }

    // Check the current PID against startNode number.
    if (pid === startNode) {
      // These match.
      // Save the passage name.
      story.start = name;
    }

    // Add a new Passage into an array
    story.addPassage(
      new Passage(
        decode(name),
        decode(text),
        tags.map(tag => decode(tag)),
        metadata
      )
    );
  }

  // Look for the style element
  const styleElement = dom.querySelector('#twine-user-stylesheet');

  // Does the style element exist?
  if (styleElement !== null) {
    // Check if there is any content.
    if (styleElement.rawText.length > 0) {
      // Update stylesheet passage
      story.addPassage(new Passage(
        'UserStylesheet',
        styleElement.rawText,
        ['stylesheet'])
      );
    }
  }

  // Look for the script element
  const scriptElement = dom.querySelector('#twine-user-script');

  // Does the script element exist?
  if (scriptElement !== null) {
    // Check if there is any content.
    if (scriptElement.rawText.length > 0) {
      story.addPassage(new Passage(
        'UserScript',
        scriptElement.rawText,
        ['script'])
      );
    }
  }

  // Look for all <tw-tag> elements.
  const twTags = dom.querySelectorAll('tw-tag');

  // Parse through the entries.
  twTags.forEach((tags) => {
    // Parse each tag element
    const attributes = tags.attributes;

    // Create default value for name
    let name = '';

    // Create default value for color
    let color = '';

    // Check for name
    if (Object.prototype.hasOwnProperty.call(attributes, 'name')) {
      name = attributes.name;
    }

    // Check for color
    if (Object.prototype.hasOwnProperty.call(attributes, 'color')) {
      color = attributes.color;
    }

    // If both are not empty strings, use them.
    if (name !== '' && color !== '') {
      // Add name and color to the object
      story.tagColors[name] = color;
    }
  });

  // Return the parsed story.
  return story;
}

export { parse };
