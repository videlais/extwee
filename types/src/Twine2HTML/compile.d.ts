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
 * @throws {Error} If story IFID is not a valid UUID.
 * @throws {Error} If story name is an empty string.
 * @example
 * import { readFileSync } from 'node:fs';
 * import { parseTwee, parseStoryFormat, compileTwine2HTML } from 'extwee';
 * const story = parseTwee(readFileSync('story.twee', 'utf8'));
 * const format = parseStoryFormat(readFileSync('format.js', 'utf8'));
 * const html = compileTwine2HTML(story, format);
 */
export function compile(story: Story, storyFormat: StoryFormat): string;
import { Story } from '../Story.js';
import StoryFormat from '../StoryFormat.js';
