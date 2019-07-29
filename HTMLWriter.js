const fs = require("fs");
const Story = require('./Story.js');
const StoryFormat = require('./StoryFormat.js');
/**
 * @class HTMLWriter
 * @module HTMLWriter
 */
class HTMLWriter {
	/**
     * @method HTMLWriter
     * @constructor
     */
    constructor (file, story, storyFormat, css, js) {

        if( !(story instanceof Story) ) {
          throw new Error("Error: story must be a Story object!");
        }

        if( !(storyFormat instanceof StoryFormat)) {

          throw new Error("storyFormat must be a StoryFormat object!");

        }

        let cssContent = css || null;
        let jsContent = js || null;

        this.writeFile(file, story, storyFormat, cssContent, jsContent);
    }

    writeFile(file, story, storyFormat, cssContent, jsContent) {

        let outputContents = "";

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
        let stylePassages = story.getStylePassages();

        // CSS passed through from DirectoryReader
        if(cssContent != null) {
          storyData += cssContent;
        }

        // Iterate through the collection and add to storyData
        for(let content of stylePassages) {
            storyData += content.text;
        }

        storyData += '</style>\n';

        // Build the SCRIPT
        storyData += '<script role="script" id="twine-user-script" type="text/twine-javascript">';

        // Get any passages tagged with 'script'
        let scriptPassages = story.getScriptPassages();

        // JS passed through from DirectoryReader
        if(jsContent != null) {
          storyData += jsContent;
        }

        // Iterate through the collection and add to storyData
        for(let content of scriptPassages) {
            storyData += content.text;
        }

        storyData += '</script>\n';

        // All the script data has been written.
        // Delete all 'script'-tagged passages
        story.deleteAllByTag("script");

        // All the style data has been written.
        // Delete all 'style'-tagged passages
        story.deleteAllByTag("stylesheet");

        // Build the passages
        for(let passage of story.passages) {

            storyData += '<tw-passagedata pid="' + passage.pid + '" name="' + passage.name + '"';

            // Write out any tags
            if(passage.tags.length > 1) {

                storyData += ' tags="';

                for(let t of passage.tags) {

                    storyData += t + ', ';

                }

                storyData += '" ';

            } else if(passage.tags.length == 1) {

                storyData += ' tags="' + passage.tags[0] + '" ';

            } else {

                storyData += ' tags ';

            }

            // Write out position
            if(passage.metadata.hasOwnProperty("position")) {

                storyData += 'position="' +
                    passage.metadata.position + '" ';

            } else {

                // Didn't have a position.
                // Make one up.
                storyData += 'position="100,100" ';

            }

            // Write out size
            if(passage.metadata.hasOwnProperty("size") ) {

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
        storyFormat.source = storyFormat.source.replace("{{STORY_NAME}}", story.name);

        // Replace the story data
        storyFormat.source = storyFormat.source.replace("{{STORY_DATA}}", storyData);

        outputContents += storyFormat.source

        try {

          // Try to write
          fs.writeFileSync(file, outputContents);

        } catch(event) {

          // Throw error
          throw new Error("Error: Cannot write HTML file!");

        }

    }

}

module.exports = HTMLWriter;
