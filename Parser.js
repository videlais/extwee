const Passage = require('./Passage.js');
const Story = require('./Story.js');
/**
 * @class Parser
 * @module Parser
 */
class Parser {
	/**
     * @method Parser
     * @constructor
     */
    constructor (mode = "twee3") {
        this.passages = [];
        this.story = new Story();
        this.mode = mode;
    }

    /**
     * @method parse
     * @returns Array or Null on error
     */
    parse(fileContents) {

    	// Check if there are extra notes in the files
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

        	// If this is twee3 mode, look for passage metadata
        	if (this.mode == "twee3") {

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

	        			// Silently fail
	        			metadata = {};

	        		}

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
        		let tagsArray = tags.split(",");

        		// There are multiple tags
        		if(tagsArray.length > 0) {

        			// Create future array
        			let futureTagArray = [];

        			// Move through entries
        			for(let tag in tagsArray) {

        				// Add a trimmed verion into future array
        				futureTagArray.push(tagsArray[tag].trim());

        			}

        			// Set the tags back to the future array
        			tags = futureTagArray;

        		} else {

        			// There was only one tag
        			// Store it
        			let temp = tags;

        			// Switch tags over to an array
        			tags = new Array();
        			// Push the single entry
        			tags.push(temp);
        		}

        	} else {
        		// There were no tags, so set it to an empty array;
        		tags = [];
        	}

        	if(this.mode == "twee2") {

        		// Test for position information
	        	let openingLessPosition = header.lastIndexOf('<');
	        	let closingGreaterPosition = header.lastIndexOf('>');

	        	if(openingLessPosition != -1 && closingGreaterPosition != -1) {

	        		position = header.slice(openingLessPosition, closingGreaterPosition+1);

	        		// Remove the position information from the header
	        		header = header.substring(0, openingLessPosition) + header.substring(closingGreaterPosition+1);
	        	}

	        	this.position = position;

        	}

        	// Trim any remaining whitespace
        	header = header.trim();

        	// Check if there is a name left
        	if(header.length > 0) {

        		name = header;

        	} else {

        		// No name left. Something went wrong. Blame user.
        		throw new Error("Malformed passage header!");

        	}

        	// Add the new Passage to the internal array
        	this.passages.push(new Passage(name, tags, metadata, text));

        }

        // All formats share StoryTitle
        // Find it and set it
        let pos = this.passages.find((el) => {
        	return el.name == "StoryTitle";
        });

        if(pos != undefined) {

        	this.story.title = pos.text;

        }

        // Check if running in Twee3 mode (default)
        if(this.mode == "twee3") {

        	// Look for StoryMetadata
        	pos = this.passages.find((el) => {
        		return el.name == "StoryMetadata";
        	});

        	if(pos != undefined ) {


        		// Try to parse the StoryMetadata
        		try {

        			this.story.metadata = JSON.parse(pos.text);

        		} catch(event) {

        			// Silently fail
        			this.story.metadata = {};

        		}

        	}
        	
        }

        // Set the passages to the internal story
        this.story.passages = this.passages;

        // Return the story object
        return this.story;

    }

}

module.exports = Parser;
