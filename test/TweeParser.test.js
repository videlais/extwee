const FileReader = require('../src/FileReader.js');
const TweeParser = require('../src/TweeParser.js');

describe('TweeParser', function () {
  describe('#parse()', function () {
    test('Should throw error if non-string is used', function () {
      expect(() => { TweeParser.parse(1); }).toThrow();
    });

    test('Should throw error if empty string is used', function () {
      expect(() => { TweeParser.parse(); }).toThrow();
    });

    test('Should throw error if no passages are present', function () {
      expect(() => { TweeParser.parse('()()'); }).toThrow();
    });

    test('Should cut notes before passages', function () {
      const fr = FileReader.read('test/TweeParser/notes.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.name).toBe('twineExample');
    });

    test('Should throw error if it detects malformed passage headers', function () {
      expect(() => { TweeParser.parse('::{}[]\nNo name'); }).toThrow();
    });

    test('Should be able to parse Twee file for Story Name', function () {
      const fr = FileReader.read('test/TweeParser/example.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.name).toBe('twineExample');
    });

    test('Should record and erase the StoryTitle and StoryData passages', function () {
      const fr = FileReader.read('test/TweeParser/test.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.passages).toHaveLength(5);
    });

    test('Should parse empty passage tags', function () {
      const fr = FileReader.read('test/TweeParser/emptytags.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.passages[0].tags).toHaveLength(0);
    });

    test('Should parse single passage tag', function () {
      const fr = FileReader.read('test/TweeParser/singletag.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.passages[0].tags).toHaveLength(1);
    });

    test('Should parse multiple passage tags', function () {
      const fr = FileReader.read('test/TweeParser/multipletags.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.passages[0].tags).toHaveLength(2);
    });

    test('Should throw error if no StoryData or Story passage', function () {
      const fr = FileReader.read('test/TweeParser/missing.twee');
      expect(() => {
        TweeParser.parse(fr);
      }).toThrow();
    });
  });
});
