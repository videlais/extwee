const assert = require('assert');
const FileReader = require('../src/FileReader.js');
const TweeParser = require('../src/TweeParser.js');

describe('TweeParser', function() {
	describe('#parse()', function() {
		it('Should throw error if non-string is used', function() {
	    assert.throws( function() {TweeParser.parse(1); }, Error );
		});

		it('Should throw error if empty string is used', function() {
			assert.throws( function() {TweeParser.parse(); }, Error );
		});

	  it('Should throw error if no passages are present', function() {
	    assert.throws( function() {TweeParser.parse("()()"); }, Error );
		});

		it('Should cut notes before passages', function() {
			let fr = FileReader.read("test/TweeParser/notes.twee");
			let tp = TweeParser.parse(fr);
	    assert.equal(tp.name,"twineExample");
		});
		
	  it('Should throw error if it detects malformed passage headers', function() {
	    assert.throws( () => TweeParser.parse("::{}[]\nNo name"), Error );
		});
		
	  it('Should be able to parse Twee file for Story Name', function() {
	    let fr = FileReader.read("test/TweeParser/example.twee");
	    let tp = TweeParser.parse(fr);
	    assert.equal(tp.name,"twineExample");
		});
		
		it('Should record and erase the StoryTitle and StoryData passages', function() {
	    let fr = FileReader.read("test/TweeParser/test.twee");
	    let tp = TweeParser.parse(fr);
	    assert.equal(tp.passages.length,5);
		});
		
		it('Should parse empty passage tags', function() {
	    let fr = FileReader.read("test/TweeParser/emptytags.twee");
	    let tp = TweeParser.parse(fr);
	    assert.equal(tp.passages[0].tags.length, 0);
		});
		
		it('Should parse single passage tag', function() {
	    let fr = FileReader.read("test/TweeParser/singletag.twee");
	    let tp = TweeParser.parse(fr);
	    assert.equal(tp.passages[0].tags.length, 1);
		});
		
		it('Should parse multiple passage tags', function() {
	    let fr = FileReader.read("test/TweeParser/multipletags.twee");
	    let tp = TweeParser.parse(fr);
	    assert.equal(tp.passages[0].tags.length, 2);
	  });
  });
});
