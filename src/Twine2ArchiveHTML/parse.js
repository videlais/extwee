import { parse as HtmlParser } from 'node-html-parser';
import { parse as parseTwine2HTML } from '../Twine2HTML/parse.js';

/**
 * Parse Twine 2 Archive HTML and returns an array of story objects.
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
    // Produce a warning if no Twine 2 HTML content is found.
    console.warn('Warning: No Twine 2 HTML content found!');
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
