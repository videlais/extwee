import FileReader from '../src/FileReader.js';
import HTMLParser from '../src/HTMLParser.js';
import { version as packageVersion } from '../package.json';

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

    test('Should set a missing name to an empty string', function () {
      const fr = FileReader.read('test/HTMLParser/missingName.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.name).toBe('');
    });

    test('Should set a missing IFID to an empty string', function () {
      const fr = FileReader.read('test/HTMLParser/missingIFID.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.IFID).toBe('');
    });

    test('Should have Extwee for creator when missing', function () {
      const fr = FileReader.read('test/HTMLParser/missingCreator.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.creator).toBe('extwee');
    });

    test('Should have correct for creatorVersion when missing', function () {
      const fr = FileReader.read('test/HTMLParser/missingCreatorVersion.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.creatorVersion).toBe(packageVersion);
    });

    test('Should have empty string as format when missing', function () {
      const fr = FileReader.read('test/HTMLParser/missingFormat.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.format).toBe('');
    });

    test('Should have empty string as formatVersion when missing', function () {
      const fr = FileReader.read('test/HTMLParser/missingFormatVersion.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.formatVersion).toBe('');
    });

    test('Should have empty string as zoom when missing', function () {
      const fr = FileReader.read('test/HTMLParser/missingZoom.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.zoom).toBe('');
    });

    test('Should have null as start with missing startnode', function () {
      const fr = FileReader.read('test/HTMLParser/missingStartnode.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.start).toBe(null);
    });

    test('Should not have position if passage does not', function () {
      const fr = FileReader.read('test/HTMLParser/missingPosition.html');
      const tp = HTMLParser.parse(fr);
      expect(Object.prototype.hasOwnProperty.call(tp.start.metadata, 'position')).toBe(false);
    });

    test('Should not have size if passage does not', function () {
      const fr = FileReader.read('test/HTMLParser/missingSize.html');
      const tp = HTMLParser.parse(fr);
      expect(Object.prototype.hasOwnProperty.call(tp.start.metadata, 'size')).toBe(false);
    });

    test('Should have empty String as name', function () {
      const fr = FileReader.read('test/HTMLParser/missingPassageName.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.start.name).toBe('');
    });

    test('Should have empty array as tags if tags is missing', function () {
      const fr = FileReader.read('test/HTMLParser/missingPassageTags.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.start.tags).toHaveLength(0);
    });

    test('Should have zero PID if missing', function () {
      const fr = FileReader.read('test/HTMLParser/missingPID.html');
      const tp = HTMLParser.parse(fr);
      // Start will probably be null
      expect(tp.start).toBe(null);
    });

    test('Should have null if style element is missing', function () {
      const fr = FileReader.read('test/HTMLParser/missingStyle.html');
      const tp = HTMLParser.parse(fr);
      // Will not be stylesheet passage
      expect(tp.stylesheetPassage).toBe(null);
    });

    test('Should have null if script element is missing', function () {
      const fr = FileReader.read('test/HTMLParser/missingScript.html');
      const tp = HTMLParser.parse(fr);
      // Will not be script passage
      expect(tp.scriptPassage).toBe(null);
    });
  });

  describe('#escapeMetacharacters()', function () {
    test('Should escape metacharacters', function () {
      /* eslint no-useless-escape: "off" */
      expect(HTMLParser.escapeMetacharacters('\\\{\\\}\\\[\\\]\\\\')).toBe('\\\\{\\\\}\\\\[\\\\]\\\\');
    });
  });
});
