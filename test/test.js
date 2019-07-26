const assert = require('assert');
const FileReader = require('../FileReader.js');
const TweeParser = require('../TweeParser.js');
const TweeWriter = require('../TweeWriter.js');
const StoryFormatParser = require('../StoryFormatParser.js');
const HTMLParser = require('../HTMLParser.js');
const HTMLWriter = require('../HTMLWriter.js');
const Story = require('../Story.js');
const Passage = require('../Passage.js');

describe('FileReader', function() {

	describe('#readFile()', function() {

	    it('Should throw error if file not found', function() {

	    	assert.throws( () => new FileReader("test/FileReader/t2.txt"), Error );

	    });

      it('Should read the contents of a file', function() {

	    	let fr = new FileReader("test/FileReader/t1.txt");
	    	assert.equal(fr.contents,"Gibberish");

	    });

  	});

});

describe('TweeParser', function() {

	describe('#parse()', function() {

	    it('Should throw error if no passages are present', function() {

	    	assert.throws( () => new TweeParser(""), Error );

	    });

	    it('Should throw error if it detects malformed passage headers', function() {

	    	assert.throws( () => new TweeParser("::{}[]\nNo name"), Error );

	    });

	    it('Should be able to parse Twee file for Story Name', function() {

	    	let fr = new FileReader("test/TweeParser/example.twee");
	    	let tp = new TweeParser(fr.contents);
	    	assert.equal(tp.story.name,"twineExample");

	    });

  	});

});

describe('HTMLParser', function() {

	describe('#parse()', function() {

	    it('Should throw error if content is not Twine-2 style HTML', function() {

	    	assert.throws( () => new HTMLParser(""), Error );

	    });

	    it('Should be able to parse Twine 2 HTML for story name', function() {

	    	let fr = new FileReader("test/HTMLParser/twineExample.html");
	    	let tp = new HTMLParser(fr.contents);

	    	assert.equal(tp.story.name, "twineExample");

	    });

  	});

});

describe('TweeWriter', function() {

  describe('#writeFile()', function() {

     it('Should throw error if object passed is not instanceof Story', function() {

       assert.throws( () => new TweeWriter({}), Error );

     });

     it('Should throw error if output file invalid', function() {

       assert.throws( () => new TweeWriter(new Story(), ""), Error );

     });

   });

});

describe('StoryFormatParser', function() {

  describe('#parse()', function() {

    it('Should throw error if JSON malformed', function() {

      assert.throws( () => new StoryFormatParser('test/StoryFormatParser/test.js'), Error );

    });

  });

});
