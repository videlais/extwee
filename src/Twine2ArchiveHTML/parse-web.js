import { parse as parseTwine2HTML } from '../Twine2HTML/parse-web.js';

/**
 * Lightweight HTML parser for web builds - specifically for Twine 2 Archive HTML parsing
 * This replaces node-html-parser to reduce bundle size and uses browser DOM APIs
 */
class LightweightTwine2ArchiveParser {
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
      
      // Convert DOM elements to expected format for compatibility
      return elements.map(element => ({
        outerHTML: element.outerHTML,
        // For compatibility with the original parser interface
        toString: () => element.outerHTML
      }));
    }
    
    // Fallback implementation for environments without DOMParser
    if (tagName === 'tw-storydata') {
      return this.extractStoryDataElements();
    }
    return [];
  }

  extractStoryDataElements() {
    // Match tw-storydata elements with their complete content
    const storyDataRegex = /<tw-storydata[^>]*>[\s\S]*?<\/tw-storydata>/gi;
    const elements = [];
    let match;

    while ((match = storyDataRegex.exec(this.html)) !== null) {
      const outerHTML = match[0];
      
      elements.push({
        outerHTML: outerHTML,
        // For compatibility with the original parser interface
        toString: () => outerHTML
      });
    }

    return elements;
  }

  // eslint-disable-next-line no-unused-vars
  createSimpleDOM(_htmlContent) {
    // Minimal DOM-like object for fallback when DOMParser is not available
    // This should only be used in very limited environments
    return {
      getElementsByTagName: (tagName) => {
        if (tagName === 'tw-storydata') {
          return this.extractStoryDataElements();
        }
        return [];
      }
    };
  }
}

/**
 * Web-optimized Twine 2 Archive HTML parser with reduced dependencies
 * Parse Twine 2 Archive HTML and returns an array of story objects using browser DOM APIs.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-archive-spec.md Twine 2 Archive Specification}
 * @function parse
 * @param {string} content - Content to parse for Twine 2 HTML elements.
 * @throws {TypeError} - Content is not a string!
 * @returns {Array} Array of stories found in content.
 * @example
 * const content = '<tw-storydata name="Untitled" startnode="1" creator="Twine" creator-version="2.3.9" ifid="A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6" zoom="1" format="Harlowe" format-version="3.1.0" options="" hidden><style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"></style><script role="script" id="twine-user-script" type="text/twine-javascript"></script><tw-passagedata pid="1" name="Untitled Passage" tags="" position="0,0" size="100,100"></tw-passagedata></tw-storydata>';
 * console.log(parse(content));
 * // => [
 * //     Story {
 * //      name: 'Untitled',
 * //      startnode: '1',
 * //      creator: 'Twine',
 * //      creatorVersion: '2.3.9',
 * //      ifid: 'A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6',
 * //      zoom: '1',
 * //      format: 'Harlowe',
 * //      formatVersion: '3.1.0',
 * //      options: '',
 * //      hidden: '',
 * //      passages: [
 * //        Passage {
 * //          pid: '1',
 * //          name: 'Untitled Passage',
 * //          tags: '',
 * //          position: '0,0',
 * //          size: '100,100',
 * //          text: ''
 * //        }
 * //      ]
 * //    }
 * //   ]
 */
function parse(content) {
  // Can only parse string values.
  if (typeof content !== 'string') {
    throw new TypeError('Content is not a string!');
  }

  // Use lightweight parser for web builds
  const dom = new LightweightTwine2ArchiveParser(content);

  // Array of possible story elements.
  const outputArray = [];

  // Pull out the `<tw-storydata>` element.
  const storyDataElements = dom.getElementsByTagName('tw-storydata');

  // Did we find any elements?
  if (storyDataElements.length === 0) {
    // Produce a warning if no Twine 2 HTML content is found.
    console.warn('Warning: No Twine 2 HTML content found!');
  }

  // Iterate through all `<tw-storydata>` elements.
  for (const storyElement of storyDataElements) {
    // Convert element back into HTML text and parse using web-optimized parser.
    outputArray.push(parseTwine2HTML(storyElement.outerHTML));
  }

  // Return array.
  return outputArray;
}

export { parse };
