import StoryFormat from '../StoryFormat.js';

/**
 * Compiles a {@link StoryFormat} object into a JSONP string for writing to a `format.js` file.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-storyformats-spec.md Twine 2 Story Formats Specification}
 * @param {StoryFormat} storyFormat Story format object to compile.
 * @returns {string} JSONP string.
 */
function compile (storyFormat) {
    // Test if storyFormat is a StoryFormat object.
    if (!(storyFormat instanceof StoryFormat)) {
        throw new TypeError('Error: Incoming object is not a storyFormat object');
    }

    // Create a JSONP string wrapped with the function window.StoryFormat.
    return `window.storyFormat(${JSON.stringify(storyFormat)})`;
}

export { compile };