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
    this.usingDOMParser = false;
    
    // Parse HTML using browser's native DOMParser if available, otherwise fallback
    if (typeof DOMParser !== 'undefined') {
      try {
        const parser = new DOMParser();
        this.doc = parser.parseFromString(html, 'text/html');
        this.usingDOMParser = true;
        
        // Check if parsing was successful (DOMParser doesn't throw errors, but creates error documents)
        const parserError = this.doc.querySelector('parsererror');
        if (parserError) {
          console.warn('DOMParser encountered an error, falling back to regex parsing:', parserError.textContent);
          this.doc = this.createSimpleDOM(html);
          this.usingDOMParser = false;
        }
      } catch (error) {
        console.warn('DOMParser failed, falling back to regex parsing:', error.message);
        this.doc = this.createSimpleDOM(html);
        this.usingDOMParser = false;
      }
    } else {
      // Fallback for environments without DOMParser
      this.doc = this.createSimpleDOM(html);
      this.usingDOMParser = false;
    }
  }

  getElementsByTagName(tagName) {
    if (this.usingDOMParser && this.doc && this.doc.getElementsByTagName) {
      // Use native DOM methods when DOMParser is available and working
      const elements = Array.from(this.doc.getElementsByTagName(tagName));
      
      // Convert DOM elements to our expected format
      return elements.map(element => {
        const attributes = {};
        
        // Extract attributes using DOM methods - much more reliable than regex
        if (element.attributes) {
          for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            // DOM automatically handles HTML entity decoding
            attributes[attr.name] = attr.value;
          }
        }
        
        return {
          attributes,
          innerHTML: element.innerHTML || '',
          rawText: element.textContent || element.innerText || ''
        };
      });
    }
    
    // Fallback implementation for environments without DOMParser or when DOM parsing fails
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
    
    // Extract just the opening tag to avoid getting attributes from nested elements
    const openingTagMatch = elementHtml.match(/^<[^>]*>/);
    if (!openingTagMatch) return attributes;
    
    const openingTag = openingTagMatch[0];
    
    // Enhanced attribute parsing to handle multiple formats:
    // 1. Quoted attributes: name="value" or name='value'
    // 2. Unquoted attributes: name=value
    // 3. Boolean attributes: hidden, selected, etc.
    
    // First, handle quoted attributes (including those with escaped quotes)
    const quotedAttributeRegex = /(\w+(?:-\w+)*)=["']([^"']*)["']/g;
    let match;

    while ((match = quotedAttributeRegex.exec(openingTag)) !== null) {
      // Decode basic HTML entities in attribute values
      const value = match[2]
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&'); // This should be last
      
      attributes[match[1]] = value;
    }
    
    // Handle unquoted attributes (but avoid matching already processed quoted ones)
    let tagWithoutQuoted = openingTag;
    const quotedMatches = [...openingTag.matchAll(quotedAttributeRegex)];
    quotedMatches.forEach(quotedMatch => {
      tagWithoutQuoted = tagWithoutQuoted.replace(quotedMatch[0], '');
    });
    
    const unquotedAttributeRegex = /(\w+(?:-\w+)*)=([^\s>]+)/g;
    while ((match = unquotedAttributeRegex.exec(tagWithoutQuoted)) !== null) {
      if (!attributes[match[1]]) { // Don't overwrite quoted attributes
        attributes[match[1]] = match[2];
      }
    }
    
    // Handle boolean attributes (attributes without values)
    const booleanAttributeRegex = /\s(\w+(?:-\w+)*)(?=\s|>|$)/g;
    while ((match = booleanAttributeRegex.exec(openingTag)) !== null) {
      const attrName = match[1];
      // Only add if it's not already parsed as a key=value attribute and not the tag name
      if (!attributes[attrName] && !openingTag.includes(`${attrName}=`) && attrName !== openingTag.match(/<(\w+)/)?.[1]) {
        attributes[attrName] = true;
      }
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
    // Minimal DOM-like object for fallback when DOMParser is not available
    // This should only be used in very limited environments (like some older Node.js versions)
    return {
      getElementsByTagName: (tagName) => {
        // Use regex-based extraction as fallback
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
    // Validate that the name is a non-empty string before setting
    const nameValue = storyData.attributes.name;
    if (typeof nameValue === 'string' && nameValue.trim().length > 0) {
      story.name = nameValue.trim();
    } else {
      console.warn('Warning: The name attribute is empty or invalid on tw-storydata!');
      // Keep the default name from Story constructor
    }
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
    // Validate that the IFID is a non-empty string before setting
    const ifidValue = storyData.attributes.ifid;
    if (typeof ifidValue === 'string' && ifidValue.trim().length > 0) {
      story.IFID = ifidValue.trim();
    } else {
      console.warn('Warning: The ifid attribute is empty or invalid on tw-storydata!');
    }
  } else {
    // IFID is a required field. Warn user.
    console.warn('Warning: The ifid attribute is missing from tw-storydata!');
  }

  // Check if the IFID has valid formatting (only if IFID was set).
  if (story.IFID && story.IFID.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/) === null) {
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
