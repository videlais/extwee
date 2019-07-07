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

        this.dom = null;
        this.story = null;

        this.parse(content);
    }

    parse(content) {

        // Send to node-html-parser
        // Enable getting the content of 'script', 'style', and 'pre' elements
        // Get back a DOM
        this.dom = new htmlparser(
                        content,
                        {
                                  lowerCaseTagName: false,
                                  script: true,
                                  style: true,
                                  pre: true
                        });

        // Pull out the tw-storydata element
        let storyData = this.dom.querySelector('tw-storydata');

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
        let storyPassages = this.dom.querySelectorAll("tw-passagedata");

        // Create an empty array
        this.story.passages = new Array();

        // Add StoryTitle
        this.story.passages.push(
            new Passage(
                "StoryTitle",
                "",
                {},
                this.story.name
            )
        );

        // Move through the passages
        for(let passage in storyPassages) {

            // Get the passage attributes
            let attr = storyPassages[passage].attributes;
            // Get the passage text
            let text = storyPassages[passage].rawText;

            // Split the string into an array
            let position = attr.position;

            // Split the string into an array
            let size = attr.size;

            // Escape the name
            let name = this._escapeMetacharacters(attr.name);

            // Create empty tags
            let tags = new String();

            // Escape any tags
            // (Attributes can, themselves, be emtpy strings.)
            if(attr.tags.length > 0 && attr.tags != '""') {

                tags = this._escapeMetacharacters(attr.tags);

            }

            // Add a new Passage into an array
            this.story.passages.push(
                new Passage(
                        name,
                        tags,
                        {
                            "position": position,
                            "size": size

                        },
                        text
                    )
            );

        }

        // Look for the style element
        let styleElement = this.dom.querySelector('#twine-user-stylesheet');

        // Check if there is any content.
        // If not, we won't add empty passages
        if(styleElement.rawText.length > 0) {

            // Add UserStylesheet
            this.story.passages.push(
                new Passage(
                    "UserStylesheet",
                    "style",
                    {},
                    styleElement.rawText
                )
            );
        }

        // Look for the script element
        let scriptElement = this.dom.querySelector('#twine-user-script');

        // Check if there is any content.
        // If not, we won't add empty passages
        if(scriptElement.rawText.length > 0) {

            // Add UserScript
            this.story.passages.push(
                new Passage(
                    "UserScript",
                    "script",
                    {},
                    scriptElement.rawText
                )
            );

        }

        // Now that all passages have been handled,
        //  change the start name from number to string.
        this.story.metadata.start = this.story.getStartingPassage();

        // Add StoryMetadata
        this.story.passages.push(
            new Passage(
                "StoryData", 
                "",
                {},
                JSON.stringify(this.story.metadata, null, 4)
            )
        );

    }

    _escapeMetacharacters(text) {

        let result = text;

        let leftCurly = text.indexOf('\{');

        if(leftCurly != -1) {

            result = result.substring(0, leftCurly) + '\\' + result.substring(leftCurly);
        }

        let rightCurly = text.indexOf('\}');

        if(rightCurly != -1) {

            result = result.substring(0, rightCurly) + '\\' + result.substring(rightCurly);
        }

        let leftSquare = text.indexOf('\[');

        if(leftSquare != -1) {

            result = result.substring(0, leftSquare) + '\\' + result.substring(leftSquare);
        }

        let rightSquare = text.indexOf('\]');

        if(rightSquare != -1) {

            result = result.substring(0, rightSquare) + '\\' + result.substring(rightSquare);

        }

        // To avoid ambiguity, non-escape backslashes must also be escaped
        // (We need to check that we haven't already escaped metacharacters.)
        if(leftCurly == -1 &&
           rightCurly == -1 &&
           leftSquare == -1 &&
           rightSquare == -1) {

            let pos = text.indexOf("\\");

            if(pos != -1) {

                // Escape any single backslashes
                result = result.substring(0, pos-1) + '\\' + result.substring(pos);

            }

        }


        return result;

    }

}

module.exports = HTMLParser;
