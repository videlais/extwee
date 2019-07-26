const fs = require("fs");
const path = require('path');
const StoryFormat = require('./StoryFormat.js');
const FileReader = require('./FileReader.js');
/**
 * @class StoryFormatParser
 * @module StoryFormatParser
 */
class StoryFormatParser {
	/**
     * @method StoryFormatParser
     * @constructor
     */
    constructor (file) {
        this.file = file;
        this.contents = "";
        this.extentsion = "";
        this.storyformat = null;
        // Load the file contents
        this.contents = new FileReader(this.file).contents;

        this.parse();
    }

    parse() {

        // Harlowe has malformed JSON, so we have to test for it
        let harlowePosition = this.contents.indexOf('harlowe');

        if(harlowePosition != -1) {
            // The 'setup' property is malformed
            let setupPosition = this.contents.lastIndexOf(',"setup": function');

            if(setupPosition != -1) {

                this.contents = this.contents.slice(0, setupPosition) + '}';

            }

        }

        let openingCurlyBracketPosition = this.contents.indexOf('{');
        let closingCurlyBracketPosition = this.contents.lastIndexOf('}');

        if(openingCurlyBracketPosition != -1 && closingCurlyBracketPosition != -1) {

            // Slice out the JSON
            this.contents = this.contents.slice(openingCurlyBracketPosition, closingCurlyBracketPosition+1);

        } else {

            throw new Error("Unable to find Twine2 JSON chunk!");

        }

        try {

            this.JSON = JSON.parse(this.contents);

        } catch (event) {

             throw new Error("Unable to parse Twine2 JSON chunk!");

        }

        this.storyformat = new StoryFormat(this.JSON);

    }

}

module.exports = StoryFormatParser;
