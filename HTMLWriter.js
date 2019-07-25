const fs = require("fs");
const path = require('path');
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
    constructor (file, story, storyFormat = null, cssContent = null, jsContent = null) {
        this.file = file;
        this.story = story;
        this.storyFormat = storyFormat;
        this.outputContents = "";
        this.storyData = "";
        this.cssContent = cssContent;
        this.jsContent = jsContent;

        // Store the creator and version
        this.story.creator = "Extwee";
        this.story.creatorVersion = "1.1.3";

        this.writeFile(file);
    }

    writeFile(file) {

        // Check if this.storyFormat was overwritten.
        // If not, use the values from this.story
        if(this.storyFormat == null) {

            this.storyFormat = {};
            this.storyFormat.name = this.story.metadata.format;
            this.storyFormat.version = this.story.metadata.formatVersion;

        }

        // Build <tw-storydata>
        this.storyData +=
            '<tw-storydata name="' + this.story.name + '" ' +
            'startnode="' + this.story.getStartingPassage() + '" ' +
            'creator="' + this.story.creator + '" ' +
            'creator-version="' + this.story.creatorVersion + '" ' +
            'ifid="' + this.story.metadata.ifid + '" ' +
            'zoom="' + this.story.metadata.zoom + '" ' +
            'format="' + this.storyFormat.name + '" ' +
            'format-version="' + this.storyFormat.version + '" ' +
            'options hidden>\n';

        // Build the STYLE
        this.storyData += '<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">';

        // Get any passages tagged with 'style'
        let stylePassages = this.story.getStylePassages();

        if(this.cssContent != null) {
          this.storyData += this.cssContent;
        }

        // Iterate through the collection and add to storyData
        for(let content of stylePassages) {
            this.storyData += content.text;
        }

        this.storyData += '</style>\n';

        // Build the SCRIPT
        this.storyData += '<script role="script" id="twine-user-script" type="text/twine-javascript">';

        // Get any passages tagged with 'script'
        let scriptPassages = this.story.getScriptPassages();

        if(this.jsContent != null) {
          this.storyData += this.jsContent;
        }

        // Iterate through the collection and add to storyData
        for(let content of scriptPassages) {
            this.storyData += content.text;
        }

        this.storyData += '</script>\n';

        // All the script data has been written.
        // Delete all 'script'-tagged passages
        this.story.deleteAllByTag("script");

        // All the style data has been written.
        // Delete all 'style'-tagged passages
        this.story.deleteAllByTag("style");

        // Build the passages
        for(let passage of this.story.passages) {

            this.storyData += '<tw-passagedata pid="' + passage.pid + '" name="' + passage.name + '"';

            // Write out any tags
            if(passage.tags.length > 1) {

                this.storyData += ' tags="';

                for(let t of passage.tags) {

                    this.storyData += t + ', ';

                }

                this.storyData += '" ';

            } else if(passage.tags.length == 1) {

                this.storyData += ' tags="' + passage.tags[0] + '" ';

            } else {

                this.storyData += ' tags ';

            }

            // Write out position
            if(passage.metadata.hasOwnProperty("position")) {

                this.storyData += 'position="' +
                    passage.metadata.position + '" ';

            } else {

                // Didn't have a position.
                // Make one up.
                this.storyData += 'position="100,100" ';

            }

            // Write out size
            if(passage.metadata.hasOwnProperty("size") ) {

                this.storyData += 'size="' +
                    passage.metadata.size + '" ';

            } else {

                // Didn't have a size.
                // Make one up.
                this.storyData += 'size="100,100" ';

            }

            this.storyData += '>' + passage.text + '</tw-passagedata>\n';

        }

        this.storyData += '</tw-storydata>';

        // Replace the story name in the source file
        this.storyFormat.source = this.storyFormat.source.replace("{{STORY_NAME}}", this.story.name);

        // Replace the story data
        this.storyFormat.source = this.storyFormat.source.replace("{{STORY_DATA}}", this.storyData);

        this.outputContents += this.storyFormat.source

        // Write the entire contents out
        fs.writeFileSync(file, this.outputContents);

    }

}

module.exports = HTMLWriter;
