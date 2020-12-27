import FileReader from '../src/FileReader.js';
import StoryFormatParser from '../src/StoryFormatParser.js';
import HTMLParser from '../src/HTMLParser.js';
import HTMLWriter from '../src/HTMLWriter.js';
import Story from '../src/Story.js';
import Passage from '../src/Passage.js';

describe('HTMLWriter', function () {
  describe('#write()', function () {
    test('story should be instanceof Story', function () {
      expect(() => { HTMLWriter.write('test/HTMLWriter/test.html', {}); }).toThrow();
    });

    test('storyFormat should be instanceof StoryFormat', function () {
      const s = new Story();
      expect(() => { HTMLWriter.write('test/HTMLWriter/test.html', s, {}); }).toThrow();
    });

    test('Read, write, and read HTML', function () {
      // Read HTML.
      const fr = FileReader.read('test/HTMLParser/twineExample3.html');
      // Parse HTML.
      const story = HTMLParser.parse(fr);

      // Read StoryFormat.
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      // Parse StoryFormat.
      const storyFormat = StoryFormatParser.parse(fr2);

      // Write HTML.
      HTMLWriter.write('test/HTMLWriter/test2.html', story, storyFormat);

      // Read HTML.
      const fr3 = FileReader.read('test/HTMLWriter/test2.html');
      // Parse HTML.
      const story2 = HTMLParser.parse(fr3);

      // Test both names to be the same.
      expect(story.name).toBe(story2.name);
    });

    test('Should write one and two-tag passages', function () {
      // Read HTML.
      const fr = FileReader.read('test/HTMLWriter/TestTags.html');
      // Parse HTML.
      const story = HTMLParser.parse(fr);

      // Read StoryFormat.
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      // Parse StoryFormat.
      const storyFormat = StoryFormatParser.parse(fr2);

      // Write HTML.
      HTMLWriter.write('test/HTMLWriter/test3.html', story, storyFormat);

      // Read HTML.
      const fr3 = FileReader.read('test/HTMLWriter/test3.html');
      // Parse HTML.
      const story2 = HTMLParser.parse(fr3);

      let tags = '';
      let tags2 = '';

      // Combine contents of tags.
      story.forEach((p) => {
        tags += p.tags.join('');
      });

      // Combine contents of tags.
      story2.forEach((p) => {
        tags2 += p.tags.join('');
      });

      // Test combination tags.
      // They should be the same.
      expect(tags).toBe(tags2);
    });

    test('Should throw error if file path invalid', function () {
      // Read HTML.
      const fr = FileReader.read('test/HTMLParser/twineExample3.html');
      // Parse HTML.
      const story = HTMLParser.parse(fr);

      // Read StoryFormat.
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      // Parse StoryFormat.
      const storyFormat = StoryFormatParser.parse(fr2);

      // Throw error if path is invalid.
      expect(() => {
        HTMLWriter.write('test2/HTMLWriter/test2.html', story, storyFormat);
      }).toThrow();
    });

    test('Should not add optional position to passages', function () {
      // Create Story.
      const story = new Story();
      // Add passage.
      story.addPassage(new Passage('A'));
      // Add passage.
      story.addPassage(new Passage('B'));

      // Read StoryFormat.
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      // Parse StoryFormat.
      const storyFormat = StoryFormatParser.parse(fr2);

      // Write out HTML with story and storyFormat.
      // (Will add position to passages without them.)
      HTMLWriter.write('test/HTMLWriter/test4.html', story, storyFormat);

      // Read new HTML file.
      const fr3 = FileReader.read('test/HTMLWriter/test4.html');
      // Parse new HTML file.
      const story2 = HTMLParser.parse(fr3);

      // Verify none of the directly created passages have position.
      story.forEach((passage) => {
        expect(Object.prototype.hasOwnProperty.call(passage.metadata, 'position')).toBe(false);
      });

      // Verify none parsed passages have position.
      story2.forEach((passage) => {
        expect(Object.prototype.hasOwnProperty.call(passage.metadata, 'position')).toBe(false);
      });
    });

    test("Don't write creator if missing originally", function () {
      // Create a new story.
      const story = new Story();

      // Create a passage
      story.addPassage(new Passage('A'));

      // CReate another passage
      story.addPassage(new Passage('B'));

      // Read StoryFormat.
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      // Parse StoryFormat.
      const storyFormat = StoryFormatParser.parse(fr2);

      // Write the HTML.
      HTMLWriter.write('test/HTMLWriter/creator.html', story, storyFormat);

      // Read HTML.
      const fr3 = FileReader.read('test/HTMLWriter/creator.html');
      // Parse HTML.
      const story2 = HTMLParser.parse(fr3);

      // Test creator (should be default)
      expect(story.creator).toBe('extwee');

      // Test parsed creator (should be default)
      expect(story2.creator).toBe('extwee');

      // Creator should be the same
      expect(story.creator).toBe(story2.creator);
    });
  });
});
