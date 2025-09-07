import { Story } from '../Story.js';
import Passage from '../Passage.js';
import { decode } from 'html-entities';

/**
 * Lightweight HTML parser for web builds - specifically for Twine 2 HTML parsing
 * This replaces node-html-parser to reduce bundle size
 */
class LightweightTwine2Parser {
  constructor(html) {
    this.html = html;
    this.doc = null;
    
    // Parse HTML using browser's native DOMParser if available, otherwise fallback
    if (typeof DOMParser !== 'undefined') {
      const parser = new DOMParser();
      this.doc = parser.parseFromString(html, 'text/html');
    } else {
      // Fallback for environments without DOMParser
      this.doc = this.createSimpleDOM(html);
    }
  }

  getElementsByTagName(tagName) {
    if (this.doc && this.doc.getElementsByTagName) {
      return Array.from(this.doc.getElementsByTagName(tagName));
    }
    
    // Fallback implementation
    if (tagName === 'tw-storydata') {
      return this.extractStoryDataElements();
    }
    if (tagName === 'tw-passagedata') {
      return this.extractPassageDataElements();
    }
    if (tagName === 'style') {
      return this.extractStyleElements();
    }
    return [];
  }

  extractStoryDataElements() {
    const storyDataRegex = /<tw-storydata[^>]*>([\s\S]*?)<\/tw-storydata>/gi;
    const elements = [];
    let match;

    while ((match = storyDataRegex.exec(this.html)) !== null) {
      const elementHtml = match[0];
      const attributes = this.parseAttributes(elementHtml);
      const innerHTML = match[1];

      elements.push({
        attributes,
        innerHTML,
        rawText: innerHTML
      });
    }

    return elements;
  }

  extractPassageDataElements() {
    const passageDataRegex = /<tw-passagedata[^>]*>([\s\S]*?)<\/tw-passagedata>/gi;
    const elements = [];
    let match;

    while ((match = passageDataRegex.exec(this.html)) !== null) {
      const elementHtml = match[0];
      const attributes = this.parseAttributes(elementHtml);
      const textContent = this.extractTextContent(match[1]);

      elements.push({
        attributes,
        rawText: textContent
      });
    }

    return elements;
  }

  extractStyleElements() {
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    const elements = [];
    let match;

    while ((match = styleRegex.exec(this.html)) !== null) {
      const elementHtml = match[0];
      const attributes = this.parseAttributes(elementHtml);
      const textContent = match[1];

      elements.push({
        attributes,
        rawText: textContent,
        innerHTML: textContent
      });
    }

    return elements;
  }

  parseAttributes(elementHtml) {
    const attributes = {};
    
    // Common attribute patterns
    const attributeRegex = /(\w+(?:-\w+)*)=["']([^"']*)["']/g;
    let match;

    while ((match = attributeRegex.exec(elementHtml)) !== null) {
      attributes[match[1]] = match[2];
    }

    return attributes;
  }

  extractTextContent(html) {
    // Remove HTML tags and decode basic entities
    return html
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&') // This should be last
      .trim();
  }

  // eslint-disable-next-line no-unused-vars
  createSimpleDOM(_html) {
    // Minimal DOM-like object for fallback
    return {
      getElementsByTagName: (tagName) => {
        if (tagName === 'tw-storydata') {
          return this.extractStoryDataElements();
        }
        if (tagName === 'tw-passagedata') {
          return this.extractPassageDataElements();
        }
        if (tagName === 'style') {
          return this.extractStyleElements();
        }
        return [];
      }
    };
  }
}

/**
 * Web-optimized Twine 2 HTML parser with reduced dependencies
 * Parse Twine 2 HTML into Story object using lightweight DOM parsing
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
function parse(content) {
  // Create new story.
  const story = new Story();

  // Can only parse string values.
  if (typeof content !== 'string') {
    throw new TypeError('TypeError: Content is not a string!');
  }

  // Set default start node.
  let startNode = null;

  // Use lightweight parser for web builds
  const dom = new LightweightTwine2Parser(content);

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
   *   The version of program used to create the file.
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'creator-version')) {
    // Update story creator version
    story.creatorVersion = storyData.attributes['creator-version'];
  }

  /**
   * format: (string) Optional.
   *   The story format used when publishing file.
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'format')) {
    // Update story format
    story.format = storyData.attributes.format;
  }

  /**
   * format-version: (string) Optional.
   *   The version of story format used when publishing file.
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'format-version')) {
    // Update story format version
    story.formatVersion = storyData.attributes['format-version'];
  }

  /**
   * startnode: (string) Optional.
   *   The PID of the starting passage.
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'startnode')) {
    // Update start node
    startNode = storyData.attributes.startnode;
  }

  /**
   * zoom: (string) Optional.
   *   Zoom level between 0.25 (25%) and 4.0 (400%).
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'zoom')) {
    // Convert to Number and save
    story.zoom = Number(storyData.attributes.zoom);
  }

  /**
   * options: (string) Optional.
   *   String of comma-separated key-value pairs for story.
   *   Each pair is separated by a comma.
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'options')) {
    // Update metadata with options
    const options = storyData.attributes.options;
    
    // Split by comma and parse each key-value pair
    if (options.length > 0) {
      const pairs = options.split(',');
      pairs.forEach(pair => {
        const [key, value] = pair.split(':');
        if (key && value) {
          story.metadata[key.trim()] = value.trim();
        }
      });
    }
  }

  /**
   * hidden: (string) Optional.
   *   String of passage names that should not be included in the output.
   */
  if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'hidden')) {
    // Update metadata with hidden passages
    story.metadata.hidden = storyData.attributes.hidden;
  }

  // Parse tag colors from style elements
  const styleElements = dom.getElementsByTagName('style');
  styleElements.forEach(styleElement => {
    const styleContent = styleElement.innerHTML || styleElement.rawText || '';
    
    // Look for tag color definitions
    const tagColorRegex = /tw-story-tag-(.+?)\s*{\s*color:\s*(.+?)\s*}/g;
    let match;
    
    while ((match = tagColorRegex.exec(styleContent)) !== null) {
      const tagName = match[1];
      const color = match[2];
      story.tagColors[tagName] = color;
    }
  });

  // Pull out the `<tw-passagedata>` elements.
  const storyPassages = dom.getElementsByTagName('tw-passagedata');

  // Move through the passages.
  storyPassages.forEach(passage => {
    // Get the passage attributes.
    const attr = passage.attributes;
    // Get the passage text and decode HTML entities.
    const text = decode(passage.rawText);

    /**
     * name: (string) Required.
     *   The name of the passage.
     */
    if (!Object.prototype.hasOwnProperty.call(attr, 'name')) {
      // Name is required! Warn user and skip passage.
      console.warn('Warning: Cannot parse passage data without name!');
      return;
    }

    // Get passage name.
    const name = attr.name;

    /**
     * pid: (string) Required.
     *   The Passage ID (PID).
     */
    if (!Object.prototype.hasOwnProperty.call(attr, 'pid')) {
      // PID is required! Throw error.
      throw new Error('Error: Passages are required to have PID!');
    }

    /**
     * position: (string) Optional.
     *   Comma-separated X and Y coordinates of the passage within Twine 2.
     */
    let position = null;
    if (Object.prototype.hasOwnProperty.call(attr, 'position')) {
      position = attr.position;
    }

    /**
     * size: (string) Optional.
     *   Comma-separated width and height of the passage within Twine 2.
     */
    let size = null;
    if (Object.prototype.hasOwnProperty.call(attr, 'size')) {
      size = attr.size;
    }

    /**
     * tags: (string) Optional.
     *   Space-separated list of passage tags, if any.
     */
    let tags = [];
    if (Object.prototype.hasOwnProperty.call(attr, 'tags')) {
      if (attr.tags.length > 0 && attr.tags !== '""') {
        tags = attr.tags.split(' ').filter(tag => tag !== '');
      }
    }

    /**
     * metadata: (object) Optional.
     *  An object containing additional metadata about the passage.
     */
    const metadata = {};

    // Does position exist?
    if (position !== null) {
      metadata.position = position;
    }

    // Does size exist?
    if (size !== null) {
      metadata.size = size;
    }

    /**
     * pid: (string) Required.
     *   The Passage ID (PID).
     */
    const pid = attr.pid;

    // If the PID is the start node, update the story start.
    if (startNode === pid) {
      story.start = name;
    }

    // Add the passage.
    story.addPassage(
      new Passage(
        name,
        text,
        tags,
        metadata
      )
    );
  });

  // Return story object.
  return story;
}

export { parse };
