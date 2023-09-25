import FileReader from '../src/FileReader.js';
import Twine2HTMLParser from '../src/Twine2HTMLParser.js';

// Pull the name and version of this project from package.json.
// These are used as the 'creator' and 'creator-version'.
const { version } = JSON.parse(FileReader.read('package.json'));

describe('Twine2HTMLParser', () => {
  describe('#parse()', () => {
    it('Should throw error if content is not Twine-2 style HTML', () => {
      expect(() => { Twine2HTMLParser.parse(''); }).toThrow();
    });

    it('Should be able to parse Twine 2 HTML for story name', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/twineExample.html');
      const story = Twine2HTMLParser.parse(fr);
      expect(story.name).toBe('twineExample');
    });

    it('Should be able to parse Twine 2 HTML for correct number of passages', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/twineExample.html');
      const tp = Twine2HTMLParser.parse(fr);
      expect(tp.size()).toBe(5);
    });

    it('Should be able to correctly parse passage tags', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/Tags.html');
      const story = Twine2HTMLParser.parse(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(p.tags).toHaveLength(2);
    });

    it('Should have default name', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingName.html');
      const story = Twine2HTMLParser.parse(fr);
      expect(story.name).toBe('');
    });

    it('Should set a missing IFID to an empty string', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingIFID.html');
      const tp = Twine2HTMLParser.parse(fr);
      expect(tp.IFID).toBe('');
    });

    it('Should have Extwee for creator when missing', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingCreator.html');
      const tp = Twine2HTMLParser.parse(fr);
      expect(tp.creator).toBe('extwee');
    });

    it('Should have correct for creatorVersion when missing', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingCreatorVersion.html');
      const tp = Twine2HTMLParser.parse(fr);
      expect(tp.creatorVersion).toBe(version);
    });

    it('Should have empty string as format when missing', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingFormat.html');
      const tp = Twine2HTMLParser.parse(fr);
      expect(tp.format).toBe('');
    });

    it('Should have empty string as formatVersion when missing', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingFormatVersion.html');
      const tp = Twine2HTMLParser.parse(fr);
      expect(tp.formatVersion).toBe('');
    });

    it('Should have empty string as zoom when missing', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingZoom.html');
      const tp = Twine2HTMLParser.parse(fr);
      expect(tp.zoom).toBe(0);
    });

    it('Should not have position if passage does not', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingPosition.html');
      const story = Twine2HTMLParser.parse(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(Object.prototype.hasOwnProperty.call(p.metadata, 'position')).toBe(false);
    });

    it('Should not have size if passage does not', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingSize.html');
      const story = Twine2HTMLParser.parse(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(Object.prototype.hasOwnProperty.call(p.metadata, 'size')).toBe(false);
    });

    it('Should have empty array as tags if tags is missing', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingPassageTags.html');
      const story = Twine2HTMLParser.parse(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(p.tags).toHaveLength(0);
    });

    it('Should not have stylesheet tag if no passages exist with it', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingStyle.html');
      const story = Twine2HTMLParser.parse(fr);
      const passages = story.getPassagesByTag('stylesheet');
      expect(passages.length).toBe(0);
    });

    it('Should not have script tag if no passages exist with it', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingScript.html');
      const story = Twine2HTMLParser.parse(fr);
      const passages = story.getPassagesByTag('script');
      expect(passages.length).toBe(0);
    });

    it('Should have script and style tags normally', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/Example1.html');
      const story = Twine2HTMLParser.parse(fr);
      const scriptPassages = story.getPassagesByTag('script');
      const stylesheetPassages = story.getPassagesByTag('stylesheet');
      expect(scriptPassages.length).toBe(1);
      expect(stylesheetPassages.length).toBe(1);
    });

    it('Should throw error if startNode is missing', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingStartnode.html');
      expect(() => { Twine2HTMLParser.parse(fr); }).toThrow();
    });

    it('Should throw error if passage name is missing', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingPassageName.html');
      expect(() => { Twine2HTMLParser.parse(fr); }).toThrow();
    });

    it('Should throw error without PID', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingPID.html');
      expect(() => { Twine2HTMLParser.parse(fr); }).toThrow();
    });

    it('Should parse tag colors', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/tagColors.html');
      const story = Twine2HTMLParser.parse(fr);
      // Test for tag colors
      const tagColors = story.tagColors;
      expect(tagColors.a).toBe('red');
    });

    it('Should throw error if startnode is missing', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/missingStartnode.html');
      expect(() => { Twine2HTMLParser.parse(fr); }).toThrow();
    });

    it('Should throw error when startnode has PID that does not exist', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/lyingStartnode.html');
      expect(() => {
        Twine2HTMLParser.parse(fr);
      }).toThrow();
    });

    it('Do not update name and color if those attributes do not exist', () => {
      const fr = FileReader.read('test/Twine2HTMLParser/lyingTagColors.html');
      const story = Twine2HTMLParser.parse(fr);
      const tagColorProperties = Object.keys(story.tagColors).length;
      expect(tagColorProperties).toBe(0);
    });
  });

  describe('#escapeMetacharacters()', () => {
    it('Should escape metacharacters', () => {
      /* eslint no-useless-escape: "off" */
      expect(Twine2HTMLParser.escapeMetacharacters('\\\{\\\}\\\[\\\]\\\\')).toBe('\\\\{\\\\}\\\\[\\\\]\\\\');
    });
  });
});
