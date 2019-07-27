const fs = require("fs");
const path = require('path');
const Story = require('./Story.js');

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

        if( !(this.story instanceof Story) ) {
          throw new Error("Not a Story object!");
        }

        this.writeFile(this.outputFile);
    }

    writeFile(file) {

        if(this.story.passages != null) {

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

        } else if(this.story.name != "") {
          // Write StoryTitle
          this.outputContents += ":: StoryTitle\n" + this.story.name;

          // Add two newlines
          this.outputContents += "\n\n";

          // Test if its metadata is not just an empty object
          if(Object.keys(this.story.metadata).length > 0) {
              // Create StoryData passage
              this.outputContents += ":: StoryData\n"
              // Write any metadata in pretty format
              this.outputContents += " " + JSON.stringify(this.story.metadata, undefined, 2);
              // Write two newlines
              this.outputContents += "\n\n";

          }

          // Create empty Start passage
          this.outputContents += ":: Start\n";

        }

        // Write the entire contents out
        fs.writeFileSync(file, this.outputContents, (err) => {
          if (err) {
            throw new Error("Error: Cannot write Twee file!");
          } else {
            console.info("Created " + fs.realpathSync(file) );
          }
        });

    }
}

module.exports = TweeWriter;
