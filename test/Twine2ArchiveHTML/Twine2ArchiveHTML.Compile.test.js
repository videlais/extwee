import { compile as compileTwine2ArchiveHTML } from '../../src/Twine2ArchiveHTML/compile.js';
import Story from '../../src/Story.js';
import Passage from '../../src/Passage.js';

describe('Twine2ArchiveHTML', function () {
  describe('compile()', function () {
    it('Should throw error if stories is not an array', function () {
      expect(() => { compileTwine2ArchiveHTML({}); }).toThrow();
    });

    it('Should throw error array does not contain stories', function () {
      expect(() => { compileTwine2ArchiveHTML([1]); }).toThrow();
    });

    it('Should write one Story object', function () {
      // Create an array of Stories.
      const s = new Story('Test1');

      // Add a passage (as Start passage)
      s.addPassage(new Passage('Start', 'Work'));

      // Set startingPassage.
      s.start = 'Start';

      // Write to file.
      const result = compileTwine2ArchiveHTML([s]);

      // Test for story name.
      expect(result.includes('tw-storydata name="Test1"')).toBe(true);

      // Test for passage.
      expect(result.includes('tw-passagedata pid="1" name="Start"')).toBe(true);
    });
  });
});
