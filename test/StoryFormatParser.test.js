import StoryFormatParser from '../src/StoryFormatParser.js';
import FileReader from '../src/FileReader';

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

    test('Should detect missing name and set default', function () {
      const fr = FileReader.read('test/StoryFormatParser/missingName.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.name).toBe('Untitled Story Format');
    });

    test('Should detect missing author and set default', function () {
      const fr = FileReader.read('test/StoryFormatParser/missingAuthor.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.author).toBe('');
    });

    test('Should detect missing description and set default', function () {
      const fr = FileReader.read('test/StoryFormatParser/missingDescription.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.description).toBe('');
    });

    test('Should detect missing image and set default', function () {
      const fr = FileReader.read('test/StoryFormatParser/missingImage.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.image).toBe('');
    });

    test('Should detect missing url and set default', function () {
      const fr = FileReader.read('test/StoryFormatParser/missingURL.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.url).toBe('');
    });

    test('Should detect missing license and set default', function () {
      const fr = FileReader.read('test/StoryFormatParser/missingLicense.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.license).toBe('');
    });

    test('Should detect proofing license and set default', function () {
      const fr = FileReader.read('test/StoryFormatParser/missingProofing.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.proofing).toBe(false);
    });

    test('Should throw error if version does not exist', function () {
      const fr = FileReader.read('test/StoryFormatParser/missingVersion.js');
      expect(() => {
        StoryFormatParser.parse(fr);
      }).toThrow();
    });

    test('Should throw error if version is not semantic style', function () {
      const fr = FileReader.read('test/StoryFormatParser/versionWrong.js');
      expect(() => {
        StoryFormatParser.parse(fr);
      }).toThrow();
    });

    test('Should throw error if source is not found', function () {
      const fr = FileReader.read('test/StoryFormatParser/missingSource.js');
      expect(() => {
        StoryFormatParser.parse(fr);
      }).toThrow();
    });
  });
});
