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

        this.storyformat = null;

        this.parse(file);
    }

    parse(file) {

        let contents = new FileReader(file).contents;

        // Harlowe has malformed JSON, so we have to test for it
        let harlowePosition = contents.indexOf('harlowe');

        if(harlowePosition != -1) {
            // The 'setup' property is malformed
            let setupPosition = contents.lastIndexOf(',"setup": function');
            contents = contents.slice(0, setupPosition) + '}';

        }

        let openingCurlyBracketPosition = contents.indexOf('{');
        let closingCurlyBracketPosition = contents.lastIndexOf('}');

        if(openingCurlyBracketPosition != -1 && closingCurlyBracketPosition != -1) {

            // Slice out the JSON
            contents = contents.slice(openingCurlyBracketPosition, closingCurlyBracketPosition+1);

        } else {

            throw new Error("Unable to find Twine2 JSON chunk!");

        }

        let jsonContent = "";

        try {

            jsonContent = JSON.parse(contents);

        } catch (event) {

             throw new Error("Unable to parse Twine2 JSON chunk!");

        }

        this.storyformat = new StoryFormat(jsonContent);

    }

}

module.exports = StoryFormatParser;
