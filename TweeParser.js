const Passage = require('./Passage.js');
const Story = require('./Story.js');
/**
 * @class TweeParser
 * @module TweeParser
 */
class TweeParser {
	/**
     * @method TweeParser
     * @constructor
     */
    constructor (content) {
        this.story = new Story();
        this._passageMetadatError = false;
        this._storydataError = false;

        this.parse(content);
    }

    /**
     * @method parse
     * @returns Array or Null on error
     */
    parse(fileContents) {

      let passages = [];

    	// Check if there are extra content in the files
    	// If so, cut it all out for the parser
    	if(fileContents[0] != ':' && fileContents[1] != ':') {

    		let firstPassagePos = fileContents.indexOf('::');
    		fileContents = fileContents.slice(firstPassagePos, fileContents.length);

    	}

    	// Split the file based on the passage sigil (::) preceeded by a newline
    	let parsingPassages = fileContents.split('\n::');

    	// Check if any passages exist
      if(parsingPassages == 0) {

        	throw new Error("No passages were found!");

      }

      // Fix the first result
      parsingPassages[0] = parsingPassages[0].slice(2, parsingPassages[0].length);

      // Set the initial pid
      let pid = 0;

      // Iterate through the passages
      for(let passage of parsingPassages) {

        	// Set default values
	        let tags = "";
	        let position = "";
	        let metadata = "";
	        let text = "";
	        let name = "";

        	// Header is everything to the first newline
        	let header = passage.slice(0, passage.indexOf('\n'));
        	// Text is everything else
        	// (Also eat the leading newline character.)
        	// (And trim any remaining whitespace.)
        	text = passage.substring(header.length+1, passage.length).trim();

	        // Test for metadata
	        let openingCurlyBracketPosition = header.lastIndexOf('{');
	        let closingCurlyBracketPosition = header.lastIndexOf('}');

	        if(openingCurlyBracketPosition != -1 && closingCurlyBracketPosition != -1) {

	        	// Save the text metadata
	        	metadata = header.slice(openingCurlyBracketPosition, closingCurlyBracketPosition+1);

	        	// Remove the metadata from the header
	        	header = header.substring(0, openingCurlyBracketPosition) + header.substring(closingCurlyBracketPosition+1);
	        }

	        // There was passage metadata
	        if(metadata.length > 0) {

	        	// Try to parse the metadata
	        	try {

	        		metadata = JSON.parse(metadata);

	        	} catch(event) {

              this._passageMetadatError = true;

	        	}

	        }

        	// Test for tags
        	let openingSquareBracketPosition = header.lastIndexOf('[');
        	let closingSquareBracketPosition = header.lastIndexOf(']');

        	if(openingSquareBracketPosition != -1 && closingSquareBracketPosition != -1) {

        		tags = header.slice(openingSquareBracketPosition, closingSquareBracketPosition+1);

        		// Remove the tags from the header
        		header = header.substring(0, openingSquareBracketPosition) + header.substring(closingSquareBracketPosition+1);
        	}

        	// Parse tags
        	if(tags.length > 0) {

        		// Eat the opening and closing square brackets
        		tags = tags.substring(1, tags.length-1);

            // Set empty default
            let tagsArray = [];

            // Test if tags is not single, empty string
            if( !(tags == "") ) {

                tagsArray = tags.split(" ");
            }

        		// There are multiple tags
        		if(tagsArray.length > 1) {

        			// Create future array
        			let futureTagArray = [];

        			// Move through entries
        			for(let tag in tagsArray) {

        				// Add a trimmed verion into future array
        				futureTagArray.push(tagsArray[tag].trim());

        			}

        			// Set the tags back to the future array
        			tags = futureTagArray;

        		} else if (tagsArray.length == 1) {

        			// There was only one tag
        			// Store it
        			let temp = tags;

        			// Switch tags over to an array
        			tags = new Array();
        			// Push the single entry
        			tags.push(temp);

            } else {

              // Make sure tags is set to empty array if no tags were found
              tags = [];

            }

        	} else {
        		// There were no tags, so set it to an empty array;
        		tags = [];
        	}

          // Filter out any empty string tags
          tags = tags.filter(tag => tag != "");

        	// Trim any remaining whitespace
        	header = header.trim();

        	// Check if there is a name left
        	if(header.length > 0) {

        		name = header;

        	} else {

        		// No name left. Something went wrong. Blame user.
        		throw new Error("Malformed passage header!");

        	}

          if(this._passageMetadatError) {

            console.warn('Error parsing metadata for "' + name + '". It was ignored.');

          }

        	// Add the new Passage to the internal array
        	passages.push(new Passage(name, tags, metadata, text, pid));

          // Increase pid
          pid++;

        }

        // All formats share StoryTitle
        // Find it and set it
        let pos = passages.find((el) => {
        	return el.name == "StoryTitle";
        });

        if(pos != undefined) {

        	this.story.name = pos.text;
            // Remove the StoryTitle passage
            passages = passages.filter(p => p.name !== "StoryTitle");

        } else {

            // There was no StoryTitle passage
            // Set a value of "Unknown"
            this.story.name = "Unknown";

        }

        // Look for StoryData
        pos = passages.find((el) => {
        		return el.name == "StoryData";
        });

        if(pos != undefined ) {

        	// Try to parse the StoryData
        	try {

        		this.story.metadata = JSON.parse(pos.text);

        	} catch(event) {

        		// Silently fail with default values
            this._storydataError = true;

        	}

            // Remove the StoryData passage
            passages = passages.filter(p => p.name !== "StoryData");

        }

        if(this._storydataError) {

            console.warn("Error with processing StoryData JSON data. It was ignored.");

        }

        // Set the passages to the internal story
        this.story.passages = passages;

    }

}

module.exports = TweeParser;
