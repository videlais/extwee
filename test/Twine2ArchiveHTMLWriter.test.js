import Twine2ArchiveHTMLWriter from '../src/Twine2ArchiveHTMLWriter.js';
import Story from '../src/Story.js';
import fs from 'node:fs';
import Passage from '../src/Passage.js';

describe('Twine2ArchiveHTMLWriter', function () {
  describe('#write()', function () {
    it('Should throw error if path is not a string', function () {
      expect(() => { Twine2ArchiveHTMLWriter.write({}, []); }).toThrow();
    });

    it('Should throw error if stories is not an array', function () {
      expect(() => { Twine2ArchiveHTMLWriter.write('test/Twine2ArchiveHTMLWriter/test1.html', {}); }).toThrow();
    });

    it('Should throw error array does not contain stories', function () {
      expect(() => { Twine2ArchiveHTMLWriter.write('test/Twine2ArchiveHTMLWriter/test1.html', [1]); }).toThrow();
    });

    it('Should write one Story object', function () {
      // Create an array of Stories.
      const s = new Story('Test1');

      // Add a passage (as Start passage)
      s.addPassage(new Passage('Start', 'Work'));

      // Set startingPassage.
      s.start = 'Start';

      // Write to file.
      Twine2ArchiveHTMLWriter.write('test/Twine2ArchiveHTMLWriter/test1.html', [s]);

      // Read file
      const result = fs.readFileSync('test/Twine2ArchiveHTMLWriter/test1.html', 'utf-8');

      // Test for story name.
      expect(result.includes('tw-storydata name="Test1"')).toBe(true);

      // Test for passage.
      expect(result.includes('tw-passagedata pid="1" name="Start"')).toBe(true);
    });

    it('Should throw error if path is invalid', function () {
      // Create an array of Stories.
      const s = new Story('Test1');

      // Add a passage (as Start passage)
      s.addPassage(new Passage('Start', 'Work'));

      // Set startingPassage.
      s.start = 'Start';

      // Path is invalid.
      // Expect thrown error.
      expect(() => { Twine2ArchiveHTMLWriter.write('unknown/path', [s]); }).toThrow();
    });
  });
});
