/**
 * Write a combination of Story + StoryFormat into Twine 2 HTML file.
 * @param {Story} story - Story object to write.
 * @param {StoryFormat} storyFormat - StoryFormat to write.
 * @returns {string} Twine 2 HTML.
 */
export function compile(story: Story, storyFormat: StoryFormat): string;
import Story from '../Story.js';
import StoryFormat from '../StoryFormat.js';
