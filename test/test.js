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
const shelljs = require('shelljs');
const fs = require("fs");

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

	    	let fr = new FileReader("test/TweeParser/test.twee");
	    	let tp = new TweeParser(fr.contents);
	    	assert.equal(tp.story.passages.length,5);

	    });

			it('Should parse empty passage tags', function() {

	    	let fr = new FileReader("test/TweeParser/emptytags.twee");
	    	let tp = new TweeParser(fr.contents);
	    	assert.equal(tp.story.passages[0].tags.length, 0);

	    });

			it('Should parse single passage tag', function() {

	    	let fr = new FileReader("test/TweeParser/singletag.twee");
	    	let tp = new TweeParser(fr.contents);
	    	assert.equal(tp.story.passages[0].tags.length, 1);

	    });

			it('Should parse multiple passage tags', function() {

	    	let fr = new FileReader("test/TweeParser/multipletags.twee");
	    	let tp = new TweeParser(fr.contents);
	    	assert.equal(tp.story.passages[0].tags.length, 2);

	    });

			it('Should record passage metadata error', function() {

	    	let fr = new FileReader("test/TweeParser/pasagemetadataerror.twee");
	    	let tp = new TweeParser(fr.contents);
	    	assert.equal(tp._passageMetadatError, true);

	    });

			it('Should record StoryData error', function() {

	    	let fr = new FileReader("test/TweeParser/storydataerror.twee");
	    	let tp = new TweeParser(fr.contents);
	    	assert.equal(tp._storydataError, true);

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

	describe('#_escapeMetacharacters()', function() {

		it('Should escape metacharacters', function() {

			let fr = new FileReader("test/HTMLParser/twineExample.html");
			let tp = new HTMLParser(fr.contents);
			assert.equal(tp._escapeMetacharacters('\\\{\\\}\\\[\\\]\\\\'), "\\\\{\\\\}\\\\[\\\\]\\\\");

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
			 let tw = new TweeWriter(s, "test/TweeWriter/test1.twee");
			 let fr = new FileReader("test/TweeWriter/test1.twee");
			 let tp = new TweeParser(fr.contents);
			 assert.equal(tp.story.name, "Unknown");

     });

		 it('Should correctly write Twee file with passage metadata', function() {

			 let s = new Story();
			 let p = new Passage("Start", [], {position: "100,100"});
			 s.passages = [];
			 s.passages.push(p);
			 let tw = new TweeWriter(s, "test/TweeWriter/test2.twee");
			 let fr = new FileReader("test/TweeWriter/test2.twee");
			 let tp = new TweeParser(fr.contents);
			 assert.equal(tp.story.passages[0].metadata.position,"100,100");

     });

		 it('Should correctly write Twee file with passage tags', function() {

			 let s = new Story();
			 s.name = "TweeWriter";
			 let p = new Passage("Start", ["tag", "tags"], {position: "100,100"});
			 s.passages.push(p);
			 let tw = new TweeWriter(s, "test/TweeWriter/test3.twee");
			 let fr = new FileReader("test/TweeWriter/test3.twee");
			 let tp = new TweeParser(fr.contents);
			 assert.equal(tp.story.passages[0].tags.length, 2);

     });

		 it('Should throw error if story.metadata is not an object', function() {

			 let s = new Story();
			 s.metadata = 2;
			 assert.throws( () => new TweeWriter(s, "test/TweeWriter/test4.twee"), Error );

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

			let fr = new FileReader("test/HTMLWriter/example.twee");
			let tp = new TweeParser(fr.contents);
			let sfp = new StoryFormatParser('test/StoryFormatParser/format.js');
			assert.throws( () => new HTMLWriter("", tp.story, sfp.storyformat), Error );

    });

		it('story should be instanceof Story', function() {

			assert.throws( () => new HTMLWriter("test/HTMLWriter/test.html", {}), Error );

    });

		it('storyFormat should be instanceof StoryFormat', function() {

			let s = new Story();
			assert.throws( () => new HTMLWriter("test/HTMLWriter/test.html", s, {}), Error );

    });

		it('Should produce HTML readable by HTMLParser and find story name of "twineExample"', function() {

			let fr = new FileReader("test/HTMLWriter/example.twee");
			let tp = new TweeParser(fr.contents);
			let sfp = new StoryFormatParser('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test2.html", tp.story, sfp.storyformat);
			let frh = new FileReader("test/HTMLWriter/test2.html");
			let hp = new HTMLParser(frh.contents);

			assert.equal(hp.story.name, "twineExample");

    });

		it('Should correctly write default values for "position" and "size"', function() {

			let fr = new FileReader("test/HTMLWriter/example.twee");
			let tp = new TweeParser(fr.contents);
			let sfp = new StoryFormatParser('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test3.html", tp.story, sfp.storyformat);
			let frh = new FileReader("test/HTMLWriter/test3.html");
			let hp = new HTMLParser(frh.contents);
			assert.equal(hp.story.passages[1].metadata.position, "100,100");

    });

		it('Should correctly write defined values for "position"', function() {

			let fr = new FileReader("test/HTMLWriter/example2.twee");
			let tp = new TweeParser(fr.contents);
			let sfp = new StoryFormatParser('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test4.html", tp.story, sfp.storyformat);
			let frh = new FileReader("test/HTMLWriter/test4.html");
			let hp = new HTMLParser(frh.contents);
			assert.equal(hp.story.passages[1].metadata.position, "200,200");

    });

		it('Should correctly write single "tag"', function() {

			let fr = new FileReader("test/HTMLWriter/example3.twee");
			let tp = new TweeParser(fr.contents);
			let sfp = new StoryFormatParser('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test5.html", tp.story, sfp.storyformat);
			let frh = new FileReader("test/HTMLWriter/test5.html");
			let hp = new HTMLParser(frh.contents);
			assert.equal(hp.story.passages[1].tags.includes("tag"), true);

    });

		it('Should correctly write defined values for "size"', function() {

			let fr = new FileReader("test/HTMLWriter/example4.twee");
			let tp = new TweeParser(fr.contents);
			let sfp = new StoryFormatParser('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test6.html", tp.story, sfp.storyformat);
			let frh = new FileReader("test/HTMLWriter/test6.html");
			let hp = new HTMLParser(frh.contents);
			assert.equal(hp.story.passages[1].metadata.size, "100,100");

    });

		it('Should correctly write multiple tags', function() {

			let fr = new FileReader("test/HTMLWriter/example5.twee");
			let tp = new TweeParser(fr.contents);
			let sfp = new StoryFormatParser('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test6.html", tp.story, sfp.storyformat);
			let frh = new FileReader("test/HTMLWriter/test6.html");
			let hp = new HTMLParser(frh.contents);
			assert.equal(hp.story.passages[1].tags.length, 2);

    });

		it('Should correctly write stylesheet-tagged passages', function() {

			let fr = new FileReader("test/HTMLWriter/example6.twee");
			let tp = new TweeParser(fr.contents);
			let sfp = new StoryFormatParser('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test7.html", tp.story, sfp.storyformat);
			let frh = new FileReader("test/HTMLWriter/test7.html");
			let hp = new HTMLParser(frh.contents);
			assert.equal(hp.story.getStylePassages().length, 1);

    });

		it('Should correctly write script-tagged passages', function() {

			let fr = new FileReader("test/HTMLWriter/example7.twee");
			let tp = new TweeParser(fr.contents);
			let sfp = new StoryFormatParser('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test8.html", tp.story, sfp.storyformat);
			let frh = new FileReader("test/HTMLWriter/test8.html");
			let hp = new HTMLParser(frh.contents);
			assert.equal(hp.story.getScriptPassages().length, 1);

    });

		it('Should correctly write extra CSS code', function() {

			let fr = new FileReader("test/HTMLWriter/example7.twee");
			let tp = new TweeParser(fr.contents);
			let sfp = new StoryFormatParser('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test9.html", tp.story, sfp.storyformat, "body{background:grey}");
			let frh = new FileReader("test/HTMLWriter/test9.html");
			let hp = new HTMLParser(frh.contents);
			assert.equal(hp.story.getStylePassages()[0].text.includes("body{background:grey}"), true);

    });

		it('Should correctly write extra JS code', function() {

			let fr = new FileReader("test/HTMLWriter/example6.twee");
			let tp = new TweeParser(fr.contents);
			let sfp = new StoryFormatParser('test/StoryFormatParser/format.js');
			let hw = new HTMLWriter("test/HTMLWriter/test10.html", tp.story, sfp.storyformat, "", "console.log('Test!')");
			let frh = new FileReader("test/HTMLWriter/test10.html");
			let hp = new HTMLParser(frh.contents);
			assert.equal(hp.story.getScriptPassages()[0].text.includes("console.log('Test!')"), true);

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

describe('DirectoryReader', function() {

	describe('#constructor()', function() {

		it("Should throw error if not a real path", function() {

			assert.throws( () => new DirectoryReader("#"), Error );

		});

		it("Should throw error if directory does not exist", function() {

			assert.throws( () => new DirectoryReader("test/DirectoryReader/error/"), Error );

		});

		it("Should read all CSS files recursively", function(done) {

			const resolvingPromise = new Promise((resolve) => {
				let dr = new DirectoryReader("test/DirectoryReader/");
				resolve(dr);
			});

			resolvingPromise.then( (result) => {
				assert.equal(result.CSScontents.length > 0, true);
				done();
			});

		});

		it("Should read all JS files recursively", function(done) {

			const resolvingPromise = new Promise((resolve) => {
				let dr = new DirectoryReader("test/DirectoryReader1/");
				resolve(dr);
			});

			resolvingPromise.then( (result) => {
				assert.equal(result.JScontents.length > 0, true);
				done();
			});

		});

		it("Should trigger error if Babel fails JS processing", function(done) {

			const resolvingPromise = new Promise((resolve) => {
				let dr = new DirectoryReader("test/DirectoryReader2/");
				resolve(dr);
			});

			resolvingPromise.then( (result) => {
				assert.equal(result.JScontents.length == "", true);
				done();
			});

		});

		it("Should read all Twee files recursively", function(done) {

			const resolvingPromise = new Promise((resolve) => {
				let dr = new DirectoryReader("test/DirectoryReader3/");
				resolve(dr);
			});

			resolvingPromise.then( (result) => {
				assert.equal(result.tweeContents.length > 0, true);
				done();
			});

		});

	});

});

describe('DirectoryWatcher', function() {

	describe('#constructor()', function() {

		it("Should throw error if not a real path", function() {

			assert.throws( () => new DirectoryWatcher("#", function(){}), Error );

		});

		it("Should throw error if callback not a function", function() {

			assert.throws( () => new DirectoryWatcher("test/DirectoryWatcher/", 2), Error );

		});

	});

});
