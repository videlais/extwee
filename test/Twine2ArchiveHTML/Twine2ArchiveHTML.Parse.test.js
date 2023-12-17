import { parse as parseTwine2ArchiveHTML } from '../../src/Twine2ArchiveHTML/parse.js';
import { readFileSync } from 'node:fs';

describe('Twine2ArchiveHTML', function () {
  describe('parse()', function () {
    it('Should throw error when given no Twine 2 HTML elements', function () {
      expect(() => { parseTwine2ArchiveHTML(''); }).toThrow();
    });

    it('Should throw error when content is not string', function () {
      expect(() => { parseTwine2ArchiveHTML(2); }).toThrow();
    });

    it('Should produce two stories', function () {
      // Read Twine 2 Archive.
      const archiveFile = readFileSync('test/Twine2ArchiveHTML/Twine2ArchiveHTMLParser/test1.html', 'utf-8');

      // Parse Twine 2 Story.
      const stories = parseTwine2ArchiveHTML(archiveFile);

      // Expect two stories.
      expect(stories.length).toBe(2);
    });
  });
});
