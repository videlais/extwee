const FileReader = require('../src/FileReader.js');
const TweeParser = require('../src/TweeParser.js');

describe('TweeParser', function () {
  describe('#parse()', function () {
    it('Should throw error if non-string is used', function () {
      expect(() => { TweeParser.parse(1); }).toThrow();
    });

    it('Should throw error if empty string is used', function () {
      expect(() => { TweeParser.parse(); }).toThrow();
    });

    it('Should throw error if no passages are present', function () {
      expect(() => { TweeParser.parse('()()'); }).toThrow();
    });

    it('Should cut notes before passages', function () {
      const fr = FileReader.read('test/TweeParser/notes.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.name).toBe('twineExample');
    });

    it('Should throw error if it detects malformed passage headers', function () {
      expect(() => { TweeParser.parse('::{}[]\nNo name'); }).toThrow();
    });

    it('Should be able to parse Twee file for Story Name', function () {
      const fr = FileReader.read('test/TweeParser/example.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.name).toBe('twineExample');
    });

    it('Should record and erase the StoryTitle and StoryData passages', function () {
      const fr = FileReader.read('test/TweeParser/test.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.passages).toHaveLength(5);
    });

    it('Should parse empty passage tags', function () {
      const fr = FileReader.read('test/TweeParser/emptytags.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.passages[0].tags).toHaveLength(0);
    });

    it('Should parse single passage tag', function () {
      const fr = FileReader.read('test/TweeParser/singletag.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.passages[0].tags).toHaveLength(1);
    });

    it('Should parse multiple passage tags', function () {
      const fr = FileReader.read('test/TweeParser/multipletags.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.passages[0].tags).toHaveLength(2);
    });
  });
});
