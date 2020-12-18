const FileReader = require('../src/FileReader.js');
const TweeParser = require('../src/TweeParser.js');
const StoryFormatParser = require('../src/StoryFormatParser.js');
const HTMLParser = require('../src/HTMLParser.js');
const HTMLWriter = require('../src/HTMLWriter.js');
const Story = require('../src/Story.js');

describe('HTMLWriter', function () {
  describe('#constructor()', function () {
    test('Should throw error if file writing fails', function () {
      const fr = FileReader.read('test/HTMLWriter/example.twee');
      const tp = TweeParser.parse(fr);
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      const sfp = StoryFormatParser.parse(fr2);
      expect(() => { HTMLWriter.write('', tp, sfp); }).toThrow();
    });

    test('story should be instanceof Story', function () {
      expect(() => { HTMLWriter.write('test/HTMLWriter/test.html', {}); }).toThrow();
    });

    test('storyFormat should be instanceof StoryFormat', function () {
      const s = new Story();
      expect(() => { HTMLWriter.write('test/HTMLWriter/test.html', s, {}); }).toThrow();
    });

    test('Should produce HTML readable by HTMLParser and find story name of "twineExample"', function () {
      const fr = FileReader.read('test/HTMLWriter/example.twee');
      const tp = TweeParser.parse(fr);
      const fr2 = FileReader.read('test/StoryFormatParser/format.js')
      const sfp = StoryFormatParser.parse(fr2);
      HTMLWriter.write('test/HTMLWriter/test2.html', tp, sfp);
      const frh = FileReader.read('test/HTMLWriter/test2.html');
      const hp = HTMLParser.parse(frh);
      expect(hp.name).toBe('twineExample');
    });

    test('Should correctly write default values for "position" and "size"', function () {
      const fr = FileReader.read('test/HTMLWriter/example.twee');
      const tp = TweeParser.parse(fr);
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      const sfp = StoryFormatParser.parse(fr2);
      HTMLWriter.write('test/HTMLWriter/test3.html', tp, sfp);
      const frh = FileReader.read('test/HTMLWriter/test3.html');
      const hp = HTMLParser.parse(frh);
      expect(hp.passages[0].metadata.position).toBe('100,100');
    });

    test('Should correctly write defined values for "position"', function () {
      const fr = FileReader.read('test/HTMLWriter/example2.twee');
      const tp = TweeParser.parse(fr);
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      const sfp = StoryFormatParser.parse(fr2);
      HTMLWriter.write('test/HTMLWriter/test4.html', tp, sfp);
      const frh = FileReader.read('test/HTMLWriter/test4.html');
      const hp = HTMLParser.parse(frh);
      expect(hp.passages[0].metadata.position).toBe('200,200');
    });

    test('Should correctly write single "tag"', function () {
      const fr = FileReader.read('test/HTMLWriter/example3.twee');
      const tp = TweeParser.parse(fr);
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      const sfp = StoryFormatParser.parse(fr2);
      HTMLWriter.write('test/HTMLWriter/test5.html', tp, sfp);
      const frh = FileReader.read('test/HTMLWriter/test5.html');
      const hp = HTMLParser.parse(frh);
      expect(hp.passages[0].tags.includes('tag')).toBe(true);
    });

    test('Should correctly write defined values for "size"', function () {
      const fr = FileReader.read('test/HTMLWriter/example4.twee');
      const tp = TweeParser.parse(fr);
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      const sfp = StoryFormatParser.parse(fr2);
      HTMLWriter.write('test/HTMLWriter/test6.html', tp, sfp);
      const frh = FileReader.read('test/HTMLWriter/test6.html');
      const hp = HTMLParser.parse(frh);
      expect(hp.passages[0].metadata.size).toBe('100,100');
    });

    test('Should correctly write multiple tags', function () {
      const fr = FileReader.read('test/HTMLWriter/example5.twee');
      const tp = TweeParser.parse(fr);
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      const sfp = StoryFormatParser.parse(fr2);
      HTMLWriter.write('test/HTMLWriter/test6.html', tp, sfp);
      const frh = FileReader.read('test/HTMLWriter/test6.html');
      const hp = HTMLParser.parse(frh);
      expect(hp.passages[0].tags).toHaveLength(2);
    });

    test('Should correctly write stylesheet-tagged passages', function () {
      const fr = FileReader.read('test/HTMLWriter/example6.twee');
      const tp = TweeParser.parse(fr);
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      const sfp = StoryFormatParser.parse(fr2);
      HTMLWriter.write('test/HTMLWriter/test7.html', tp, sfp);
      const frh = FileReader.read('test/HTMLWriter/test7.html');
      const hp = HTMLParser.parse(frh);
      expect(hp.getStylePassages()).toHaveLength(1);
    });

    test('Should correctly write script-tagged passages', function () {
      const fr = FileReader.read('test/HTMLWriter/example7.twee');
      const tp = TweeParser.parse(fr);
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      const sfp = StoryFormatParser.parse(fr2);
      HTMLWriter.write('test/HTMLWriter/test8.html', tp, sfp);
      const frh = FileReader.read('test/HTMLWriter/test8.html');
      const hp = HTMLParser.parse(frh);
      expect(hp.getScriptPassages()).toHaveLength(1);
    });

    test('Should correctly write extra CSS code', function () {
      const fr = FileReader.read('test/HTMLWriter/example7.twee');
      const tp = TweeParser.parse(fr);
      const fr2 = FileReader.read('test/StoryFormatParser/format.js')
      const sfp = StoryFormatParser.parse(fr2);
      HTMLWriter.write('test/HTMLWriter/test9.html', tp, sfp, 'body{background:grey}');
      const frh = FileReader.read('test/HTMLWriter/test9.html');
      const hp = HTMLParser.parse(frh);
      expect(hp.getStylePassages()[0].text.includes('body{background:grey}')).toBe(true);
    });

    test('Should correctly write extra JS code', function () {
      const fr = FileReader.read('test/HTMLWriter/example6.twee');
      const tp = TweeParser.parse(fr);
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      const sfp = StoryFormatParser.parse(fr2);
      HTMLWriter.write('test/HTMLWriter/test10.html', tp, sfp, '', "console.log('Test!')");
      const frh = FileReader.read('test/HTMLWriter/test10.html');
      const hp = HTMLParser.parse(frh);
      expect(hp.getScriptPassages()[0].text.includes("console.log('Test!')")).toBe(true);
    });
  });
});
