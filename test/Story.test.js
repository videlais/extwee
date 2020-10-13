const assert = require('assert');
const FileReader = require('../src/FileReader.js');
const TweeParser = require('../src/TweeParser.js');
const Story = require('../src/Story.js');

describe('Story', function() {

  describe('#constructor()', function() {
		it('Should have default values', function() {
    	let s = new Story();
			assert.equal(s.name, "Unknown");
    });
  });

	describe('#getStylePassages()', function() {
		it('Should return empty array when no stylesheet-tagged passages are present', function() {
    	let s = new Story();
			assert.equal(s.getStylePassages().length, 0);
    });

		it('Should return correct number of stylesheet-tagged passages', function() {
			let fr = FileReader.read("test/Story/test.twee");
			let tp = TweeParser.parse(fr);
			assert.equal(tp.getStylePassages().length, 2);
    });
  });

	describe('#getScriptPassages()', function() {
		it('Should return empty array when no script-tagged passages are present', function() {
    	let s = new Story();
			assert.equal(s.getScriptPassages().length, 0);
    });

		it('Should return correct number of script-tagged passages', function() {
			let fr = FileReader.read("test/Story/test.twee");
			let tp = TweeParser.parse(fr);
			assert.equal(tp.getScriptPassages().length, 2);
    });
  });

	describe('#deleteAllByTag()', function() {
		it('Should do nothing if internal passages array is empty', function() {
    	let s = new Story();
			s.passages = [];
			s.deleteAllByTag();
			assert.equal(s.passages.length, 0);
    });

		it('Should remove passages based on tag', function() {
			let fr = FileReader.read("test/Story/test.twee");
			let tp = TweeParser.parse(fr);
			tp.deleteAllByTag("script");
			assert.equal(tp.getScriptPassages().length, 0);
    	});
  });

	describe('#getStartingPassage()', function() {
		it('Should throw error if no passages exist', function() {
			let s = new Story();
    	assert.throws( () => s.getStartingPassage(), Error );
    });

		it('Should return correct PID of Start passage (skipping numbering of StoryTitle and StoryData passages)', function() {
			let fr = FileReader.read("test/Story/test.twee");
			let tp = TweeParser.parse(fr);
			assert.equal(tp.getStartingPassage(), 1);
    });

		it('Should return correct PID of Start metadata passage (skipping numbering of StoryTitle and StoryData passages)', function() {
			let fr = FileReader.read("test/Story/startmeta.twee");
			let tp = TweeParser.parse(fr);
			assert.equal(tp.getStartingPassage(), 1);
    });
  });
});
