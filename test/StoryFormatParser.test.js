import StoryFormatParser from '../src/StoryFormatParser.js';
import FileReader from '../src/FileReader';

describe('StoryFormatParser', () => {
  describe('#parse()', () => {
    it('Should throw error if JSON missing', () => {
      const fr = FileReader.read('test/StoryFormatParser/example.js');
      expect(() => { StoryFormatParser.parse(fr); }).toThrow();
    });

    it('Should throw error if JSON malformed', () => {
      const fr = FileReader.read('test/StoryFormatParser/example2.js');
      expect(() => { StoryFormatParser.parse(fr); }).toThrow();
    });

    it('Should correctly parse a StoryFormat name', () => {
      const fr = FileReader.read('test/StoryFormatParser/format.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.name).toBe('Snowman');
    });

    it('Should correctly parse Harlowe story format', () => {
      const fr = FileReader.read('test/StoryFormatParser/harlowe.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.name).toBe('Harlowe');
    });

    it('Should detect missing name and set default', () => {
      const fr = FileReader.read('test/StoryFormatParser/missingName.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.name).toBe('Untitled Story Format');
    });

    it('Should detect missing author and set default', () => {
      const fr = FileReader.read('test/StoryFormatParser/missingAuthor.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.author).toBe('');
    });

    it('Should detect missing description and set default', () => {
      const fr = FileReader.read('test/StoryFormatParser/missingDescription.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.description).toBe('');
    });

    it('Should detect missing image and set default', () => {
      const fr = FileReader.read('test/StoryFormatParser/missingImage.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.image).toBe('');
    });

    it('Should detect missing url and set default', () => {
      const fr = FileReader.read('test/StoryFormatParser/missingURL.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.url).toBe('');
    });

    it('Should detect missing license and set default', () => {
      const fr = FileReader.read('test/StoryFormatParser/missingLicense.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.license).toBe('');
    });

    it('Should detect proofing license and set default', () => {
      const fr = FileReader.read('test/StoryFormatParser/missingProofing.js');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.proofing).toBe(false);
    });

    it('Should throw error if version does not exist', () => {
      const fr = FileReader.read('test/StoryFormatParser/missingVersion.js');
      expect(() => {
        StoryFormatParser.parse(fr);
      }).toThrow();
    });

    it('Should throw error if version is not semantic style', () => {
      const fr = FileReader.read('test/StoryFormatParser/versionWrong.js');
      expect(() => {
        StoryFormatParser.parse(fr);
      }).toThrow();
    });

    it('Should throw error if source is not found', () => {
      const fr = FileReader.read('test/StoryFormatParser/missingSource.js');
      expect(() => {
        StoryFormatParser.parse(fr);
      }).toThrow();
    });
  });
});
