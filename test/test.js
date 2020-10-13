const assert = require('assert');
const FileReader = require('../src/FileReader.js');
const TweeParser = require('../src/TweeParser.js');
const TweeWriter = require('../src/TweeWriter.js');
const StoryFormatParser = require('../src/StoryFormatParser.js');
const StoryFormat = require('../src/StoryFormat.js');
const HTMLParser = require('../src/HTMLParser.js');
const HTMLWriter = require('../src/HTMLWriter.js');
const Story = require('../src/Story.js');
const Passage = require('../src/Passage.js');

describe('FileReader', function() {
	describe('#readFile()', function() {
	    it('Should throw error if file not found', function() {
	    	assert.throws( () => FileReader.read("test/FileReader/t2.txt"), Error );
	    });

      it('Should read the contents of a file', function() {
	    	let fr = FileReader.read("test/FileReader/t1.txt");
	    	assert.equal(fr,"Gibberish");
	    });
  	});
});

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

describe('StoryFormatParser', function() {
  describe('#parse()', function() {
    it('Should throw error if JSON missing', function() {
      assert.throws( () => StoryFormatParser.parse('test/StoryFormatParser/test.js'), Error );
    });

		it('Should throw error if JSON malformed', function() {
			assert.throws( () => StoryFormatParser.parse('test/StoryFormatParser/test2.js'), Error );
		});

		it('Should correctly parse a StoryFormat name', function() {
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			assert.equal(sfp.name, "Snowman");
		});

		it('Should correctly parse Harlowe story format', function() {
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/harlowe.js');
			assert.equal(sfp.name, "Harlowe");
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
			let fr = FileReader.read("test/HTMLWriter/example.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			assert.throws( () => new HTMLWriter("", tp, sfp), Error );
    });

		it('story should be instanceof Story', function() {
			assert.throws( () => new HTMLWriter("test/HTMLWriter/test.html", {}), Error );
    });

		it('storyFormat should be instanceof StoryFormat', function() {
			let s = new Story();
			assert.throws( () => new HTMLWriter("test/HTMLWriter/test.html", s, {}), Error );
    });

		it('Should produce HTML readable by HTMLParser and find story name of "twineExample"', function() {
			let fr = FileReader.read("test/HTMLWriter/example.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test2.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test2.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.name, "twineExample");
    });

		it('Should correctly write default values for "position" and "size"', function() {
			let fr = FileReader.read("test/HTMLWriter/example.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test3.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test3.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.passages[1].metadata.position, "100,100");
    });

		it('Should correctly write defined values for "position"', function() {
			let fr = FileReader.read("test/HTMLWriter/example2.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test4.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test4.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.passages[1].metadata.position, "200,200");
    });

		it('Should correctly write single "tag"', function() {
			let fr = FileReader.read("test/HTMLWriter/example3.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test5.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test5.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.passages[1].tags.includes("tag"), true);
    });

		it('Should correctly write defined values for "size"', function() {
			let fr = FileReader.read("test/HTMLWriter/example4.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test6.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test6.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.passages[1].metadata.size, "100,100");
    });

		it('Should correctly write multiple tags', function() {
			let fr = FileReader.read("test/HTMLWriter/example5.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test6.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test6.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.passages[1].tags.length, 2);
    });

		it('Should correctly write stylesheet-tagged passages', function() {
			let fr = FileReader.read("test/HTMLWriter/example6.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test7.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test7.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.getStylePassages().length, 1);
    });

		it('Should correctly write script-tagged passages', function() {
			let fr = FileReader.read("test/HTMLWriter/example7.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test8.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test8.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.getScriptPassages().length, 1);
    });

		it('Should correctly write extra CSS code', function() {
			let fr = FileReader.read("test/HTMLWriter/example7.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test9.html", tp, sfp, "body{background:grey}");
			let frh = FileReader.read("test/HTMLWriter/test9.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.getStylePassages()[0].text.includes("body{background:grey}"), true);
    });

		it('Should correctly write extra JS code', function() {
			let fr = FileReader.read("test/HTMLWriter/example6.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test10.html", tp, sfp, "", "console.log('Test!')");
			let frh = FileReader.read("test/HTMLWriter/test10.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.getScriptPassages()[0].text.includes("console.log('Test!')"), true);
    });
  });
});

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
