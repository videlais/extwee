import { parse as HtmlParser } from 'node-html-parser';
import Passage from '../Passage.js';
import { Story } from '../Story.js';

/**
 * Parses Twine 1 HTML into a Story object.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md Twine 1 HTML Documentation}
 * @function parse
 * @param {string} content - Twine 1 HTML content to parse.
 * @returns {Story} Story object
 */
function parse (content) {
  // Create a default Story.
  const s = new Story();

  // Send to node-html-parser.
  // Enable getting the content of 'script', 'style', and 'pre' elements.
  // Get back a DOM.
  const dom = new HtmlParser(
    content,
    {
      lowerCaseTagName: false,
      script: true,
      style: true,
      pre: true
    });

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
  for (const passage in storyPassages) {
    // Get the passage attributes.
    const attr = storyPassages[passage].attributes;
    // Get the passage text.
    const text = storyPassages[passage].rawText;

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
