const { parse } = require('node-html-parser');
const htmlparser = parse;
const Story = require('./Story.js');
const Passage = require('./Passage.js');
/**
 * @class HTMLParser
 * @module HTMLParser
 */
class HTMLParser {
	/**
     * @method HTMLParser
     * @constructor
     */
    constructor (content) {

        this.story = null;

        this.parse(content);
    }

    parse(content) {

        // Send to node-html-parser
        // Enable getting the content of 'script', 'style', and 'pre' elements
        // Get back a DOM
        let dom = new htmlparser(
                        content,
                        {
                                  lowerCaseTagName: false,
                                  script: true,
                                  style: true,
                                  pre: true
                        });

        // Pull out the tw-storydata element
        let storyData = dom.querySelector('tw-storydata');

        if(storyData != null) {

            this.story = new Story();
            this.story.name = storyData.attributes["name"];
            this.story.creator = storyData.attributes["creator"];
            this.story.creatorVersion = storyData.attributes["creator-version"];

            this.story.metadata = {};
            this.story.metadata.ifid = storyData.attributes["ifid"];
            this.story.metadata.format = storyData.attributes["format"];
            this.story.metadata.formatVersion = storyData.attributes["format-version"];
            this.story.metadata.zoom = storyData.attributes["zoom"];
            this.story.metadata.start = storyData.attributes["startnode"];

        } else {

            throw new Error("Error: Not a Twine 2-style file!");

        }

        // Pull out the tw-passagedata elements
        let storyPassages = dom.querySelectorAll("tw-passagedata");

        // Create an empty array
        this.story.passages = new Array();

          // Set default pid
        let pid = 1;

        // Add StoryTitle
        this.story.passages.push(
            new Passage(
                "StoryTitle",
                [],
                {},
                this.story.name,
                pid
            )
        );

       // Increase PID by one before parsing any other passages
       pid++;

        // Move through the passages
        for(let passage in storyPassages) {

            // Get the passage attributes
            let attr = storyPassages[passage].attributes;
            // Get the passage text
            let text = storyPassages[passage].rawText;

            // Save position
            let position = attr.position;

            // Save size
            let size = attr.size;

            // Escape the name
            let name = this._escapeMetacharacters(attr.name);

            // Create empty tags
            let tags = "";

            // Escape any tags
            // (Attributes can, themselves, be emtpy strings.)
            if(attr.tags.length > 0 && attr.tags != '""') {

                tags = this._escapeMetacharacters(attr.tags);

            }

            // Split by spaces
            tags = tags.split(" ");

            // Remove any empty strings
            tags = tags.filter(tag => tag != "");

            // Add a new Passage into an array
            this.story.passages.push(
                new Passage(
                        name,
                        tags,
                        {
                            "position": position,
                            "size": size

                        },
                        text,
                        pid
                    )
            );

            pid++;

        }

        // Look for the style element
        let styleElement = dom.querySelector('#twine-user-stylesheet');

        // Check if there is any content.
        // If not, we won't add empty passages
        if(styleElement.rawText.length > 0) {

            // Add UserStylesheet
            this.story.passages.push(
                new Passage(
                    "UserStylesheet",
                    ["stylesheet"],
                    {},
                    styleElement.rawText
                )
            );
        }

        // Look for the script element
        let scriptElement = dom.querySelector('#twine-user-script');

        // Check if there is any content.
        // If not, we won't add empty passages
        if(scriptElement.rawText.length > 0) {

            // Add UserScript
            this.story.passages.push(
                new Passage(
                    "UserScript",
                    ["script"],
                    {},
                    scriptElement.rawText
                )
            );

        }

        // Now that all passages have been handled,
        //  change the start name
        this.story.metadata.start = this.story.getStartingPassage();

        // Add StoryData
        this.story.passages.push(
            new Passage(
                "StoryData",
                [],
                {},
                JSON.stringify(this.story.metadata, null, 4)
            )
        );

    }

    _escapeMetacharacters(result) {

        // Replace any single backslash with two of them
        result = result.replace(/\\/g, "\\");
        // Double-escape escaped {
        result = result.replace(/\\\{/g, "\\\\{");
        // Double-escape escaped }
        result = result.replace(/\\\}/g, "\\\\}");
        // Double-escape escaped [
        result = result.replace(/\\\[/g, "\\\\[");
        // Double-escape escaped ]
        result = result.replace(/\\\]/g, "\\\\]");

        return result;

    }

}

module.exports = HTMLParser;
