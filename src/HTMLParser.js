/**
 * @external HTML
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML|HTML}
 */

import { parse as HtmlParser } from 'node-html-parser';
import Story from './Story.js';
import Passage from './Passage.js';
/**
 * @class HTMLParser
 * @module HTMLParser
 */
export default class HTMLParser {
  /**
   * Parse HTML text into a JS DOM-like object
   *
   * @public
   * @static
   * @function parse
   * @param {string} content - Content to parse
   * @returns {Story} story
   */
  static parse (content) {
    let story = null;
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

    // Pull out the tw-storydata element
    const storyData = dom.querySelector('tw-storydata');

    // Does the <tw-storydata> element exist?
    if (storyData !== null) {
      // Create a Story.
      story = new Story();

      /**
       * name: (string) Required.
       *   The name of the story.
       */
      if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'name')) {
        // Create StoryTitle passage based on name
        story.addPassage(new Passage('StoryTitle', storyData.attributes.name));
      } else {
        // Name is a required filed. Warn user.
        console.warn('Twine 2 HTML must have a name!');
        // Set a default name
        story.addPassage(new Passage('StoryTitle', 'Untitled'));
      }

      /**
       * ifid: (string) Required.
       *   An IFID is a sequence of between 8 and 63 characters,
       *   each of which shall be a digit, a capital letter or a
       *   hyphen that uniquely identify a story (see Treaty of Babel).
       */
      if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'ifid')) {
        // Update story IFID
        story.IFID = storyData.attributes.ifid;
      } else {
        // Name is a required filed. Warn user.
        console.warn('Twine 2 HTML must have an IFID!');
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
        story.zoom = storyData.attributes.zoom;
      }

      /**
       * startnode: (string) Optional.
       *   The PID matching a <tw-passagedata> element whose content should be displayed first.
       */
      if (Object.prototype.hasOwnProperty.call(storyData.attributes, 'startnode')) {
        // Take string value and convert to Int
        startNode = Number.parseInt(storyData.attributes.startnode, 10);
      }
    } else {
      // If there is not a <tw-storydata> element, this is not a Twine 2 story!
      throw new Error('Not a Twine 2-style file!');
    }

    // Pull out the tw-passagedata elements
    const storyPassages = dom.querySelectorAll('tw-passagedata');

    // Move through the passages
    for (const passage in storyPassages) {
      // Get the passage attributes
      const attr = storyPassages[passage].attributes;
      // Get the passage text
      const text = storyPassages[passage].rawText;

      // Set a default position.
      let position = null;
      // Does position exist?
      if (Object.prototype.hasOwnProperty.call(attr, 'position')) {
        // Update position.
        position = attr.position;
      }

      // Set a default size.
      let size = null;
      // Does size exist?
      if (Object.prototype.hasOwnProperty.call(attr, 'size')) {
        // Update size.
        size = attr.size;
      }

      // Create a default name
      let name = '';
      // Does name exist?
      if (Object.prototype.hasOwnProperty.call(attr, 'name')) {
        // Escape the name
        name = HTMLParser.escapeMetacharacters(attr.name);
      }

      // Create empty tag array.
      let tags = [];
      // Does the tags attribute exist?
      if (Object.prototype.hasOwnProperty.call(attr, 'tags')) {
        // Escape any tags
        // (Attributes can, themselves, be empty strings.)
        if (attr.tags.length > 0 && attr.tags !== '""') {
          // Escape the tags
          tags = HTMLParser.escapeMetacharacters(attr.tags);
          // Split by spaces into an array
          tags = tags.split(' ');
        }

        // Remove any empty strings.
        tags = tags.filter(tag => tag !== '');
      }

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

      // Create a default PID
      let pid = -1;
      // Does pid exist?
      if (Object.prototype.hasOwnProperty.call(attr, 'pid')) {
        // Parse string into int
        // Update PID
        pid = Number.parseInt(attr.pid, 10);
      }

      // Add a new Passage into an array
      story.addPassage(
        new Passage(
          name,
          text,
          tags,
          metadata,
          pid
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
          'UserStyleSheet',
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

    // Try to find starting passage by PID.
    const startingPassage = story.getPassageByPID(startNode);

    // Is there a starting passage?
    if (startingPassage !== null) {
      // If so, update property.
      story.start = startingPassage;
    }

    // Return the parsed story
    return story;
  }

  /**
   * Try to escape meta-characters
   *
   * @public
   * @static
   * @function escapeMetacharacters
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
