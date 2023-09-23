/**
 * @external HTML
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML|HTML}
 */

import { parse as HtmlParser } from 'node-html-parser';
import Passage from './Passage.js';
import Story from './Story.js';
/**
 * @class Twine1HTMLParser
 * @module Twine1HTMLParser
 *
 * Parses Twine 1 HTML into a Story object.
 *
 * See: Twine 1 HTML Output Documentation
 * (https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md)
 */
export default class Twine1HTMLParser {
  /**
   * Parse Twine 1 HTML text into a Story object.
   * @public
   * @static
   * @function parse
   * @param {string} content - Twine 1 HTML content to parse.
   * @returns {Story} Story
   */
  static parse (content) {
    const story = null;
    const startNode = null;

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

    // Pull out the tw-storydata element.
    const storyData = dom.querySelector('tw-storydata');

    // Does the <tw-storydata> element exist?
    if (storyData !== null) {
    }
  }
}
