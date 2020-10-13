const assert = require('assert');
const FileReader = require('../src/FileReader.js');
const HTMLParser = require('../src/HTMLParser.js');

describe('HTMLParser', function() {
	describe('#parse()', function() {
	    it('Should throw error if content is not Twine-2 style HTML', function() {
	    	assert.throws( () => HTMLParser.parse(""), Error );
	    });

	    it('Should be able to parse Twine 2 HTML for story name', function() {
	    	let fr = FileReader.read("test/HTMLParser/twineExample.html");
	    	let tp = HTMLParser.parse(fr);
	    	assert.equal(tp.name, "twineExample");
	    });
  	});

	describe('#escapeMetacharacters()', function() {
		it('Should escape metacharacters', function() {
			assert.equal(HTMLParser.escapeMetacharacters('\\\{\\\}\\\[\\\]\\\\'), "\\\\{\\\\}\\\\[\\\\]\\\\");
		});
	 });
});
