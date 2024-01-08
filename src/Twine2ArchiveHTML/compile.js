import { Story } from '../Story.js';

/**
 * Write array of Story objects into Twine 2 Archive HTML.
 * @param {Array} stories - Array of Story objects.
 * @returns {string} Twine 2 Archive HTML.
 */
function compile (stories) {
  // Can only accept array.
  if (!Array.isArray(stories)) {
    throw new TypeError('Stories is not array!');
  }

  // Output
  let outputContents = '';

  // Go through each entry (which must be a Story).
  for (const story of stories) {
    // If this is not a story, throw a TypeError.
    if (!(story instanceof Story)) {
      // Throw TypeError.
      throw new TypeError('Error: story must be a Story object!');
    }

    // Append content.
    outputContents += story.toTwine2HTML();

    // Append newlines.
    outputContents += '\n\n';
  }

  // Return output
  return outputContents;
}

export { compile };
