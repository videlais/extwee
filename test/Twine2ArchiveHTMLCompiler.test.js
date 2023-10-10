import Twine2ArchiveHTMLCompiler from '../src/Twine2ArchiveHTMLCompiler.js';
import Story from '../src/Story.js';
import Passage from '../src/Passage.js';

describe('Twine2ArchiveHTMLCompiler', function () {
  describe('#write()', function () {
    it('Should throw error if stories is not an array', function () {
      expect(() => { Twine2ArchiveHTMLCompiler.compile({}); }).toThrow();
    });

    it('Should throw error array does not contain stories', function () {
      expect(() => { Twine2ArchiveHTMLCompiler.compile([1]); }).toThrow();
    });

    it('Should write one Story object', function () {
      // Create an array of Stories.
      const s = new Story('Test1');

      // Add a passage (as Start passage)
      s.addPassage(new Passage('Start', 'Work'));

      // Set startingPassage.
      s.start = 'Start';

      // Write to file.
      const result = Twine2ArchiveHTMLCompiler.compile([s]);

      // Test for story name.
      expect(result.includes('tw-storydata name="Test1"')).toBe(true);

      // Test for passage.
      expect(result.includes('tw-passagedata pid="1" name="Start"')).toBe(true);
    });
  });
});
