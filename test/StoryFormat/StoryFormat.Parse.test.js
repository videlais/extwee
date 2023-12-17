import { parse as parseStoryFormat } from '../../src/StoryFormat/parse.js';
import { readFileSync } from 'node:fs';

describe('StoryFormat', () => {
  describe('parse()', () => {
    it('Should throw error if JSON missing', () => {
      const fr = readFileSync('test/StoryFormat/StoryFormatParser/example.js', 'utf-8');
      expect(() => { parseStoryFormat(fr); }).toThrow();
    });

    it('Should throw error if JSON malformed', () => {
      const fr = readFileSync('test/StoryFormat/StoryFormatParser/example2.js', 'utf-8');
      expect(() => { parseStoryFormat(fr); }).toThrow();
    });

    it('Should correctly parse a StoryFormat name', () => {
      const fr = readFileSync('test/StoryFormat/StoryFormatParser/format.js', 'utf-8');
      const sfp = parseStoryFormat(fr);
      expect(sfp.name).toBe('Snowman');
    });

    it('Should correctly parse Harlowe story format', () => {
      const fr = readFileSync('test/StoryFormat/StoryFormatParser/harlowe.js', 'utf-8');
      const sfp = parseStoryFormat(fr);
      expect(sfp.name).toBe('Harlowe');
    });

    it('Should detect missing name and set default', () => {
      const fr = readFileSync('test/StoryFormat/StoryFormatParser/missingName.js', 'utf-8');
      const sfp = parseStoryFormat(fr);
      expect(sfp.name).toBe('Untitled Story Format');
    });

    it('Should detect missing author and set default', () => {
      const fr = readFileSync('test/StoryFormat/StoryFormatParser/missingAuthor.js', 'utf-8');
      const sfp = parseStoryFormat(fr);
      expect(sfp.author).toBe('');
    });

    it('Should detect missing description and set default', () => {
      const fr = readFileSync('test/StoryFormat/StoryFormatParser/missingDescription.js', 'utf-8');
      const sfp = parseStoryFormat(fr);
      expect(sfp.description).toBe('');
    });

    it('Should detect missing image and set default', () => {
      const fr = readFileSync('test/StoryFormat/StoryFormatParser/missingImage.js', 'utf-8');
      const sfp = parseStoryFormat(fr);
      expect(sfp.image).toBe('');
    });

    it('Should detect missing url and set default', () => {
      const fr = readFileSync('test/StoryFormat/StoryFormatParser/missingURL.js', 'utf-8');
      const sfp = parseStoryFormat(fr);
      expect(sfp.url).toBe('');
    });

    it('Should detect missing license and set default', () => {
      const fr = readFileSync('test/StoryFormat/StoryFormatParser/missingLicense.js', 'utf-8');
      const sfp = parseStoryFormat(fr);
      expect(sfp.license).toBe('');
    });

    it('Should detect proofing license and set default', () => {
      const fr = readFileSync('test/StoryFormat/StoryFormatParser/missingProofing.js', 'utf-8');
      const sfp = parseStoryFormat(fr);
      expect(sfp.proofing).toBe(false);
    });

    it('Should throw error if version does not exist', () => {
      const fr = readFileSync('test/StoryFormat/StoryFormatParser/missingVersion.js', 'utf-8');
      expect(() => {
        parseStoryFormat(fr);
      }).toThrow();
    });

    it('Should throw error if version is not semantic style', () => {
      const fr = readFileSync('test/StoryFormat/StoryFormatParser/versionWrong.js', 'utf-8');
      expect(() => {
        parseStoryFormat(fr);
      }).toThrow();
    });

    it('Should throw error if source is not found', () => {
      const fr = readFileSync('test/StoryFormat/StoryFormatParser/missingSource.js', 'utf-8');
      expect(() => {
        parseStoryFormat(fr);
      }).toThrow();
    });
  });
});
