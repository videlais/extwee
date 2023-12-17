import { readFileSync } from 'node:fs';
import { parse as parseTwee } from '../../src/Twee/parse.js';

describe('Twee', () => {
  describe('parse()', () => {
    it('Should throw error if non-string is used', () => {
      expect(() => { parseTwee(1); }).toThrow();
    });

    it('Should throw error if empty string is used', () => {
      expect(() => { parseTwee(); }).toThrow();
    });

    it('Should throw error if no passages are present', () => {
      expect(() => { parseTwee('()()'); }).toThrow();
    });

    it('Should throw error if it detects malformed passage headers', () => {
      expect(() => { parseTwee('::{}[]\nNo name'); }).toThrow();
    });

    it('Should cut notes before passages', () => {
      const fr = readFileSync('test/Twee/TweeParser/notes.twee', 'utf-8');
      const story = parseTwee(fr);
      expect(story.name).toBe('twineExample');
    });

    it('Should be able to parse Twee file for Story Name', () => {
      const fr = readFileSync('test/Twee/TweeParser/example.twee', 'utf-8');
      const story = parseTwee(fr);
      expect(story.name).toBe('twineExample');
    });

    it('Should parse single tag on Start passage', () => {
      const fr = readFileSync('test/Twee/TweeParser/singletag.twee', 'utf-8');
      const story = parseTwee(fr);
      const start = story.getPassageByName('Start');
      expect(start.tags).toHaveLength(1);
    });

    it('Should parse multiple tag', () => {
      const fr = readFileSync('test/Twee/TweeParser/multipletags.twee', 'utf-8');
      const story = parseTwee(fr);
      const start = story.getPassageByName('Start');
      expect(start.tags).toHaveLength(2);
    });

    it('Should parse single script passage', () => {
      const fr = readFileSync('test/Twee/TweeParser/scriptPassage.twee', 'utf-8');
      const story = parseTwee(fr);
      const p = story.getPassageByName('UserScript');
      expect(p.tags).toHaveLength(1);
    });

    it('Should parse single stylesheet passage', () => {
      const fr = readFileSync('test/Twee/TweeParser/stylePassage.twee', 'utf-8');
      const story = parseTwee(fr);
      const p = story.getPassageByName('UserStylesheet');
      expect(p.tags).toHaveLength(1);
      expect(p.name).toBe('UserStylesheet');
    });

    it('Should parse StoryTitle', () => {
      const fr = readFileSync('test/Twee/TweeParser/test.twee', 'utf-8');
      const story = parseTwee(fr);
      expect(story.name).not.toBe(null);
    });

    it('Should parse StoryAuthor', () => {
      const fr = readFileSync('test/Twee/TweeParser/example.twee', 'utf-8');
      const story = parseTwee(fr);
      const p = story.getPassageByName('StoryAuthor');
      expect(p).not.toBe(null);
    });
  });
});
