import FileReader from '../src/FileReader.js';
import StoryFormatParser from '../src/StoryFormatParser.js';
import Twine2HTMLParser from '../src/Twine2HTMLParser.js';
import Twine2HTMLWriter from '../src/Twine2HTMLWriter.js';
import Story from '../src/Story.js';
import Passage from '../src/Passage.js';

describe('Twine2HTMLWriter', () => {
  describe('write()', () => {
    it('story should be instanceof Story', () => {
      expect(() => { Twine2HTMLWriter.write('test/Twine2HTMLWriter/test.html', {}); }).toThrow();
    });

    it('storyFormat should be instanceof StoryFormat', () => {
      const s = new Story();
      expect(() => { Twine2HTMLWriter.write('test/Twine2HTMLWriter/test.html', s, {}); }).toThrow();
    });

    it('Read, write, and read HTML', () => {
      // Read HTML.
      const fr = FileReader.read('test/Twine2HTMLParser/twineExample3.html');

      // Parse HTML.
      const story = Twine2HTMLParser.parse(fr);

      // Read StoryFormat.
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');

      // Parse StoryFormat.
      const storyFormat = StoryFormatParser.parse(fr2);

      // Write HTML.
      Twine2HTMLWriter.write('test/Twine2HTMLWriter/test2.html', story, storyFormat);

      // Read HTML.
      const fr3 = FileReader.read('test/Twine2HTMLWriter/test2.html');

      // Parse HTML.
      const story2 = Twine2HTMLParser.parse(fr3);

      // Test both names to be the same.
      expect(story.name).toBe(story2.name);
    });

    it('Should write one and two-tag passages', () => {
      // Read HTML.
      const fr = FileReader.read('test/Twine2HTMLWriter/TestTags.html');

      // Parse HTML.
      const story = Twine2HTMLParser.parse(fr);

      // Read StoryFormat.
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');

      // Parse StoryFormat.
      const storyFormat = StoryFormatParser.parse(fr2);

      // Write HTML.
      Twine2HTMLWriter.write('test/Twine2HTMLWriter/test3.html', story, storyFormat);

      // Read HTML.
      const fr3 = FileReader.read('test/Twine2HTMLWriter/test3.html');

      // Parse HTML.
      const story2 = Twine2HTMLParser.parse(fr3);

      let tags = '';
      let tags2 = '';

      // Combine contents of tags.
      story.forEachPassage((p) => {
        tags += p.tags.join('');
      });

      // Combine contents of tags.
      story2.forEachPassage((p) => {
        tags2 += p.tags.join('');
      });

      // Test combination tags.
      // They should be the same.
      expect(tags).toBe(tags2);
    });

    it('Should throw error if file path invalid', () => {
      // Read HTML.
      const fr = FileReader.read('test/Twine2HTMLParser/twineExample3.html');

      // Parse HTML.
      const story = Twine2HTMLParser.parse(fr);

      // Read StoryFormat.
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');

      // Parse StoryFormat.
      const storyFormat = StoryFormatParser.parse(fr2);

      // Throw error if path is invalid.
      expect(() => {
        Twine2HTMLWriter.write('test2/Twine2HTMLWriter/test2.html', story, storyFormat);
      }).toThrow();
    });

    it('Should not add optional position to passages', () => {
      // Create Story.
      const story = new Story();
      // Add passage.
      story.addPassage(new Passage('A'));
      // Add passage.
      story.addPassage(new Passage('B'));
      // Add StoryTitle
      story.addPassage(new Passage('StoryTitle', 'Title'));
      // Add Start
      story.addPassage(new Passage('Start', 'Content'));

      // Read StoryFormat.
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');

      // Parse StoryFormat.
      const storyFormat = StoryFormatParser.parse(fr2);

      // Set start
      story.start = 'Start';

      // Write out HTML with story and storyFormat.
      // (Will add position to passages without them.)
      Twine2HTMLWriter.write('test/Twine2HTMLWriter/test4.html', story, storyFormat);

      // Read new HTML file.
      const fr3 = FileReader.read('test/Twine2HTMLWriter/test4.html');

      // Parse new HTML file.
      const story2 = Twine2HTMLParser.parse(fr3);

      // Verify none of the directly created passages have position.
      story.forEachPassage((passage) => {
        expect(Object.prototype.hasOwnProperty.call(passage.metadata, 'position')).toBe(false);
      });

      // Verify none parsed passages have position.
      story2.forEachPassage((passage) => {
        expect(Object.prototype.hasOwnProperty.call(passage.metadata, 'position')).toBe(false);
      });
    });

    it("Don't write creator if missing originally", () => {
      // Create a new story.
      const story = new Story();

      // Create a passage.
      story.addPassage(new Passage('A'));

      // Create another passage.
      story.addPassage(new Passage('B'));

      // Create another passage.
      story.addPassage(new Passage('StoryTitle', 'Title'));

      // Add Start
      story.addPassage(new Passage('Start', 'Content'));

      // Set start
      story.start = 'Start';

      // Read StoryFormat.
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      // Parse StoryFormat.
      const storyFormat = StoryFormatParser.parse(fr2);

      // Write the HTML.
      Twine2HTMLWriter.write('test/Twine2HTMLWriter/creator.html', story, storyFormat);

      // Read HTML.
      const fr3 = FileReader.read('test/Twine2HTMLWriter/creator.html');
      // Parse HTML.
      const story2 = Twine2HTMLParser.parse(fr3);

      // Test creator (should be default)
      expect(story.creator).toBe('extwee');

      // Test parsed creator (should be default)
      expect(story2.creator).toBe('extwee');

      // Creator should be the same
      expect(story.creator).toBe(story2.creator);
    });

    it('Throw error if StoryTitle does not exist', () => {
      // Create a new story.
      const story = new Story();

      // Create a passage.
      story.addPassage(new Passage('A'));

      // Read StoryFormat.
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      // Parse StoryFormat.
      const storyFormat = StoryFormatParser.parse(fr2);

      expect(() => {
        Twine2HTMLWriter.write('test', story, storyFormat);
      }).toThrow();
    });

    it('Throw error if no start or Start exists', () => {
      // Create a new story.
      const story = new Story();

      // Create a passage.
      story.addPassage(new Passage('A'));

      // Create StoryTitle
      story.addPassage(new Passage('StoryTitle', 'Name'));

      // Read StoryFormat.
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      // Parse StoryFormat.
      const storyFormat = StoryFormatParser.parse(fr2);

      // Throws error
      expect(() => {
        Twine2HTMLWriter.write('test/Twine2HTMLWriter/test6.html', story, storyFormat);
      }).toThrow();
    });

    it('Throw error if starting passage property does not exist', () => {
      // Create a new story.
      const story = new Story();

      // Create a passage.
      story.addPassage(new Passage('A'));

      // Create StoryTitle
      story.addPassage(new Passage('StoryTitle', 'Name'));

      // Set a passage that doesn't exist
      story.start = 'Nope';

      // Read StoryFormat.
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');

      // Parse StoryFormat.
      const storyFormat = StoryFormatParser.parse(fr2);

      // Throws error
      expect(() => {
        Twine2HTMLWriter.write('test/Twine2HTMLWriter/test7.html', story, storyFormat);
      }).toThrow();
    });
  });
});
