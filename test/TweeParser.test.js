import FileReader from '../src/FileReader.js';
import TweeParser from '../src/TweeParser.js';

describe('TweeParser', function () {
  describe('#parse()', function () {
    test('Should throw error if non-string is used', function () {
      expect(() => { TweeParser.parse(1); }).toThrow();
    });

    test('Should throw error if empty string is used', function () {
      expect(() => { TweeParser.parse(); }).toThrow();
    });

    test('Should throw error if no passages are present', function () {
      expect(() => { TweeParser.parse('()()'); }).toThrow();
    });

    test('Should throw error if it detects malformed passage headers', function () {
      expect(() => { TweeParser.parse('::{}[]\nNo name'); }).toThrow();
    });

    test('Should cut notes before passages', function () {
      const fr = FileReader.read('test/TweeParser/notes.twee');
      const story = TweeParser.parse(fr);
      const p = story.getPassageByName('StoryTitle');
      expect(p.text).toBe('twineExample');
    });

    test('Should be able to parse Twee file for Story Name', function () {
      const fr = FileReader.read('test/TweeParser/example.twee');
      const story = TweeParser.parse(fr);
      const p = story.getPassageByName('StoryTitle');
      expect(p.text).toBe('twineExample');
    });

    test('Should parse single tag on Start passage', function () {
      const fr = FileReader.read('test/TweeParser/singletag.twee');
      const story = TweeParser.parse(fr);
      const start = story.getPassageByName('Start');
      expect(start.tags).toHaveLength(1);
    });

    test('Should parse multiple tag', function () {
      const fr = FileReader.read('test/TweeParser/multipletags.twee');
      const story = TweeParser.parse(fr);
      const start = story.getPassageByName('Start');
      expect(start.tags).toHaveLength(2);
    });

    test('Should parse single script passage', function () {
      const fr = FileReader.read('test/TweeParser/scriptPassage.twee');
      const story = TweeParser.parse(fr);
      const p = story.getPassageByName('UserScript');
      expect(p.tags).toHaveLength(1);
    });

    test('Should parse single stylesheet passage', function () {
      const fr = FileReader.read('test/TweeParser/stylePassage.twee');
      const story = TweeParser.parse(fr);
      const p = story.getPassageByName('UserStylesheet');
      expect(p.tags).toHaveLength(1);
      expect(p.name).toBe('UserStylesheet');
    });

    test('Should parse StoryTitle', function () {
      const fr = FileReader.read('test/TweeParser/test.twee');
      const story = TweeParser.parse(fr);
      const p = story.getPassageByName('StoryTitle');
      expect(p).not.toBe(null);
    });

    test('Should parse StoryAuthor', function () {
      const fr = FileReader.read('test/TweeParser/example.twee');
      const story = TweeParser.parse(fr);
      const p = story.getPassageByName('StoryAuthor');
      expect(p).not.toBe(null);
    });
  });
});
