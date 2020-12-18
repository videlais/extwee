const FileReader = require('../src/FileReader.js');
const HTMLParser = require('../src/HTMLParser.js');

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

    test('Should find startnode with no explicit Start passage', function () {
      const fr = FileReader.read('test/HTMLParser/Example1.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.passages).toHaveLength(3);
    });
  });

  describe('#escapeMetacharacters()', function () {
    test('Should escape metacharacters', function () {
      /* eslint no-useless-escape: "off" */
      expect(HTMLParser.escapeMetacharacters('\\\{\\\}\\\[\\\]\\\\')).toBe('\\\\{\\\\}\\\\[\\\\]\\\\');
    });
  });
});
