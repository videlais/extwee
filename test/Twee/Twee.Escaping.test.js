import { parse as parseTwee, escapeTweeMetacharacters, unescapeTweeMetacharacters } from '../../src/Twee/parse.js';
import Passage from '../../src/Passage.js';

describe('Twee Escaping', () => {
  describe('unescapeTweeMetacharacters()', () => {
    it('Should unescape square brackets', () => {
      expect(unescapeTweeMetacharacters('Test\\[Name\\]')).toBe('Test[Name]');
    });

    it('Should unescape curly braces', () => {
      expect(unescapeTweeMetacharacters('Test\\{Name\\}')).toBe('Test{Name}');
    });

    it('Should unescape backslashes', () => {
      expect(unescapeTweeMetacharacters('Test\\\\Name')).toBe('Test\\Name');
    });

    it('Should unescape any character after backslash (robust decoding)', () => {
      expect(unescapeTweeMetacharacters('\\q')).toBe('q');
      expect(unescapeTweeMetacharacters('\\x')).toBe('x');
      expect(unescapeTweeMetacharacters('\\5')).toBe('5');
    });

    it('Should handle complex combinations', () => {
      expect(unescapeTweeMetacharacters('\\[Hello\\] \\{world\\} \\\\\\\\')).toBe('[Hello] {world} \\\\');
    });

    it('Should handle non-string input gracefully', () => {
      expect(unescapeTweeMetacharacters(null)).toBe(null);
      expect(unescapeTweeMetacharacters(undefined)).toBe(undefined);
      expect(unescapeTweeMetacharacters(123)).toBe(123);
    });

    it('Should handle empty strings', () => {
      expect(unescapeTweeMetacharacters('')).toBe('');
    });

    it('Should handle strings without escape sequences', () => {
      expect(unescapeTweeMetacharacters('Normal Text')).toBe('Normal Text');
    });
  });

  describe('escapeTweeMetacharacters()', () => {
    it('Should escape square brackets', () => {
      expect(escapeTweeMetacharacters('Test[Name]')).toBe('Test\\[Name\\]');
    });

    it('Should escape curly braces', () => {
      expect(escapeTweeMetacharacters('Test{Name}')).toBe('Test\\{Name\\}');
    });

    it('Should escape backslashes', () => {
      expect(escapeTweeMetacharacters('Test\\Name')).toBe('Test\\\\Name');
    });

    it('Should escape complex combinations', () => {
      expect(escapeTweeMetacharacters('[Hello] {world} \\\\')).toBe('\\[Hello\\] \\{world\\} \\\\\\\\');
    });

    it('Should handle non-string input gracefully', () => {
      expect(escapeTweeMetacharacters(null)).toBe(null);
      expect(escapeTweeMetacharacters(undefined)).toBe(undefined);
      expect(escapeTweeMetacharacters(123)).toBe(123);
    });

    it('Should handle empty strings', () => {
      expect(escapeTweeMetacharacters('')).toBe('');
    });

    it('Should handle strings without metacharacters', () => {
      expect(escapeTweeMetacharacters('Normal Text')).toBe('Normal Text');
    });
  });

  describe('Round-trip escaping', () => {
    it('Should preserve text through escape -> unescape cycle', () => {
      const original = 'Test[Name]{Value}\\Path';
      const escaped = escapeTweeMetacharacters(original);
      const unescaped = unescapeTweeMetacharacters(escaped);
      expect(unescaped).toBe(original);
    });

    it('Should handle complex nested scenarios', () => {
      const original = '[{\\}]{[\\]}';
      const escaped = escapeTweeMetacharacters(original);
      const unescaped = unescapeTweeMetacharacters(escaped);
      expect(unescaped).toBe(original);
    });
  });

  describe('Twee parsing with escaping', () => {
    it('Should correctly parse escaped passage names', () => {
      const content = ':: Test\\[Name\\] \\{with\\} \\\\brackets\nContent here';
      const story = parseTwee(content);
      expect(story.passages[0].name).toBe('Test[Name] {with} \\brackets');
    });

    it('Should correctly parse escaped tags', () => {
      const content = ':: TestPassage [tag\\[1\\] tag\\{2\\}]\nContent here';
      const story = parseTwee(content);
      expect(story.passages[0].tags).toEqual(['tag[1]', 'tag{2}']);
    });

    it('Should handle mixed escaped and non-escaped content', () => {
      const content = ':: Test\\[Passage [normal escaped\\]tag]\nContent here';
      const story = parseTwee(content);
      expect(story.passages[0].name).toBe('Test[Passage');
      expect(story.passages[0].tags).toEqual(['normal', 'escaped]tag']);
    });

    it('Should handle the cursed.twee test case correctly', () => {
      const content = `:: StoryData
{
  "ifid": "22F25A58-7062-4927-95B6-F424DDB2EC65",
  "format": "Harlowe",
  "format-version": "3.3.8",
  "start": "[Hello] {world} \\\\\\\\",
  "zoom": 1
}

:: \\[Hello\\] \\{world\\} \\\\\\\\
Content here`;
      
      const story = parseTwee(content);
      expect(story.start).toBe('[Hello] {world} \\\\');
      
      // Find the passage by the unescaped name
      const passage = story.getPassageByName('[Hello] {world} \\\\');
      expect(passage).not.toBeNull();
      expect(passage.name).toBe('[Hello] {world} \\\\');
    });

    it('Should handle complex metadata with escaped keys (if supported)', () => {
      const content = ':: TestPassage {"position": "100,200", "size": "150,100"}\nContent here';
      const story = parseTwee(content);
      expect(story.passages[0].metadata.position).toBe('100,200');
      expect(story.passages[0].metadata.size).toBe('150,100');
    });
  });

  describe('Twee generation with escaping', () => {
    it('Should escape passage names when generating Twee', () => {
      const passage = new Passage('Test[Name]', 'Content', [], {});
      const tweeOutput = passage.toTwee();
      expect(tweeOutput).toContain(':: Test\\[Name\\]');
    });

    it('Should escape tag names when generating Twee', () => {
      const passage = new Passage('TestPassage', 'Content', ['tag[1]', 'tag{2}'], {});
      const tweeOutput = passage.toTwee();
      expect(tweeOutput).toContain('[tag\\[1\\] tag\\{2\\}]');
    });

    it('Should handle complex escaping scenarios', () => {
      const passage = new Passage('Test[Name]{Value}\\Path', 'Content', ['complex[tag]'], {});
      const tweeOutput = passage.toTwee();
      expect(tweeOutput).toContain(':: Test\\[Name\\]\\{Value\\}\\\\Path');
      expect(tweeOutput).toContain('[complex\\[tag\\]]');
    });

    it('Should preserve normal names and tags without escaping', () => {
      const passage = new Passage('NormalName', 'Content', ['normaltag'], {});
      const tweeOutput = passage.toTwee();
      expect(tweeOutput).toContain(':: NormalName');
      expect(tweeOutput).toContain('[normaltag]');
    });
  });

  describe('Edge cases', () => {
    it('Should handle empty passage names gracefully', () => {
      const content = ':: \nContent here';
      expect(() => parseTwee(content)).toThrow('Malformed passage header!');
    });

    it('Should handle passages with only escaped characters as names', () => {
      const content = ':: \\[\\]\nContent here';
      const story = parseTwee(content);
      expect(story.passages[0].name).toBe('[]');
    });

    it('Should handle multiple consecutive escapes', () => {
      const content = ':: Test\\\\\\\\Name\nContent here';
      const story = parseTwee(content);
      expect(story.passages[0].name).toBe('Test\\\\Name');
    });

    it('Should handle tags with only metacharacters', () => {
      const content = ':: TestPassage [\\[\\] \\{\\}]\nContent here';
      const story = parseTwee(content);
      expect(story.passages[0].tags).toEqual(['[]', '{}']);
    });

    it('Should handle mixed whitespace and escaping', () => {
      const content = ':: Test\\[Name\\]   [  tag\\[1\\]   tag2  ]\nContent here';
      const story = parseTwee(content);
      expect(story.passages[0].name).toBe('Test[Name]');
      expect(story.passages[0].tags).toEqual(['tag[1]', 'tag2']);
    });
  });
});