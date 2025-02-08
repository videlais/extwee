/**
 * Compiles a {@link StoryFormat} object into a JSONP string for writing to a `format.js` file.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-storyformats-spec.md Twine 2 Story Formats Specification}
 * @param {StoryFormat} storyFormat Story format object to compile.
 * @returns {string} JSONP string.
 */
export function compile(storyFormat: StoryFormat): string;
import StoryFormat from '../StoryFormat.js';
