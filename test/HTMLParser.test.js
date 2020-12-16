const FileReader = require('../src/FileReader.js');
const HTMLParser = require('../src/HTMLParser.js');

describe('HTMLParser', function () {
  describe('#parse()', function () {
    it('Should throw error if content is not Twine-2 style HTML', function () {
      expect(() => { HTMLParser.parse(''); }).toThrow();
    });

    it('Should be able to parse Twine 2 HTML for story name', function () {
      const fr = FileReader.read('test/HTMLParser/twineExample.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.name).toBe('twineExample');
    });
  });

  describe('#escapeMetacharacters()', function () {
    it('Should escape metacharacters', function () {
      /* eslint no-useless-escape: "off" */
      expect(HTMLParser.escapeMetacharacters('\\\{\\\}\\\[\\\]\\\\')).toBe('\\\\{\\\\}\\\\[\\\\]\\\\');
    });
  });
});
