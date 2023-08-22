import FileReader from '../src/FileReader.js';
import StoryFormatParser from '../src/StoryFormatParser.js';
import HTMLParser from '../src/HTMLParser.js';
import TweeParser from '../src/TweeParser.js';
import HTMLWriter from '../src/HTMLWriter.js';
import Story from '../src/Story.js';
import Passage from '../src/Passage.js';

describe('HTMLWriter', () => {
  describe('#write()', () => {
    it('story should be instanceof Story', () => {
      expect(() => { HTMLWriter.write('test/HTMLWriter/test.html', {}); }).toThrow();
    });

    it('storyFormat should be instanceof StoryFormat', () => {
      const s = new Story();
      expect(() => { HTMLWriter.write('test/HTMLWriter/test.html', s, {}); }).toThrow();
    });

    it('Read, write, and read HTML', () => {
      // Read HTML.
      const fr = FileReader.read('test/HTMLParser/twineExample3.html');
      // Parse HTML.
      const story = HTMLParser.parse(fr);

      const s1Title = story.getPassageByName('StoryTitle').text;

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
      expect(s1Title).toBe(story2.name);
    });

    it('Should write one and two-tag passages', () => {
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

    it('Should throw error if file path invalid', () => {
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
        HTMLWriter.write('test', story, storyFormat);
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
        HTMLWriter.write('test/HTMLWriter/test6.html', story, storyFormat);
      }).toThrow();
    });

    it('Write with Start without start', () => {
      // Create a new story.
      const story = new Story();

      // Create a passage.
      story.addPassage(new Passage('A'));

      // Create StoryTitle
      story.addPassage(new Passage('StoryTitle', 'Name'));

      // Create Start
      story.addPassage(new Passage('Start', 'Content'));

      // Read StoryFormat.
      const fr2 = FileReader.read('test/StoryFormatParser/format.js');
      // Parse StoryFormat.
      const storyFormat = StoryFormatParser.parse(fr2);

      // Write file
      HTMLWriter.write('test/HTMLWriter/test6.html', story, storyFormat);

      // Read new HTML file.
      const fr3 = FileReader.read('test/HTMLWriter/test6.html');
      // Parse new HTML file.
      const story2 = HTMLParser.parse(fr3);

      // Should not be start
      expect(story2.start).toBe('Start');
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
        HTMLWriter.write('test/HTMLWriter/test7.html', story, storyFormat);
      }).toThrow();
    });

    it('Should correctly replace all instances of STORY_NAME', () => {
      const fr = FileReader.read('test/HTMLWriter/example6.twee');
      const story = TweeParser.parse(fr);
      const storyFormatFile = FileReader.read('test/StoryFormatParser/format_doublename.js');
      const sfp = StoryFormatParser.parse(storyFormatFile);
      HTMLWriter.write('test/HTMLWriter/test11.html', story, sfp);
      const frh = FileReader.read('test/HTMLWriter/test11.html');
      expect(frh.indexOf('STORY_NAME')).toBe(-1);
    });
  });

  describe('escape()', () => {
    it('Should throw error if argument is not string', () => {
      expect(() => { HTMLWriter.escape(1); }).toThrow();
    });

    it('Should escape HTML sequences', () => {
      expect(HTMLWriter.escape('<script>alert("Hi!");</script>')).toBe('&lt;script&gt;alert(&quot;Hi!&quot;);&lt;/script&gt;');
    });
  });
});