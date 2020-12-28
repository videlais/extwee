import FileReader from '../src/FileReader.js';
import Passage from '../src/Passage.js';
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

    test('Should cut notes before passages', function () {
      const fr = FileReader.read('test/TweeParser/notes.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.name).toBe('twineExample');
    });

    test('Should throw error if it detects malformed passage headers', function () {
      expect(() => { TweeParser.parse('::{}[]\nNo name'); }).toThrow();
    });

    test('Should be able to parse Twee file for Story Name', function () {
      const fr = FileReader.read('test/TweeParser/example.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.name).toBe('twineExample');
    });

    test('Should throw error if no StoryData or Story passage', function () {
      const fr = FileReader.read('test/TweeParser/missing.twee');
      expect(() => {
        TweeParser.parse(fr);
      }).toThrow();
    });

    test('Should set start passage if StoryData is not found', function () {
      const fr = FileReader.read('test/TweeParser/singletag.twee');
      const story = TweeParser.parse(fr);
      expect(story.start instanceof Passage).toBe(true);
    });

    test('Should parse single tag', function () {
      const fr = FileReader.read('test/TweeParser/singletag.twee');
      const story = TweeParser.parse(fr);
      expect(story.start.tags).toHaveLength(1);
    });

    test('Should parse multiple tag', function () {
      const fr = FileReader.read('test/TweeParser/multipletags.twee');
      const story = TweeParser.parse(fr);
      expect(story.start.tags).toHaveLength(2);
    });

    test('Should parse single script passage', function () {
      const fr = FileReader.read('test/TweeParser/scriptPassage.twee');
      const story = TweeParser.parse(fr);
      expect(story.scriptPassage.tags).toHaveLength(1);
      expect(story.scriptPassage.name).toBe('UserScript');
    });

    test('Should parse multiple script passage', function () {
      const fr = FileReader.read('test/TweeParser/multipleScriptPassages.twee');
      const story = TweeParser.parse(fr);
      expect(story.scriptPassage.tags).toHaveLength(1);
      expect(story.scriptPassage.name).toBe('UserScript');
      expect(story.scriptPassage.text).toBe('1\n2');
    });

    test('Should parse single stylesheet passage', function () {
      const fr = FileReader.read('test/TweeParser/stylePassage.twee');
      const story = TweeParser.parse(fr);
      expect(story.stylesheetPassage.tags).toHaveLength(1);
      expect(story.stylesheetPassage.name).toBe('UserStylesheet');
    });

    test('Should parse multiple stylesheet passage', function () {
      const fr = FileReader.read('test/TweeParser/multipleStyleTag.twee');
      const story = TweeParser.parse(fr);
      expect(story.stylesheetPassage.tags).toHaveLength(1);
      expect(story.stylesheetPassage.name).toBe('UserStylesheet');
      expect(story.stylesheetPassage.text).toBe('1\n2');
    });

    test('Should parse stylesheet and other tags in passage', function () {
      const fr = FileReader.read('test/TweeParser/multipleStyleTag.twee');
      const story = TweeParser.parse(fr);
      expect(story.stylesheetPassage.tags).toHaveLength(1);
      expect(story.stylesheetPassage.name).toBe('UserStylesheet');
      expect(story.stylesheetPassage.text).toBe('1\n2');
    });
  });
});
