
const fs = require("fs");
const path = require('path');
const StoryFormat = require('./StoryFormat.js');
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

        this.readFile(this.file);
        this.parse();
    }

    readFile(path) {

        const file = fs.realpathSync(path);

        // Attempt to find the file
        if(fs.existsSync(file) ) {

            this.contents = fs.readFileSync(file, 'utf8');

        } else {

            throw new Error("Error: Source file not found!");

        }

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
