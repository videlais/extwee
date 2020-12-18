const StoryFormat = require('./StoryFormat.js');
/**
 * @class StoryFormatParser
 * @module StoryFormatParser
 */
class StoryFormatParser {
  /**
   * Parse a Story Format file
   *
   * @param {string} contents - Content
   * @returns {StoryFormat} storyformat
   */
  static parse (contents) {
    // Harlowe has malformed JSON, so we have to test for it
    const harlowePosition = contents.indexOf('harlowe');

    if (harlowePosition !== -1) {
      // The 'setup' property is malformed
      const setupPosition = contents.lastIndexOf(',"setup": function');
      contents = contents.slice(0, setupPosition) + '}';
    }

    // Find the start of story format or -1, if not found
    const openingCurlyBracketPosition = contents.indexOf('{');
    // Find the end of story format or -1, if not found
    const closingCurlyBracketPosition = contents.lastIndexOf('}');

    // Look for JSON among the story format
    // If either is -1, this is not valid JSON
    if (openingCurlyBracketPosition === -1 || closingCurlyBracketPosition === -1) {
      // Either start or end curly brackets were now found!
      throw new Error('Unable to find Twine2 JSON chunk!');
    } else {
      // Slice out the JSON based on curly brackets
      contents = contents.slice(openingCurlyBracketPosition, closingCurlyBracketPosition + 1);
    }

    let jsonContent = '';

    try {
      jsonContent = JSON.parse(contents);
    } catch (event) {
      throw new Error('Unable to parse Twine2 JSON chunk!');
    }

    return new StoryFormat(jsonContent);
  }
}

module.exports = StoryFormatParser;
