import { Story } from '../Story.js';

/**
 * Write array of Story objects into Twine 2 Archive HTML.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-archive-spec.md Twine 2 Archive Specification}
 * @function compile
 * @param {Array} stories - Array of Story objects.
 * @returns {string} Twine 2 Archive HTML.
 * @example
 * const story1 = new Story();
 * const story2 = new Story();
 * const stories = [story1, story2];
 * console.log(compile(stories));
 * // => '<tw-storydata name="Untitled" startnode="1" creator="Twine" creator-version="2.3.9" ifid="A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6" zoom="1" format="Harlowe" format-version="3.1.0" options="" hidden><style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"></style><script role="script" id="twine-user-script" type="text/twine-javascript"></script><tw-passagedata pid="1" name="Untitled Passage" tags="" position="0,0" size="100,100"></tw-passagedata></tw-storydata>\n\n<tw-storydata name="Untitled" startnode="1" creator="Twine" creator-version="2.3.9" ifid="A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6" zoom="1" format="Harlowe" format-version="3.1.0" options="" hidden><style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"></style><script role="script" id="twine-user-script" type="text/twine-javascript"></script><tw-passagedata pid="1" name="Untitled Passage" tags="" position="0,0" size="100,100"></tw-passagedata></tw-storydata>\n\n'
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
