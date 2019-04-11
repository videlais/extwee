const assert = require('assert');
const FileReader = require('../FileReader.js');
const TweeParser = require('../TweeParser.js');
const TweeWriter = require('../TweeWriter.js');
const StoryFormatParser = require('../StoryFormatParser.js');
const HTMLParser = require('../HTMLParser.js');
const HTMLWriter = require('../HTMLWriter.js');

describe('FileReader', function() {
  
	describe('ReadFile', function() {
    
	    it('Should read the contents of the file', function() {
	    
	    	let fr = new FileReader("test/FileReader/t1.txt");
	    	assert.equal(fr.contents,"Gibberish");
	    
	    });


	    it('Should throw error if file not found', function() {
	    
	    	assert.throws( () => new FileReader("test/FileReader/t2.txt"), new Error("Error: File not found!") );
	    
	    });
  
  	});

});

describe('TweeParser', function() {
  
	describe('Parse', function() {


	    it('Should throw error if no passages are present', function() {
	    	
	    	assert.throws( () => new TweeParser(""), new Error("No passages were found!") );
	    
	    });

	    it('Should throw error if it detects malformed passage headers', function() {
	    	
	    	assert.throws( () => new TweeParser("::{}[]\nNo name"), new Error("Malformed passage header!") );
	    
	    });

	    it('Should be able to parse Twee file for Story Name', function() {

	    	let fr = new FileReader("test/TweeParser/example.twee");
	    	let tp = new TweeParser(fr.contents);
	    	assert.equal(tp.story.name,"twineExample");
	    
	    });
  
  	});

});

describe('HTMLParser', function() {
  
	describe('Parse', function() {
    
	    it('Should throw error if content is not Twine-2 style HTML', function() {

	    	assert.throws( () => new HTMLParser(""), new Error("Error: Not a Twine 2-style file!") );
	    	
	    });

	    it('Should be able to parse Twine 2 HTML for story name', function() {

	    	let fr = new FileReader("test/HTMLParser/twineExample.html");
	    	let tp = new HTMLParser(fr.contents);

	    	assert.equal(tp.story.name, "twineExample");

	    });
  
  	});

});

describe('HTMLParser', function() {
  
	describe('Parse', function() {
    
	    it('Should throw error if content is not Twine-2 style HTML', function() {

	    	assert.throws( () => new HTMLParser(""), new Error("Error: Not a Twine 2-style file!") );
	    	
	    });

	    it('Should be able to parse Twine 2 HTML for story name', function() {

	    	let fr = new FileReader("test/HTMLParser/twineExample.html");
	    	let tp = new HTMLParser(fr.contents);

	    	assert.equal(tp.story.name, "twineExample");

	    });
  
  	});

});

