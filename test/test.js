const assert = require('assert');
const FileReader = require('../FileReader.js');
const TweeParser = require('../TweeParser.js');
const TweeWriter = require('../TweeWriter.js');
const StoryFormatParser = require('../StoryFormatParser.js');
const StoryFormat = require('../StoryFormat.js');
const HTMLParser = require('../HTMLParser.js');
const HTMLWriter = require('../HTMLWriter.js');
const Story = require('../Story.js');
const Passage = require('../Passage.js');
const DirectoryReader = require('../DirectoryReader.js');
const DirectoryWatcher = require('../DirectoryWatcher.js');

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

			it('Should record and erase the StoryTitle and StoryData passages', function() {

	    	let fr = new FileReader("test/Story/test.twee");
	    	let tp = new TweeParser(fr.contents);
	    	assert.equal(tp.story.passages.length,5);

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

		 it('Should write Twee file', function() {

			 let s = new Story();
			 s.name = "TweeWriter";
			 let tw = new TweeWriter(s, "test/TweeWriter/test.twee");
			 let fr = new FileReader("test/TweeWriter/test.twee");
			 let tp = new TweeParser(fr.contents);
			 assert.equal(tp.story.name,"TweeWriter");

     });

   });

});

describe('StoryFormatParser', function() {

  describe('#parse()', function() {

    it('Should throw error if JSON missing', function() {

      assert.throws( () => new StoryFormatParser('test/StoryFormatParser/test.js'), Error );

    });

		it('Should throw error if JSON malformed', function() {

			assert.throws( () => new StoryFormatParser('test/StoryFormatParser/test2.js'), Error );

		});

		it('Should correctly parse a StoryFormat name', function() {

			let sfp = new StoryFormatParser('test/StoryFormatParser/format.js');
			assert.equal(sfp.storyformat.name, "Snowman");

		});

		it('Should correctly parse Harlowe story format', function() {

			let sfp = new StoryFormatParser('test/StoryFormatParser/harlowe.js');
			assert.equal(sfp.storyformat.name, "Harlowe");

		});

  });

});

describe('StoryFormat', function() {

  describe('#constructor()', function() {

		it('Should throw error on non-JS-object', function() {

    	assert.throws( () => new StoryFormat('testing'), Error );

    });

    it('Accept object values', function() {

      let sf = new StoryFormat({name: "testing"});
			assert.equal(sf.name, "testing");

    });

		it('Defaults to null values', function() {

      let sf = new StoryFormat({});
			assert.equal(sf.name, null);

    });

  });

});

describe('Passage', function() {

  describe('#constructor()', function() {

		it('Should have default values', function() {

    	let p = new Passage();
			assert.equal(p.name, "");

    });

  });

});

describe('HTMLWriter', function() {

  describe('#constructor()', function() {

		it('Should throw error if file writing fails', function() {

    	assert.throws( () => new HTMLWriter(), Error );

    });

		it('story should be instanceof Story', function() {

			assert.throws( () => new HTMLWriter("test/HTMLWriter/test.html", {}), Error );

    });

		it('Should produce HTML readable by HTMLParser and find story name of "twineExample"', function() {

			let fr = new FileReader("test/TweeParser/example.twee");
			let tp = new TweeParser(fr.contents);
			let sfp = new StoryFormatParser('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test.html", tp.story, sfp.JSON);
			let frh = new FileReader("test/HTMLWriter/test.html");
			let hp = new HTMLParser(frh.contents);

			assert.equal(hp.story.name, "twineExample");

    });

  });

});

describe('Story', function() {

  describe('#constructor()', function() {

		it('Should have default values', function() {

    	let s = new Story();
			assert.equal(s.creatorVersion, "");

    });

  });

	describe('#getStylePassages()', function() {

		it('Should return empty array when no stylesheet-tagged passages are present', function() {

    	let s = new Story();
			assert.equal(s.getStylePassages().length, 0);

    });

		it('Should return correct number of stylesheet-tagged passages', function() {

			let fr = new FileReader("test/Story/test.twee");
			let tp = new TweeParser(fr.contents);
			assert.equal(tp.story.getStylePassages().length, 2);

    });

  });

	describe('#getScriptPassages()', function() {

		it('Should return empty array when no script-tagged passages are present', function() {

    	let s = new Story();
			assert.equal(s.getScriptPassages().length, 0);

    });

		it('Should return correct number of script-tagged passages', function() {

			let fr = new FileReader("test/Story/test.twee");
			let tp = new TweeParser(fr.contents);
			assert.equal(tp.story.getScriptPassages().length, 2);

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

			let fr = new FileReader("test/Story/test.twee");
			let tp = new TweeParser(fr.contents);
			tp.story.deleteAllByTag("script");
			assert.equal(tp.story.getScriptPassages().length, 0);

    });

  });

	describe('#getStartingPassage()', function() {

		it('Should throw error if no passages exist', function() {

			let s = new Story();
    	assert.throws( () => s.getStartingPassage(), Error );

    });

		it('Should return correct PID of Start passage (skipping numbering of StoryTitle and StoryData passages)', function() {

			let fr = new FileReader("test/Story/test.twee");
			let tp = new TweeParser(fr.contents);
			assert.equal(tp.story.getStartingPassage(), 1);

    });

		it('Should return correct PID of Start metadata passage (skipping numbering of StoryTitle and StoryData passages)', function() {

			let fr = new FileReader("test/Story/startmeta.twee");
			let tp = new TweeParser(fr.contents);
			assert.equal(tp.story.getStartingPassage(), 1);

    });

  });

});
