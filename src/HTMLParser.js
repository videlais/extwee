/**
 * @external HTML
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML|HTML}
 */

const { parse } = require('node-html-parser');
const HtmlParser = parse;
const Story = require('./Story.js');
const Passage = require('./Passage.js');
/**
 * @class HTMLParser
 * @module HTMLParser
 */
class HTMLParser {
  /**
   * @function HTMLParser
   * @class
   * @param {HTML} content - HTML to parse
   */
  constructor (content) {
    this.story = null;
    this.parse(content);
  }

  /**
   * Parse HTML text into a JS DOM-like object
   *
   * @param {string} content - Content to parse
   * @returns {void}
   */
  parse (content) {
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

    // Pull out the tw-storydata element
    const storyData = dom.querySelector('tw-storydata');

    if (storyData != null) {
      this.story = new Story();
      this.story.name = storyData.attributes.name;
      this.story.creator = storyData.attributes.creator;
      this.story.creatorVersion = storyData.attributes['creator-version'];

      this.story.metadata = {};
      this.story.metadata.ifid = storyData.attributes.ifid;
      this.story.metadata.format = storyData.attributes.format;
      this.story.metadata.formatVersion = storyData.attributes['format-version'];
      this.story.metadata.zoom = storyData.attributes.zoom;
      this.story.metadata.start = storyData.attributes.startnode;
    } else {
      throw new Error('Error: Not a Twine 2-style file!');
    }

    // Pull out the tw-passagedata elements
    const storyPassages = dom.querySelectorAll('tw-passagedata');

    // Create an empty array
    this.story.passages = [];

    // Set default pid
    let pid = 1;

    // Add StoryTitle
    this.story.passages.push(
      new Passage(
        'StoryTitle',
        [],
        {},
        this.story.name,
        pid
      )
    );

    // Increase PID by one before parsing any other passages
    pid++;

    // Move through the passages
    for (const passage in storyPassages) {
      // Get the passage attributes
      const attr = storyPassages[passage].attributes;
      // Get the passage text
      const text = storyPassages[passage].rawText;

      // Save position
      const position = attr.position;

      // Save size
      const size = attr.size;

      // Escape the name
      const name = this._escapeMetacharacters(attr.name);

      // Create empty tags
      let tags = '';

      // Escape any tags
      // (Attributes can, themselves, be emtpy strings.)
      if (attr.tags.length > 0 && attr.tags !== '""') {
        tags = this._escapeMetacharacters(attr.tags);
      }

      // Split by spaces
      tags = tags.split(' ');

      // Remove any empty strings
      tags = tags.filter(tag => tag !== '');

      // Add a new Passage into an array
      this.story.passages.push(
        new Passage(
          name,
          tags,
          {
            position: position,
            size: size

          },
          text,
          pid
        )
      );

      pid++;
    }

    // Look for the style element
    const styleElement = dom.querySelector('#twine-user-stylesheet');

    // Check if there is any content.
    // If not, we won't add empty passages
    if (styleElement.rawText.length > 0) {
      // Add UserStylesheet
      this.story.passages.push(
        new Passage(
          'UserStylesheet',
          ['stylesheet'],
          {},
          styleElement.rawText
        )
      );
    }

    // Look for the script element
    const scriptElement = dom.querySelector('#twine-user-script');

    // Check if there is any content.
    // If not, we won't add empty passages
    if (scriptElement.rawText.length > 0) {
      // Add UserScript
      this.story.passages.push(
        new Passage(
          'UserScript',
          ['script'],
          {},
          scriptElement.rawText
        )
      );
    }

    // Now that all passages have been handled,
    //  change the start name
    this.story.metadata.start = this.story.getStartingPassage();

    // Add StoryData
    this.story.passages.push(
      new Passage(
        'StoryData',
        [],
        {},
        JSON.stringify(this.story.metadata, null, 4)
      )
    );
  }

  /**
   * Try to escape meta-characters
   *
   * @param {string} result - Text to parse
   * @returns {string} Escaped characters
   */
  _escapeMetacharacters (result) {
    // Replace any single backslash with two of them
    result = result.replace(/\\/g, '\\');
    // Double-escape escaped {
    result = result.replace(/\\\{/g, '\\\\{');
    // Double-escape escaped }
    result = result.replace(/\\\}/g, '\\\\}');
    // Double-escape escaped [
    result = result.replace(/\\\[/g, '\\\\[');
    // Double-escape escaped ]
    result = result.replace(/\\\]/g, '\\\\]');

    return result;
  }
}

module.exports = HTMLParser;
