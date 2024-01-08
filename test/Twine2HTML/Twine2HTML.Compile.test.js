import { parse as parseStoryFormat } from '../../src/StoryFormat/parse.js';
import { parse as parseTwine2HTML } from '../../src/Twine2HTML/parse.js';
import { compile as compileTwine2HTML } from '../../src/Twine2HTML/compile.js';
import { Story } from '../../src/Story.js';
import Passage from '../../src/Passage.js';
import { readFileSync } from 'node:fs';

describe('Twine2HTMLCompiler', () => {
  describe('compile()', () => {
    it('story should be instanceof Story', () => {
      expect(() => { compileTwine2HTML({}); }).toThrow();
    });

    it('storyFormat should be instanceof StoryFormat', () => {
      const s = new Story();
      expect(() => { compileTwine2HTML(s, {}); }).toThrow();
    });

    it('Read, write, and read HTML', () => {
      // Read HTML.
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/twineExample3.html', 'utf-8');

      // Parse HTML.
      const story = parseTwine2HTML(fr);

      // Read StoryFormat.
      const fr2 = readFileSync('test/StoryFormat/StoryFormatParser/format.js', 'utf-8');

      // Parse StoryFormat.
      const storyFormat = parseStoryFormat(fr2);

      // Write HTML.
      const fr3 = compileTwine2HTML(story, storyFormat);

      // Parse HTML.
      const story2 = parseTwine2HTML(fr3);

      // Test both names to be the same.
      expect(story.name).toBe(story2.name);
    });

    it('Should write one and two-tag passages', () => {
      // Read HTML.
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLCompiler/TestTags.html', 'utf-8');

      // Parse HTML.
      const story = parseTwine2HTML(fr);

      // Read StoryFormat.
      const fr2 = readFileSync('test/StoryFormat/StoryFormatParser/format.js', 'utf-8');

      // Parse StoryFormat.
      const storyFormat = parseStoryFormat(fr2);

      // Write HTML.
      const fr3 = compileTwine2HTML(story, storyFormat);

      // Parse HTML.
      const story2 = parseTwine2HTML(fr3);

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
      const fr2 = readFileSync('test/StoryFormat/StoryFormatParser/format.js', 'utf-8');

      // Parse StoryFormat.
      const storyFormat = parseStoryFormat(fr2);

      // Set start
      story.start = 'Start';

      // Write out HTML with story and storyFormat.
      // (Will add position to passages without them.)
      const fr3 = compileTwine2HTML(story, storyFormat);

      // Parse new HTML file.
      const story2 = parseTwine2HTML(fr3);

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
      const fr2 = readFileSync('test/StoryFormat/StoryFormatParser/format.js', 'utf-8');

      // Parse StoryFormat.
      const storyFormat = parseStoryFormat(fr2);

      // Write the HTML.
      const fr3 = compileTwine2HTML(story, storyFormat);

      // Parse HTML.
      const story2 = parseTwine2HTML(fr3);

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
      const fr2 = readFileSync('test/StoryFormat/StoryFormatParser/format.js', 'utf-8');

      // Parse StoryFormat.
      const storyFormat = parseStoryFormat(fr2);

      expect(() => {
        compileTwine2HTML(story, storyFormat);
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
      const fr2 = readFileSync('test/StoryFormat/StoryFormatParser/format.js', 'utf-8');

      // Parse StoryFormat.
      const storyFormat = parseStoryFormat(fr2);

      // Throws error.
      expect(() => {
        compileTwine2HTML(story, storyFormat);
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
      const fr2 = readFileSync('test/StoryFormat/StoryFormatParser/format.js', 'utf-8');

      // Parse StoryFormat.
      const storyFormat = parseStoryFormat(fr2);

      // Throws error.
      expect(() => {
        compileTwine2HTML(story, storyFormat);
      }).toThrow();
    });
  });
});
