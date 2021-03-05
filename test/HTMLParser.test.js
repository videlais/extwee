import FileReader from '../src/FileReader.js';
import HTMLParser from '../src/HTMLParser.js';

// Pull the name and version of this project from package.json.
// These are used as the 'creator' and 'creator-version'.
const { version } = JSON.parse(FileReader.read('package.json'));

describe('HTMLParser', function () {
  describe('#parse()', function () {
    test('Should throw error if content is not Twine-2 style HTML', function () {
      expect(() => { HTMLParser.parse(''); }).toThrow();
    });

    test('Should be able to parse Twine 2 HTML for story name', function () {
      const fr = FileReader.read('test/HTMLParser/twineExample.html');
      const story = HTMLParser.parse(fr);
      const storyTitle = story.getPassageByName('StoryTitle');
      expect(storyTitle.text).toBe('twineExample');
    });

    test('Should be able to parse Twine 2 HTML for correct number of passages', function () {
      const fr = FileReader.read('test/HTMLParser/twineExample.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.size()).toBe(6);
    });

    test('Should be able to correctly parse passage tags', function () {
      const fr = FileReader.read('test/HTMLParser/Tags.html');
      const story = HTMLParser.parse(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(p.tags).toHaveLength(2);
    });

    test('Should set a missing name to Untitled', function () {
      const fr = FileReader.read('test/HTMLParser/missingName.html');
      const story = HTMLParser.parse(fr);
      const p = story.getPassageByName('StoryTitle');
      expect(p.text).toBe('Untitled');
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
      expect(tp.creatorVersion).toBe(version);
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
      expect(tp.zoom).toBe(0);
    });

    test('Should not have position if passage does not', function () {
      const fr = FileReader.read('test/HTMLParser/missingPosition.html');
      const story = HTMLParser.parse(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(Object.prototype.hasOwnProperty.call(p.metadata, 'position')).toBe(false);
    });

    test('Should not have size if passage does not', function () {
      const fr = FileReader.read('test/HTMLParser/missingSize.html');
      const story = HTMLParser.parse(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(Object.prototype.hasOwnProperty.call(p.metadata, 'size')).toBe(false);
    });

    test('Should have empty array as tags if tags is missing', function () {
      const fr = FileReader.read('test/HTMLParser/missingPassageTags.html');
      const story = HTMLParser.parse(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(p.tags).toHaveLength(0);
    });

    test('Should not have stylesheet tag if no passages exist with it', function () {
      const fr = FileReader.read('test/HTMLParser/missingStyle.html');
      const story = HTMLParser.parse(fr);
      const passages = story.getPassagesByTag('stylesheet');
      expect(passages.length).toBe(0);
    });

    test('Should not have script tag if no passages exist with it', function () {
      const fr = FileReader.read('test/HTMLParser/missingScript.html');
      const story = HTMLParser.parse(fr);
      const passages = story.getPassagesByTag('script');
      expect(passages.length).toBe(0);
    });

    test('Should have script and style tags normally', function () {
      const fr = FileReader.read('test/HTMLParser/Example1.html');
      const story = HTMLParser.parse(fr);
      const scriptPassages = story.getPassagesByTag('script');
      const stylesheetPassages = story.getPassagesByTag('stylesheet');
      expect(scriptPassages.length).toBe(1);
      expect(stylesheetPassages.length).toBe(1);
    });

    test('Should not have start property if startNode does not exist when parsed', function () {
      const fr = FileReader.read('test/HTMLParser/missingStartnode.html');
      const story = HTMLParser.parse(fr);
      expect(story.start).toBe('');
    });

    test('Should not add passages without names', function () {
      const fr = FileReader.read('test/HTMLParser/missingPassageName.html');
      const story = HTMLParser.parse(fr);
      // There is only one passage, StoryTitle
      expect(story.size()).toBe(1);
    });

    test('Should not add passages without PID', function () {
      const fr = FileReader.read('test/HTMLParser/missingPID.html');
      const story = HTMLParser.parse(fr);
      // There is only one passage, StoryTitle
      expect(story.size()).toBe(1);
    });

    test('Parse tag colors', function () {
      const fr = FileReader.read('test/HTMLParser/tagColors.html');
      const story = HTMLParser.parse(fr);
      // Test for tag colors
      const tagColors = story.tagColors;
      expect(tagColors.a).toBe('red');
    });

    test('Will not set start if startnode is missing', function () {
      const fr = FileReader.read('test/HTMLParser/missingStartnode.html');
      const story = HTMLParser.parse(fr);
      // Test for default start
      expect(story.start).toBe('');
    });

    test('Throw error when startnode has PID that does not exist', function () {
      const fr = FileReader.read('test/HTMLParser/lyingStartnode.html');
      expect(() => {
        HTMLParser.parse(fr);
      }).toThrow();
    });

    test('Do not update name and color if those attributes do not exist', function () {
      const fr = FileReader.read('test/HTMLParser/lyingTagColors.html');
      const story = HTMLParser.parse(fr);
      const tagColorProperties = Object.keys(story.tagColors).length;
      expect(tagColorProperties).toBe(0);
    });
  });

  describe('#escapeMetacharacters()', function () {
    test('Should escape metacharacters', function () {
      /* eslint no-useless-escape: "off" */
      expect(HTMLParser.escapeMetacharacters('\\\{\\\}\\\[\\\]\\\\')).toBe('\\\\{\\\\}\\\\[\\\\]\\\\');
    });
  });
});
