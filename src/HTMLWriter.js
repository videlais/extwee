/**
 * @external Story
 * @see Story.js
 * @external StoryFormat
 * @see StoryFormat.js
 */

const fs = require('fs');
const Story = require('./Story.js');
const StoryFormat = require('./StoryFormat.js');
/**
 * @class HTMLWriter
 * @module HTMLWriter
 */
class HTMLWriter {
  /**
   * @function HTMLWriter
   * @class
   * @param {string} file - File to write
   * @param {Story} story - Story object to write
   * @param {StoryFormat} storyFormat - Story format to write
   * @param {string} css - Any CSS to write
   * @param {string} js - Any JS to write
   */
  constructor (file, story, storyFormat, css, js) {
    if (!(story instanceof Story)) {
      throw new Error('Error: story must be a Story object!');
    }

    if (!(storyFormat instanceof StoryFormat)) {
      throw new Error('storyFormat must be a StoryFormat object!');
    }

    const cssContent = css || null;
    const jsContent = js || null;

    this.writeFile(file, story, storyFormat, cssContent, jsContent);
  }

  /**
   * Write story to file using story format and adding any CSS and JS
   *
   * @function writeFile
   * @param {string} file - File to write
   * @param {Story} story - Story object to write
   * @param {StoryFormat} storyFormat - StoryFormat to write
   * @param {string} cssContent - Any CSS to write
   * @param {string} jsContent - Any JS to write
   * @returns {void}
   */
  writeFile (file, story, storyFormat, cssContent, jsContent) {
    let outputContents = '';

    // Build <tw-storydata>
    let storyData =
            '<tw-storydata name="' + story.name + '" ' +
            'startnode="' + story.getStartingPassage() + '" ' +
            'creator="' + story.creator + '" ' +
            'creator-version="' + story.creatorVersion + '" ' +
            'ifid="' + story.metadata.ifid + '" ' +
            'zoom="' + story.metadata.zoom + '" ' +
            'format="' + storyFormat.name + '" ' +
            'format-version="' + storyFormat.version + '" ' +
            'options hidden>\n';

    // Build the STYLE
    storyData += '<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">';

    // Get any passages tagged with 'stylesheet'
    const stylePassages = story.getStylePassages();

    // CSS passed through from DirectoryReader
    if (cssContent != null) {
      storyData += cssContent;
    }

    // Iterate through the collection and add to storyData
    for (const content of stylePassages) {
      storyData += content.text;
    }

    storyData += '</style>\n';

    // Build the SCRIPT
    storyData += '<script role="script" id="twine-user-script" type="text/twine-javascript">';

    // Get any passages tagged with 'script'
    const scriptPassages = story.getScriptPassages();

    // JS passed through from DirectoryReader
    if (jsContent != null) {
      storyData += jsContent;
    }

    // Iterate through the collection and add to storyData
    for (const content of scriptPassages) {
      storyData += content.text;
    }

    storyData += '</script>\n';

    // All the script data has been written.
    // Delete all 'script'-tagged passages
    story.deleteAllByTag('script');

    // All the style data has been written.
    // Delete all 'style'-tagged passages
    story.deleteAllByTag('stylesheet');

    // Build the passages
    for (const passage of story.passages) {
      storyData += '<tw-passagedata pid="' + passage.pid + '" name="' + passage.name + '"';

      // Write out any tags
      if (passage.tags.length > 1) {
        storyData += ' tags="';

        for (const t of passage.tags) {
          storyData += t + ', ';
        }

        storyData += '" ';
      } else if (passage.tags.length === 1) {
        storyData += ' tags="' + passage.tags[0] + '" ';
      } else {
        storyData += ' tags ';
      }

      // Write out position
      if (Object.prototype.hasOwnProperty.call(passage.metadata, 'position')) {
        storyData += 'position="' +
                    passage.metadata.position + '" ';
      } else {
        // Didn't have a position.
        // Make one up.
        storyData += 'position="100,100" ';
      }

      // Write out size
      if (Object.prototype.hasOwnProperty.call(passage.metadata, 'size')) {
        storyData += 'size="' +
                    passage.metadata.size + '" ';
      } else {
        // Didn't have a size.
        // Make one up.
        storyData += 'size="100,100" ';
      }

      storyData += '>' + passage.text + '</tw-passagedata>\n';
    }

    storyData += '</tw-storydata>';

    // Replace the story name in the source file
    storyFormat.source = storyFormat.source.replace('{{STORY_NAME}}', story.name);

    // Replace the story data
    storyFormat.source = storyFormat.source.replace('{{STORY_DATA}}', storyData);

    outputContents += storyFormat.source;

    try {
      // Try to write
      fs.writeFileSync(file, outputContents);
    } catch (event) {
      // Throw error
      throw new Error('Error: Cannot write HTML file!');
    }
  }
}

module.exports = HTMLWriter;
