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
   * Parse HTML text into a JS DOM-like object
   *
   * @param {string} content - Content to parse
   * @returns {Story} story
   */
  static parse (content) {
    let story = null;

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
      story = new Story();
      story.name = storyData.attributes.name;
      story.creator = storyData.attributes.creator;
      story.creatorVersion = storyData.attributes['creator-version'];

      story.metadata = {};
      story.metadata.ifid = storyData.attributes.ifid;
      story.metadata.format = storyData.attributes.format;
      story.metadata.formatVersion = storyData.attributes['format-version'];
      story.metadata.zoom = storyData.attributes.zoom;
      // Take string value and convert to Int
      story.metadata.start = parseInt(storyData.attributes.startnode);
    } else {
      throw new Error('Error: Not a Twine 2-style file!');
    }

    // Pull out the tw-passagedata elements
    const storyPassages = dom.querySelectorAll('tw-passagedata');

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
      const name = HTMLParser.escapeMetacharacters(attr.name);

      // Create empty tags
      let tags = '';

      // Escape any tags
      // (Attributes can, themselves, be empty strings.)
      if (attr.tags.length > 0 && attr.tags !== '""') {
        tags = HTMLParser.escapeMetacharacters(attr.tags);
      }

      // Split by spaces
      tags = tags.split(' ');

      // Remove any empty strings
      tags = tags.filter(tag => tag !== '');

      // Add a new Passage into an array
      story.passages.push(
        new Passage(
          name,
          tags,
          {
            position: position,
            size: size

          },
          text,
          parseInt(attr.pid)
        )
      );
    }

    // Look for the style element
    const styleElement = dom.querySelector('#twine-user-stylesheet');

    // Check if there is any content.
    // If not, we won't add empty passages
    if (styleElement.rawText.length > 0) {
      story.stylesheetPassage = styleElement.rawText;
    }

    // Look for the script element
    const scriptElement = dom.querySelector('#twine-user-script');

    // Check if there is any content.
    // If not, we won't add empty passages
    if (scriptElement.rawText.length > 0) {
      story.scriptPassage = scriptElement.rawText;
    }

    // Now that all passages have been handled,
    //  change the start value to passage name instead of PID
    story.metadata.start = story.getPassageByPID(story.metadata.start).name;

    return story;
  }

  /**
   * Try to escape meta-characters
   *
   * @param {string} result - Text to parse
   * @returns {string} Escaped characters
   */
  static escapeMetacharacters (result) {
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
