const assert = require('assert');
const FileReader = require('../src/FileReader.js');
const TweeParser = require('../src/TweeParser.js');
const StoryFormatParser = require('../src/StoryFormatParser.js');
const HTMLParser = require('../src/HTMLParser.js');
const HTMLWriter = require('../src/HTMLWriter.js');
const Story = require('../src/Story.js');

describe('HTMLWriter', function() {
  describe('#constructor()', function() {
		it('Should throw error if file writing fails', function() {
			let fr = FileReader.read("test/HTMLWriter/example.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			assert.throws( () => HTMLWriter.write("", tp, sfp), Error );
    });

		it('story should be instanceof Story', function() {
			assert.throws( () => HTMLWriter.write("test/HTMLWriter/test.html", {}), Error );
    });

		it('storyFormat should be instanceof StoryFormat', function() {
			let s = new Story();
			assert.throws( () => HTMLWriter.write("test/HTMLWriter/test.html", s, {}), Error );
    });

		it('Should produce HTML readable by HTMLParser and find story name of "twineExample"', function() {
			let fr = FileReader.read("test/HTMLWriter/example.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			let hw = HTMLWriter.write("test/HTMLWriter/test2.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test2.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.name, "twineExample");
    });

		it('Should correctly write default values for "position" and "size"', function() {
			let fr = FileReader.read("test/HTMLWriter/example.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			let hw = HTMLWriter.write("test/HTMLWriter/test3.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test3.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.passages[1].metadata.position, "100,100");
    });

		it('Should correctly write defined values for "position"', function() {
			let fr = FileReader.read("test/HTMLWriter/example2.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			HTMLWriter.write("test/HTMLWriter/test4.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test4.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.passages[1].metadata.position, "200,200");
    });

		it('Should correctly write single "tag"', function() {
			let fr = FileReader.read("test/HTMLWriter/example3.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			HTMLWriter.write("test/HTMLWriter/test5.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test5.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.passages[1].tags.includes("tag"), true);
    });

		it('Should correctly write defined values for "size"', function() {
			let fr = FileReader.read("test/HTMLWriter/example4.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			HTMLWriter.write("test/HTMLWriter/test6.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test6.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.passages[1].metadata.size, "100,100");
    });

		it('Should correctly write multiple tags', function() {
			let fr = FileReader.read("test/HTMLWriter/example5.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			HTMLWriter.write("test/HTMLWriter/test6.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test6.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.passages[1].tags.length, 2);
    });

		it('Should correctly write stylesheet-tagged passages', function() {
			let fr = FileReader.read("test/HTMLWriter/example6.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			HTMLWriter.write("test/HTMLWriter/test7.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test7.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.getStylePassages().length, 1);
    });

		it('Should correctly write script-tagged passages', function() {
			let fr = FileReader.read("test/HTMLWriter/example7.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			HTMLWriter.write("test/HTMLWriter/test8.html", tp, sfp);
			let frh = FileReader.read("test/HTMLWriter/test8.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.getScriptPassages().length, 1);
    });

		it('Should correctly write extra CSS code', function() {
			let fr = FileReader.read("test/HTMLWriter/example7.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			HTMLWriter.write("test/HTMLWriter/test9.html", tp, sfp, "body{background:grey}");
			let frh = FileReader.read("test/HTMLWriter/test9.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.getStylePassages()[0].text.includes("body{background:grey}"), true);
    });

		it('Should correctly write extra JS code', function() {
			let fr = FileReader.read("test/HTMLWriter/example6.twee");
			let tp = TweeParser.parse(fr);
			let sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
			HTMLWriter.write("test/HTMLWriter/test10.html", tp, sfp, "", "console.log('Test!')");
			let frh = FileReader.read("test/HTMLWriter/test10.html");
			let hp = HTMLParser.parse(frh);
			assert.equal(hp.getScriptPassages()[0].text.includes("console.log('Test!')"), true);
    });
  });
});
