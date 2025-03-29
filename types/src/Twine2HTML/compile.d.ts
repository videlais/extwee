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
export function compile(story: Story, storyFormat: StoryFormat): string;
import { Story } from '../Story.js';
import StoryFormat from '../StoryFormat.js';
