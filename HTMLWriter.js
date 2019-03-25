const fs = require("fs");
const path = require('path');
const Story = require('./Story.js');
const StoryFormat = require('./StoryFormat.js');
/**
 * @class HTMLWriter
 * @module TweeWriter
 */
class HTMLWriter {
	/**
     * @method TweeWriter
     * @constructor
     */
    constructor (file, story, storyFormat) {
        this.file = file;
        this.story = story;
        this.storyFormat = storyFormat;
        this.outputContents = "";
        this.storyData = "";

        // Store the creator and version
        this.story.creator = "Extwee";
        this.story.creatorVersion = "0.5.0";

        this.writeFile(file);
    }

    writeFile(file) {

        // Build <tw-storydata>
        this.storyData += 
            '<tw-storydata name="' + this.story.name + '" ' +
            'startnode="' + this.story.metadata.start + '" ' +
            'creator="' + this.story.creator + '" ' +
            'creator-version="' + this.story.creatorVersion + '" ' +
            'ifid="' + this.story.metadata.ifid + '" ' + 
            'zoom="' + this.story.metadata.zoom + '" ' +
            'format="' + this.story.metadata.format + '" ' + 
            'format-version="' + this.story.metadata.formatVersion + '" ' + 
            'options hidden>\n';

        // Build the STYLE
        this.storyData += '<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">';

        // Get any passages tagged with 'style'
        let stylePassages = this.story.getStylePassages();

        // Iterate through the collection and add to storyData
        for(let content of stylePassages) {
            this.storyData += content.text;
        }

        this.storyData += '</style>\n';

        // Build the SCRIPT
        this.storyData += '<script role="script" id="twine-user-script" type="text/twine-javascript">';
        
        // Get any passages tagged with 'script'
        let scriptPassages = this.story.getScriptPassages();

        // Iterate through the collection and add to storyData
        for(let content of scriptPassages) {
            this.storyData += content.text;
        }

        this.storyData += '</script>\n';


        let pid = 1;

        // Build the passages
        for(let passage of this.story.passages) {

            this.storyData += '<tw-passagedata pid="' + pid + '" name="' + passage.name + '"';

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

            this.storyData += '>' + passage.text + '</tw-passagedata>\n';
            pid++;

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
