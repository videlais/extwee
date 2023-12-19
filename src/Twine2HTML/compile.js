import Story from '../Story.js';
import StoryFormat from '../StoryFormat.js';

/**
 * Write a combination of Story + StoryFormat into Twine 2 HTML file.
 * @param {Story} story - Story object to write.
 * @param {StoryFormat} storyFormat - StoryFormat to write.
 * @returns {string} Twine 2 HTML.
 */
function compile (story, storyFormat) {
  if (!(story instanceof Story)) {
    throw new Error('Error: story must be a Story object!');
  }

  if (!(storyFormat instanceof StoryFormat)) {
    throw new Error('storyFormat must be a StoryFormat object!');
  }

  let outputContents = '';
  const storyData = story.toTwine2HTML();

  // Replace the story name in the source file.
  storyFormat.source = storyFormat.source.replaceAll(/{{STORY_NAME}}/gm, story.name);

  // Replace the story data.
  storyFormat.source = storyFormat.source.replaceAll(/{{STORY_DATA}}/gm, storyData);

  // Combine everything together.
  outputContents += storyFormat.source;

  // Return content.
  return outputContents;
}

export { compile };
