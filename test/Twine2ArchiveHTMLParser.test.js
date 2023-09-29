import Twine2ArchiveHTMLParser from '../src/Twine2ArchiveHTMLParser.js';
import fs from 'node:fs';

describe('Twine2ArchiveHTMLParser', function () {
  describe('#parse()', function () {
    it('Should throw error when given no Twine 2 HTML elements', function () {
      expect(() => { Twine2ArchiveHTMLParser.parse(''); }).toThrow();
    });

    it('Should throw error when content is not string', function () {
      expect(() => { Twine2ArchiveHTMLParser.parse(2); }).toThrow();
    });

    it('Should produce two stories', function () {
      // Read Twine 2 Archive.
      const archiveFile = fs.readFileSync('test/Twine2ArchiveHTMLParser/test1.html', 'utf-8');

      // Parse Twine 2 Story.
      const stories = Twine2ArchiveHTMLParser.parse(archiveFile);

      // Expect two stories.
      expect(stories.length).toBe(2);
    });
  });
});
