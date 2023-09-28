import FileReader from '../src/FileReader.js';
import TweeParser from '../src/TweeParser.js';

describe('TweeParser', () => {
  describe('parse()', () => {
    it('Should throw error if non-string is used', () => {
      expect(() => { TweeParser.parse(1); }).toThrow();
    });

    it('Should throw error if empty string is used', () => {
      expect(() => { TweeParser.parse(); }).toThrow();
    });

    it('Should throw error if no passages are present', () => {
      expect(() => { TweeParser.parse('()()'); }).toThrow();
    });

    it('Should throw error if it detects malformed passage headers', () => {
      expect(() => { TweeParser.parse('::{}[]\nNo name'); }).toThrow();
    });

    it('Should cut notes before passages', () => {
      const fr = FileReader.read('test/TweeParser/notes.twee');
      const story = TweeParser.parse(fr);
      expect(story.name).toBe('twineExample');
    });

    it('Should be able to parse Twee file for Story Name', () => {
      const fr = FileReader.read('test/TweeParser/example.twee');
      const story = TweeParser.parse(fr);
      expect(story.name).toBe('twineExample');
    });

    it('Should parse single tag on Start passage', () => {
      const fr = FileReader.read('test/TweeParser/singletag.twee');
      const story = TweeParser.parse(fr);
      const start = story.getPassageByName('Start');
      expect(start.tags).toHaveLength(1);
    });

    it('Should parse multiple tag', () => {
      const fr = FileReader.read('test/TweeParser/multipletags.twee');
      const story = TweeParser.parse(fr);
      const start = story.getPassageByName('Start');
      expect(start.tags).toHaveLength(2);
    });

    it('Should parse single script passage', () => {
      const fr = FileReader.read('test/TweeParser/scriptPassage.twee');
      const story = TweeParser.parse(fr);
      const p = story.getPassageByName('UserScript');
      expect(p.tags).toHaveLength(1);
    });

    it('Should parse single stylesheet passage', () => {
      const fr = FileReader.read('test/TweeParser/stylePassage.twee');
      const story = TweeParser.parse(fr);
      const p = story.getPassageByName('UserStylesheet');
      expect(p.tags).toHaveLength(1);
      expect(p.name).toBe('UserStylesheet');
    });

    it('Should parse StoryTitle', () => {
      const fr = FileReader.read('test/TweeParser/test.twee');
      const story = TweeParser.parse(fr);
      expect(story.name).not.toBe(null);
    });

    it('Should parse StoryAuthor', () => {
      const fr = FileReader.read('test/TweeParser/example.twee');
      const story = TweeParser.parse(fr);
      const p = story.getPassageByName('StoryAuthor');
      expect(p).not.toBe(null);
    });
  });
});
