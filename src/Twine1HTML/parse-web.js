import Passage from '../Passage.js';
import { Story } from '../Story.js';

/**
 * Lightweight HTML parser for web builds - specifically for Twine 1 HTML parsing
 * This replaces node-html-parser to reduce bundle size
 */
class LightweightTwine1Parser {
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

  querySelector(selector) {
    if (this.usingDOMParser && this.doc && this.doc.querySelector) {
      // Use native DOM methods when DOMParser is available and working
      return this.doc.querySelector(selector);
    }
    
    // Fallback implementation for environments without DOMParser
    if (selector === '#storeArea') {
      const match = this.html.match(/<div[^>]*id=["']storeArea["'][^>]*>/i);
      return match ? { found: true } : null;
    }
    if (selector === '#store-area') {
      const match = this.html.match(/<div[^>]*id=["']store-area["'][^>]*>/i);
      return match ? { found: true } : null;
    }
    return null;
  }

  querySelectorAll(selector) {
    if (this.usingDOMParser && this.doc && this.doc.querySelectorAll) {
      // Use native DOM methods when DOMParser is available and working
      const elements = Array.from(this.doc.querySelectorAll(selector));
      
      // Convert DOM elements to expected format for compatibility
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
          rawText: element.textContent || element.innerText || ''
        };
      });
    }
    
    // Fallback implementation for environments without DOMParser
    if (selector === '[tiddler]') {
      return this.extractTiddlerElements();
    }
    return [];
  }

  extractTiddlerElements() {
    const tiddlerRegex = /<div[^>]*tiddler=["']([^"']+)["'][^>]*>([\s\S]*?)<\/div>/gi;
    const elements = [];
    let match;

    while ((match = tiddlerRegex.exec(this.html)) !== null) {
      const elementHtml = match[0];
      const attributes = this.parseAttributes(elementHtml);
      const textContent = this.extractTextContent(match[2]);

      elements.push({
        attributes,
        rawText: textContent
      });
    }

    return elements;
  }

  parseAttributes(elementHtml) {
    const attributes = {};
    
    // Extract tiddler attribute
    const tiddlerMatch = elementHtml.match(/tiddler=["']([^"']+)["']/i);
    if (tiddlerMatch) {
      attributes.tiddler = tiddlerMatch[1];
    }

    // Extract tags attribute
    const tagsMatch = elementHtml.match(/tags=["']([^"']*)["']/i);
    if (tagsMatch) {
      attributes.tags = tagsMatch[1];
    }

    // Extract twine-position attribute
    const positionMatch = elementHtml.match(/twine-position=["']([^"']+)["']/i);
    if (positionMatch) {
      attributes['twine-position'] = positionMatch[1];
    }

    // Extract modifier attribute
    const modifierMatch = elementHtml.match(/modifier=["']([^"']+)["']/i);
    if (modifierMatch) {
      attributes.modifier = modifierMatch[1];
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

  createSimpleDOM(html) {
    // Minimal DOM-like object for fallback when DOMParser is not available
    // This should only be used in very limited environments
    return {
      querySelector: (selector) => {
        if (selector === '#storeArea' && html.includes('id="storeArea"')) {
          return { found: true };
        }
        if (selector === '#store-area' && html.includes('id="store-area"')) {
          return { found: true };
        }
        return null;
      },
      querySelectorAll: (selector) => {
        if (selector === '[tiddler]') {
          return this.extractTiddlerElements();
        }
        return [];
      }
    };
  }
}

/**
 * Web-optimized Twine 1 HTML parser with reduced dependencies
 * Parses Twine 1 HTML into a Story object using lightweight DOM parsing
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md Twine 1 HTML Documentation}
 * @function parse
 * @param {string} content - Twine 1 HTML content to parse.
 * @returns {Story} Story object
 */
function parse(content) {
  // Create a default Story.
  const s = new Story();

  // Use lightweight parser for web builds
  const dom = new LightweightTwine1Parser(content);

  // Look for `<div id="storeArea">`.
  let storyData = dom.querySelector('#storeArea');

  // Does the `<div id="storeArea">` element exist?
  if (storyData === null) {
    // Look for `<div id="store-area">`.
    storyData = dom.querySelector('#store-area');
    // Check for null
    if (storyData == null) {
      // Can't find any story data.
      throw new Error('Cannot find #storeArea or #store-area!');
    }
  }

  // Pull out the `[tiddler]` elements.
  const storyPassages = dom.querySelectorAll('[tiddler]');

  // Move through the passages.
  for (const passage of storyPassages) {
    // Get the passage attributes.
    const attr = passage.attributes;
    // Get the passage text.
    const text = passage.rawText;

    /**
     * twine-position: (string) Required.
     *   Comma-separated X and Y coordinates of the passage within Twine 1.
     */
    // Set a default position.
    let position = null;
    // Does position exist?
    if (Object.prototype.hasOwnProperty.call(attr, 'twine-position')) {
      // Update position.
      position = attr['twine-position'];
    }

    /**
     * tiddler: (string) Required.
     *   The name of the passage.
     */
    // Create a default value.
    const name = attr.tiddler;
    // Is this `StoryTitle`?
    if (name === 'StoryTitle') {
      // If StoryTitle exists, we accept the story name.
      s.name = text;
    }

    /**
     * tags: (string) Required.
     *  Space-separated list of passages tags, if any.
     */
    // Create empty tag array.
    let tags = [];
    // Does the tags attribute exist?
    if (Object.prototype.hasOwnProperty.call(attr, 'tags')) {
      // Escape any tags
      // (Attributes can, themselves, be empty strings.)
      if (attr.tags.length > 0 && attr.tags !== '""') {
        // Escape the tags.
        tags = attr.tags;
        // Split by spaces into an array.
        tags = tags.split(' ');
      }

      // Remove any empty strings.
      tags = tags.filter(tag => tag !== '');
    }

    // Create metadata for passage.
    // We translate Twine 1 attribute into Twine 2 metadata.
    const metadata = {};

    // Does position exist?
    if (position !== null) {
      // Add the property to metadata
      metadata.position = position;
    }

    /**
     * modifier: (string) Optional.
     *   Name of the tool that last edited the passage.
     *   Generally, for versions of Twine 1, this value will be "twee".
     *   Twee compilers may place their own name (e.g. "tweego" for Tweego).
     */
    if (Object.prototype.hasOwnProperty.call(attr, 'modifier')) {
      // In Twine 2, `creator` maps to Twine 1's `modifier`.
      s.creator = attr.modifier;
    }

    // Add the passage.
    s.addPassage(
      new Passage(
        name,
        text,
        tags,
        metadata
      )
    );
  }

  // Return story object.
  return s;
}

export { parse };
