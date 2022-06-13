import FileReader from '../src/FileReader.js';
import HTMLParser from '../src/HTMLParser.js';

// Pull the name and version of this project from package.json.
// These are used as the 'creator' and 'creator-version'.
const { version } = JSON.parse(FileReader.read('package.json'));

describe('HTMLParser', () => {
  describe('#parse()', () => {
    it('Should throw error if content is not Twine-2 style HTML', () => {
      expect(() => { HTMLParser.parse(''); }).toThrow();
    });

    it('Should be able to parse Twine 2 HTML for story name', () => {
      const fr = FileReader.read('test/HTMLParser/twineExample.html');
      const story = HTMLParser.parse(fr);
      const storyTitle = story.getPassageByName('StoryTitle');
      expect(storyTitle.text).toBe('twineExample');
    });

    it('Should be able to parse Twine 2 HTML for correct number of passages', () => {
      const fr = FileReader.read('test/HTMLParser/twineExample.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.size()).toBe(5);
    });

    it('Should be able to correctly parse passage tags', () => {
      const fr = FileReader.read('test/HTMLParser/Tags.html');
      const story = HTMLParser.parse(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(p.tags).toHaveLength(2);
    });

    it('Should set a missing name to Untitled', () => {
      const fr = FileReader.read('test/HTMLParser/missingName.html');
      const story = HTMLParser.parse(fr);
      const p = story.getPassageByName('StoryTitle');
      expect(p.text).toBe('Untitled');
    });

    it('Should set a missing IFID to an empty string', () => {
      const fr = FileReader.read('test/HTMLParser/missingIFID.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.IFID).toBe('');
    });

    it('Should have Extwee for creator when missing', () => {
      const fr = FileReader.read('test/HTMLParser/missingCreator.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.creator).toBe('extwee');
    });

    it('Should have correct for creatorVersion when missing', () => {
      const fr = FileReader.read('test/HTMLParser/missingCreatorVersion.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.creatorVersion).toBe(version);
    });

    it('Should have empty string as format when missing', () => {
      const fr = FileReader.read('test/HTMLParser/missingFormat.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.format).toBe('');
    });

    it('Should have empty string as formatVersion when missing', () => {
      const fr = FileReader.read('test/HTMLParser/missingFormatVersion.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.formatVersion).toBe('');
    });

    it('Should have empty string as zoom when missing', () => {
      const fr = FileReader.read('test/HTMLParser/missingZoom.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.zoom).toBe(0);
    });

    it('Should not have position if passage does not', () => {
      const fr = FileReader.read('test/HTMLParser/missingPosition.html');
      const story = HTMLParser.parse(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(Object.prototype.hasOwnProperty.call(p.metadata, 'position')).toBe(false);
    });

    it('Should not have size if passage does not', () => {
      const fr = FileReader.read('test/HTMLParser/missingSize.html');
      const story = HTMLParser.parse(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(Object.prototype.hasOwnProperty.call(p.metadata, 'size')).toBe(false);
    });

    it('Should have empty array as tags if tags is missing', () => {
      const fr = FileReader.read('test/HTMLParser/missingPassageTags.html');
      const story = HTMLParser.parse(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(p.tags).toHaveLength(0);
    });

    it('Should not have stylesheet tag if no passages exist with it', () => {
      const fr = FileReader.read('test/HTMLParser/missingStyle.html');
      const story = HTMLParser.parse(fr);
      const passages = story.getPassagesByTag('stylesheet');
      expect(passages.length).toBe(0);
    });

    it('Should not have script tag if no passages exist with it', () => {
      const fr = FileReader.read('test/HTMLParser/missingScript.html');
      const story = HTMLParser.parse(fr);
      const passages = story.getPassagesByTag('script');
      expect(passages.length).toBe(0);
    });

    it('Should have script and style tags normally', () => {
      const fr = FileReader.read('test/HTMLParser/Example1.html');
      const story = HTMLParser.parse(fr);
      const scriptPassages = story.getPassagesByTag('script');
      const stylesheetPassages = story.getPassagesByTag('stylesheet');
      expect(scriptPassages.length).toBe(1);
      expect(stylesheetPassages.length).toBe(1);
    });

    it('Should not have start property if startNode does not exist when parsed', () => {
      const fr = FileReader.read('test/HTMLParser/missingStartnode.html');
      const story = HTMLParser.parse(fr);
      expect(story.start).toBe('');
    });

    it('Should not add passages without names', () => {
      const fr = FileReader.read('test/HTMLParser/missingPassageName.html');
      const story = HTMLParser.parse(fr);
      // There is only one passage, StoryTitle
      expect(story.size()).toBe(0);
    });

    it('Should not add passages without PID', () => {
      const fr = FileReader.read('test/HTMLParser/missingPID.html');
      const story = HTMLParser.parse(fr);
      // There is only one passage, StoryTitle
      expect(story.size()).toBe(0);
    });

    it('Parse tag colors', () => {
      const fr = FileReader.read('test/HTMLParser/tagColors.html');
      const story = HTMLParser.parse(fr);
      // Test for tag colors
      const tagColors = story.tagColors;
      expect(tagColors.a).toBe('red');
    });

    it('Will not set start if startnode is missing', () => {
      const fr = FileReader.read('test/HTMLParser/missingStartnode.html');
      const story = HTMLParser.parse(fr);
      // Test for default start
      expect(story.start).toBe('');
    });

    it('Throw error when startnode has PID that does not exist', () => {
      const fr = FileReader.read('test/HTMLParser/lyingStartnode.html');
      expect(() => {
        HTMLParser.parse(fr);
      }).toThrow();
    });

    it('Do not update name and color if those attributes do not exist', () => {
      const fr = FileReader.read('test/HTMLParser/lyingTagColors.html');
      const story = HTMLParser.parse(fr);
      const tagColorProperties = Object.keys(story.tagColors).length;
      expect(tagColorProperties).toBe(0);
    });
  });

  describe('#escapeMetacharacters()', () => {
    it('Should escape metacharacters', () => {
      /* eslint no-useless-escape: "off" */
      expect(HTMLParser.escapeMetacharacters('\\\{\\\}\\\[\\\]\\\\')).toBe('\\\\{\\\\}\\\\[\\\\]\\\\');
    });
  });
});
