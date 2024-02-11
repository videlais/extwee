import { parse as HtmlParser } from 'node-html-parser';
import { parse as parseTwine2HTML } from '../Twine2HTML/parse.js';

/**
 * Parse HTML for one or more Twine 2 HTML elements and return array of story objects.
 * @function
 * @param {string} content - Content to parse for Twine 2 HTML elements.
 * @returns {Array} Array of stories found in content.
 */
function parse (content) {
  // Can only parse string values.
  if (typeof content !== 'string') {
    throw new TypeError('Content is not a string!');
  }

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

  // Array of possible story elements.
  const outputArray = [];

  // Pull out the `<tw-storydata>` element.
  const storyDataElements = dom.getElementsByTagName('tw-storydata');

  // Did we find any elements?
  if (storyDataElements.length === 0) {
    // If there is not a single `<tw-storydata>` element, this is not a Twine 2 story!
    throw new Error('Not Twine 2 HTML content!');
  }

  // Iterate through all `<tw-storydata>` elements.
  for (const storyElement of storyDataElements) {
    // Convert element back into HTML text and parse.
    outputArray.push(parseTwine2HTML(storyElement.outerHTML));
  }

  // Return array.
  return outputArray;
}

export { parse };
