
const fs = require("fs");
const path = require('path');
const { parse } = require('node-html-parser');
const HTMLParser = parse;
const Story = require('./Story.js');
const Passage = require('./Passage.js');
/**
 * @class HTMLDecompiler
 * @module HTMLDecompiler
 */
class HTMLDecompiler {
	/**
     * @method HTMLDecompiler
     * @constructor
     */
    constructor (inputFile, outputFile) {
        this.inputFile = inputFile;
        this.outputFile = outputFile;
        this.inputContents = "";
        this.outputContents = "";

        this.dom = null;
        this.story = null;
        this.passages = null;

        this.readFile(this.inputFile);
        this.parse();
        this.writeFile(this.outputFile);
    }

    readFile(file) {

        // Attempt to find the file
        if(fs.existsSync(file) ) {

            this.inputContents = fs.readFileSync(file, 'utf8');

        } else {

            throw new Error("Error: File not found!");
        
        }

    }

    parse() {

        this.dom = new HTMLParser(this.inputContents);

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
        this.passages = new Array();

        // Add StoryTitle
        this.passages.push(
            new Passage(
                "StoryTitle", 
                [],
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
            let position = attr.position.split(",");

            // Split the string into an array
            let size = attr.size.split(",");

            // Create the tags array
            let tagArray = [];

            // Test if more than the empty string, ""
            if(attr.tags.length > 2) {

                // Split the string into tags
                tagArray = attr.tags.split(",");

            }

            // Check if "Start" is, in fact, the Start passage
            if(attr.pid == "1" && attr.name != "Start") {

                this.story.metadata.start = attr.name;

            } else {

                // Start exists, so remove this optional property
                delete this.story.metadata.start;

            }

            // Add a new Passage into an array
            this.passages.push(
                new Passage(
                        attr.name, 
                        tagArray,
                        {
                            "position": [ position[0], position[1] ],
                            "size": [ size[0], size[1] ]

                        }, 
                        text
                    )
            );

        }

        // Add StoryMetadata
        this.passages.push(
            new Passage(
                "StoryMetadata", 
                [],
                {}, 
                JSON.stringify(this.story.metadata, null, 4)
            )
        );
        
    }

    writeFile(file) {

        // Build the contents
        for(let passage of this.passages) {

            // Write the name
            this.outputContents += ":: " + passage.name;

            // Test if it has tags
            if(passage.tags.length > 0) {

                this.outputContents += " [";

                for(let tag of passage.tags) {

                    this.outputContents += tag + ", ";

                }

                this.outputContents += "]";

            }

            // Test if it is not just an empty object
            if(Object.keys(passage.metadata).length > 0) {

                // We are decompiling, so there will always be metadata
                this.outputContents += " " + JSON.stringify(passage.metadata);

            }

            // Add the text and two newlines
            this.outputContents += "\n" + passage.text + "\n\n";

        }

        // Write the entire contents out
        fs.writeFileSync(file, this.outputContents);

    }

}

module.exports = HTMLDecompiler;
