const StoryFormatParser = require('../src/StoryFormatParser.js');
const FileReader = require('../src/FileReader');

describe('StoryFormatParser', function () {
  describe('#parse()', function () {
    test('Should throw error if JSON missing', function () {
      const fr = FileReader.read('test/StoryFormatParser/example.js');
      expect(() => { StoryFormatParser.parse(fr); }).toThrow();
    });

    test('Should throw error if JSON malformed', function () {
      const fr = FileReader.read('test/StoryFormatParser/example2.js');
      expect(() => { StoryFormatParser.parse(fr); }).toThrow();
    });

    test('Should correctly parse a StoryFormat name', function () {
      const fr = FileReader.read('test/StoryFormatParser/format.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.name).toBe('Snowman');
    });

    test('Should correctly parse Harlowe story format', function () {
      const fr = FileReader.read('test/StoryFormatParser/harlowe.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.name).toBe('Harlowe');
    });
  });
});
