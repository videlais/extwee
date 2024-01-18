import { parse as parseStoryFormat } from '../../src/StoryFormat/parse.js';
import { parse as parseTwine2HTML } from '../../src/Twine2HTML/parse.js';
import { compile as compileTwine2HTML } from '../../src/Twine2HTML/compile.js';
import { Story } from '../../src/Story.js';
import Passage from '../../src/Passage.js';
import StoryFormat from '../../src/StoryFormat.js';
import { generate as generateIFID } from '../../src/IFID/generate.js';
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
      story.passages.forEach((p) => {
        tags += p.tags.join('');
      });

      // Combine contents of tags.
      story2.passages.forEach((p) => {
        tags2 += p.tags.join('');
      });

      // Test combination tags.
      // They should be the same.
      expect(tags).toBe(tags2);
    });

    it('Throw error if IFID does not exist', () => {
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

    it('Throw error if source is empty string in StoryFormat', () => {
      // Create a new story.
      const story = new Story();

      // Create StoryFormat.
      const sf = new StoryFormat();

      // Set source to empty string.
      sf.source = '';

      // Throws error.
      expect(() => {
        compileTwine2HTML(story, sf);
      }).toThrow();
    });

    it('Throw error if story name is empty string', () => {
      // Create a new story.
      const story = new Story();

      // Create StoryFormat.
      const sf = new StoryFormat();

      // Set source to non-empty string.
      sf.source = 'Test';

      // Generate IFID (to avoid throwing error).
      story.IFID = generateIFID();

      // Set story name to empty string.
      story.name = '';

      // Throws error.
      expect(() => {
        compileTwine2HTML(story, sf);
      }).toThrow();
    });
  });
});
