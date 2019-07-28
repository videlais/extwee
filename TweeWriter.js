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

      // Write StoryTitle first
      this.outputContents += ":: StoryTitle\n" + this.story.name + "\n\n";

      // Write the StoryData second
      this.outputContents += ":: StoryData\n"

      // Borrowed from Underscore
      // https://github.com/jashkenas/underscore/blob/master/underscore.js#L1319-L1323
      let isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
      };

      // Test if story.metadata is an object or not
      if(isObject(this.story.metadata) ) {

        // Write any metadata in pretty format
        this.outputContents += " " + JSON.stringify(this.story.metadata, undefined, 2);

      } else {

        // If, for whatever reason, story.metadata is not an object, throw error.
        throw new Error("Story Metadata MUST be an object!");

      }

      // Add two newlines
      this.outputContents += "\n\n";

      // Are there any passages?
      if(this.story.passages.length > 0) {

        // Build the contents
        for(let passage in this.story.passages) {

          // Write the name
          this.outputContents += ":: " + this.story.passages[passage].name;

          // Test if it has any tags
          if(this.story.passages[passage].tags.length > 0) {

            this.outputContents += " [";

            for(let tag of this.story.passages[passage].tags) {

              this.outputContents += " " + tag;

            }

            this.outputContents += "]";

          }

          // Write out any passage metadata
          this.outputContents += JSON.stringify(this.story.passages[passage].metadata);

          // Add the text and two newlines
          this.outputContents += "\n" + this.story.passages[passage].text + "\n\n";

        }

      } else {

        // Create empty Start passage
        this.outputContents += ":: Start\n";

      }

      try {

        // Try to write
        fs.writeFileSync(file, this.outputContents);

      } catch(event) {

        // Throw error
        throw new Error("Error: Cannot write Twee file!");

      }

      // Writing was successful
      console.info("Created " + fs.realpathSync(file) );

    }
}

module.exports = TweeWriter;
