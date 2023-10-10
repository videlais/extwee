import fs from 'node:fs';
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
      const fr = fs.readFileSync('test/TweeParser/notes.twee', 'utf-8');
      const story = TweeParser.parse(fr);
      expect(story.name).toBe('twineExample');
    });

    it('Should be able to parse Twee file for Story Name', () => {
      const fr = fs.readFileSync('test/TweeParser/example.twee', 'utf-8');
      const story = TweeParser.parse(fr);
      expect(story.name).toBe('twineExample');
    });

    it('Should parse single tag on Start passage', () => {
      const fr = fs.readFileSync('test/TweeParser/singletag.twee', 'utf-8');
      const story = TweeParser.parse(fr);
      const start = story.getPassageByName('Start');
      expect(start.tags).toHaveLength(1);
    });

    it('Should parse multiple tag', () => {
      const fr = fs.readFileSync('test/TweeParser/multipletags.twee', 'utf-8');
      const story = TweeParser.parse(fr);
      const start = story.getPassageByName('Start');
      expect(start.tags).toHaveLength(2);
    });

    it('Should parse single script passage', () => {
      const fr = fs.readFileSync('test/TweeParser/scriptPassage.twee', 'utf-8');
      const story = TweeParser.parse(fr);
      const p = story.getPassageByName('UserScript');
      expect(p.tags).toHaveLength(1);
    });

    it('Should parse single stylesheet passage', () => {
      const fr = fs.readFileSync('test/TweeParser/stylePassage.twee', 'utf-8');
      const story = TweeParser.parse(fr);
      const p = story.getPassageByName('UserStylesheet');
      expect(p.tags).toHaveLength(1);
      expect(p.name).toBe('UserStylesheet');
    });

    it('Should parse StoryTitle', () => {
      const fr = fs.readFileSync('test/TweeParser/test.twee', 'utf-8');
      const story = TweeParser.parse(fr);
      expect(story.name).not.toBe(null);
    });

    it('Should parse StoryAuthor', () => {
      const fr = fs.readFileSync('test/TweeParser/example.twee', 'utf-8');
      const story = TweeParser.parse(fr);
      const p = story.getPassageByName('StoryAuthor');
      expect(p).not.toBe(null);
    });
  });
});
