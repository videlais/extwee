const assert = require('assert');
const FileReader = require('../src/FileReader.js');
const TweeParser = require('../src/TweeParser.js');
const TweeWriter = require('../src/TweeWriter.js');
const Story = require('../src/Story.js');
const Passage = require('../src/Passage.js');

describe('TweeWriter', function() {

  describe('#writeFile()', function() {
    it('Should throw error if object passed is not instanceof Story', function() {
    	assert.throws( () => TweeWriter.write({}), Error );
		});
		
    it('Should throw error if output file invalid', function() {
    	assert.throws( () => TweeWriter.write(new Story(), ""), Error );
    });

		it('Should write Twee file', function() {
			let s = new Story();
			let tw = TweeWriter.write(s, "test/TweeWriter/test1.twee");
			let fr = FileReader.read("test/TweeWriter/test1.twee");
			let tp = TweeParser.parse(fr);
			assert.equal(tp.name, "Unknown");
    });

		it('Should correctly write Twee file with passage metadata', function() {

			let s = new Story();
			let p = new Passage("Start", [], {position: "100,100"});
			s.passages = [];
			s.passages.push(p);
			let tw = TweeWriter.write(s, "test/TweeWriter/test2.twee");
			let fr = FileReader.read("test/TweeWriter/test2.twee");
			let tp = TweeParser.parse(fr);
			assert.equal(tp.passages[0].metadata.position,"100,100");
    });

		it('Should correctly write Twee file with passage tags', function() {
			let s = new Story();
			s.name = "TweeWriter";
			let p = new Passage("Start", ["tag", "tags"], {position: "100,100"});
			s.passages.push(p);
			let tw = TweeWriter.write(s, "test/TweeWriter/test3.twee");
			let fr = FileReader.read("test/TweeWriter/test3.twee");
			let tp = TweeParser.parse(fr);
			assert.equal(tp.passages[0].tags.length, 2);
    });

		it('Should throw error if story.metadata is not an object', function() {
			let s = new Story();
			s.metadata = 2;
			assert.throws( () => TweeWriter.write(s, "test/TweeWriter/test4.twee"), Error );
    });
   });
});
