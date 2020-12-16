const StoryFormatParser = require('../src/StoryFormatParser.js');

describe('StoryFormatParser', function () {
  describe('#parse()', function () {
    it('Should throw error if JSON missing', function () {
      expect(() => { StoryFormatParser.parse('test/StoryFormatParser/example.js'); }).toThrow();
    });

    it('Should throw error if JSON malformed', function () {
      expect(() => { StoryFormatParser.parse('test/StoryFormatParser/example2.js'); }).toThrow();
    });

    it('Should correctly parse a StoryFormat name', function () {
      const sfp = StoryFormatParser.parse('test/StoryFormatParser/format.js');
      expect(sfp.name).toBe('Snowman');
    });

    it('Should correctly parse Harlowe story format', function () {
      const sfp = StoryFormatParser.parse('test/StoryFormatParser/harlowe.js');
      expect(sfp.name).toBe('Harlowe');
    });
  });
});
