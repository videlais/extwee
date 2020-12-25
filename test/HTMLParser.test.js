import FileReader from '../src/FileReader.js';
import HTMLParser from '../src/HTMLParser.js';

describe('HTMLParser', function () {
  describe('#parse()', function () {
    test('Should throw error if content is not Twine-2 style HTML', function () {
      expect(() => { HTMLParser.parse(''); }).toThrow();
    });

    test('Should be able to parse Twine 2 HTML for story name', function () {
      const fr = FileReader.read('test/HTMLParser/twineExample.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.name).toBe('twineExample');
    });

    test('Should be able to parse Twine 2 HTML for correct number of passages', function () {
      const fr = FileReader.read('test/HTMLParser/twineExample.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.size()).toBe(5);
    });

    test('Should be able to set correct starting passage', function () {
      const fr = FileReader.read('test/HTMLParser/twineExample.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.start.name).toBe('Start');
    });

    test('Should be able to correctly parse story CSS', function () {
      const fr = FileReader.read('test/HTMLParser/twineExample2.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.stylesheetPassage.text).toBe('html{font-size: 1.2em;}');
    });

    test('Should be able to correctly parse story JS', function () {
      const fr = FileReader.read('test/HTMLParser/twineExample3.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.scriptPassage.text).toBe('window.test = {};');
    });

    test('Should be able to correctly parse passage tags', function () {
      const fr = FileReader.read('test/HTMLParser/Tags.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.start.tags).toHaveLength(2);
    });
  });

  describe('#escapeMetacharacters()', function () {
    test('Should escape metacharacters', function () {
      /* eslint no-useless-escape: "off" */
      expect(HTMLParser.escapeMetacharacters('\\\{\\\}\\\[\\\]\\\\')).toBe('\\\\{\\\\}\\\\[\\\\]\\\\');
    });
  });
});
