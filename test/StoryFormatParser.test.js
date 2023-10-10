import StoryFormatParser from '../src/StoryFormatParser.js';
import fs from 'node:fs';

describe('StoryFormatParser', () => {
  describe('#parse()', () => {
    it('Should throw error if JSON missing', () => {
      const fr = fs.readFileSync('test/StoryFormatParser/example.js', 'utf-8');
      expect(() => { StoryFormatParser.parse(fr); }).toThrow();
    });

    it('Should throw error if JSON malformed', () => {
      const fr = fs.readFileSync('test/StoryFormatParser/example2.js', 'utf-8');
      expect(() => { StoryFormatParser.parse(fr); }).toThrow();
    });

    it('Should correctly parse a StoryFormat name', () => {
      const fr = fs.readFileSync('test/StoryFormatParser/format.js', 'utf-8');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.name).toBe('Snowman');
    });

    it('Should correctly parse Harlowe story format', () => {
      const fr = fs.readFileSync('test/StoryFormatParser/harlowe.js', 'utf-8');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.name).toBe('Harlowe');
    });

    it('Should detect missing name and set default', () => {
      const fr = fs.readFileSync('test/StoryFormatParser/missingName.js', 'utf-8');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.name).toBe('Untitled Story Format');
    });

    it('Should detect missing author and set default', () => {
      const fr = fs.readFileSync('test/StoryFormatParser/missingAuthor.js', 'utf-8');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.author).toBe('');
    });

    it('Should detect missing description and set default', () => {
      const fr = fs.readFileSync('test/StoryFormatParser/missingDescription.js', 'utf-8');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.description).toBe('');
    });

    it('Should detect missing image and set default', () => {
      const fr = fs.readFileSync('test/StoryFormatParser/missingImage.js', 'utf-8');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.image).toBe('');
    });

    it('Should detect missing url and set default', () => {
      const fr = fs.readFileSync('test/StoryFormatParser/missingURL.js', 'utf-8');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.url).toBe('');
    });

    it('Should detect missing license and set default', () => {
      const fr = fs.readFileSync('test/StoryFormatParser/missingLicense.js', 'utf-8');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.license).toBe('');
    });

    it('Should detect proofing license and set default', () => {
      const fr = fs.readFileSync('test/StoryFormatParser/missingProofing.js', 'utf-8');
      const sfp = StoryFormatParser.parse(fr);
      expect(sfp.proofing).toBe(false);
    });

    it('Should throw error if version does not exist', () => {
      const fr = fs.readFileSync('test/StoryFormatParser/missingVersion.js', 'utf-8');
      expect(() => {
        StoryFormatParser.parse(fr);
      }).toThrow();
    });

    it('Should throw error if version is not semantic style', () => {
      const fr = fs.readFileSync('test/StoryFormatParser/versionWrong.js', 'utf-8');
      expect(() => {
        StoryFormatParser.parse(fr);
      }).toThrow();
    });

    it('Should throw error if source is not found', () => {
      const fr = fs.readFileSync('test/StoryFormatParser/missingSource.js', 'utf-8');
      expect(() => {
        StoryFormatParser.parse(fr);
      }).toThrow();
    });
  });
});
