import { Story } from '../Story.js';
import StoryFormat from '../StoryFormat.js';

/**
 * Write a combination of Story + StoryFormat into Twine 2 HTML file.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md Twine 2 HTML Output Specification}
 * @function compile
 * @param {Story} story - Story object to write.
 * @param {StoryFormat} storyFormat - StoryFormat to write.
 * @returns {string} Twine 2 HTML based on StoryFormat and Story.
 * @throws {Error} If story is not instance of Story.
 * @throws {Error} If storyFormat is not instance of StoryFormat.
 * @throws {Error} If storyFormat.source is empty string.
 */
function compile (story, storyFormat) {
  // Check if story is instanceof Story.
  if (!(story instanceof Story)) {
    throw new Error('Error: story must be a Story object!');
  }

  // Check if storyFormat is instanceof StoryFormat.
  if (!(storyFormat instanceof StoryFormat)) {
    throw new Error('storyFormat must be a StoryFormat object!');
  }

  // Check if storyFormat.source is empty string.
  if (storyFormat.source === '') {
    throw new Error('StoryFormat source empty string!');
  }

  /**
   * There are two required attributes:
   * - story.IFID: UUIDv4
   * - story.name: string (non-empty)
   */

  // Check if story.IFID is UUIDv4 formatted.
  if (story.IFID.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[89ABab][0-9A-F]{3}-[0-9A-F]{12}$/) === null) {
    throw new Error('Story IFID is invalid!');
  }

  // Check if story.name is empty string.
  if (story.name === '') {
    throw new Error('Story name empty string!');
  }

  // Translate story to Twine 2 HTML.
  const storyData = story.toTwine2HTML();

  // Replace the story name in the source file.
  storyFormat.source = storyFormat.source.replaceAll(/{{STORY_NAME}}/gm, story.name);

  // Replace the story data.
  storyFormat.source = storyFormat.source.replaceAll(/{{STORY_DATA}}/gm, storyData);

  // Return content.
  return storyFormat.source;
}

export { compile };
