const assert = require('assert');
const Story = require('../Story.js');
const StoryFormat = require('../StoryFormat.js');
const Passage = require('../Passage.js');
const TweeParser = require('../TweeParser.js');
const StoryFormatParser = require('../StoryFormatParser.js');
const HTMLDecompiler = require('../HTMLDecompiler.js')

let s = null;

describe('Story', function() {
  
	before(function() {
    	s = new Story();
	});

	describe('#constructor()', function() {
    
	    it('title should be an empty string', function() {
	    	
	      	assert.equal(s.title, "");
	    });

	    it('metadata should be null', function() {
	    	
	      	assert.equal(s.metadata, null);
	    });

	    it('passages should be null', function() {
	    	
	      	assert.equal(s.passages, null);
	    });

	    it('ifdb should be empty', function() {
	    	
	      	assert.equal(s.ifdb, "");
	    });


  });

});