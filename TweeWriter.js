const fs = require("fs");
const path = require('path');

/**
 * @class TweeWriter
 * @module TweeWriter
 */
class TweeWriter {
    /**
     * @method TweeWriter
     * @constructor
     */
    constructor (story, outputFile) {
        this.story = story;
        this.outputFile = outputFile;
        this.outputContents = "";

        this.writeFile(this.outputFile);
    }

    writeFile(file) {

        // Build the contents
        for(let passage of this.story.passages) {

            // Write the name
            this.outputContents += ":: " + passage.name;

            // Test if it has any tags
            if(passage.tags != "") {

                // Write the tag string
                this.outputContents += " [" + passage.tags + "]";

            }

            // Test if its metadata is not just an empty object
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

module.exports = TweeWriter;
