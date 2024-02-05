import { readFileSync } from 'node:fs';
import { parse as parseTwine2HTML } from '../../src/Twine2HTML/parse.js';

// Pull the name and version of this project from package.json.
// These are used as the 'creator' and 'creator-version'.
const { version } = JSON.parse(readFileSync('package.json', 'utf-8'));

describe('Twine2HTMLParser', () => {
  describe('Errors', () => {
    it('Should throw error if content is not a string', () => {
      expect(() => { parseTwine2HTML({}); }).toThrow();
    });

    it('Should throw error if content is not Twine-2 style HTML', () => {
      expect(() => { parseTwine2HTML(''); }).toThrow();
    });
  });

  describe('#parse()', () => {
    it('Should be able to parse Twine 2 HTML for story name', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/twineExample.html', 'utf-8');
      const story = parseTwine2HTML(fr);
      expect(story.name).toBe('twineExample');
    });

    it('Should be able to parse Twine 2 HTML for correct number of passages', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/twineExample.html', 'utf-8');
      const tp = parseTwine2HTML(fr);
      expect(tp.size()).toBe(5);
    });

    it('Should be able to correctly parse passage tags', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/Tags.html', 'utf-8');
      const story = parseTwine2HTML(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(p.tags).toHaveLength(2);
    });

    it('Should have Extwee for creator when missing', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/missingCreator.html', 'utf-8');
      const tp = parseTwine2HTML(fr);
      expect(tp.creator).toBe('extwee');
    });

    it('Should have correct for creatorVersion when missing', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/missingCreatorVersion.html', 'utf-8');
      const tp = parseTwine2HTML(fr);
      expect(tp.creatorVersion).toBe(version);
    });

    it('Should have empty string as format when missing', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/missingFormat.html', 'utf-8');
      const tp = parseTwine2HTML(fr);
      expect(tp.format).toBe('');
    });

    it('Should have empty string as formatVersion when missing', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/missingFormatVersion.html', 'utf-8');
      const tp = parseTwine2HTML(fr);
      expect(tp.formatVersion).toBe('');
    });

    it('Should have empty string as zoom when missing', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/missingZoom.html', 'utf-8');
      const tp = parseTwine2HTML(fr);
      expect(tp.zoom).toBe(1);
    });

    it('Should not have position if passage does not', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/missingPosition.html', 'utf-8');
      const story = parseTwine2HTML(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(Object.prototype.hasOwnProperty.call(p.metadata, 'position')).toBe(false);
    });

    it('Should not have size if passage does not', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/missingSize.html', 'utf-8');
      const story = parseTwine2HTML(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(Object.prototype.hasOwnProperty.call(p.metadata, 'size')).toBe(false);
    });

    it('Should have empty array as tags if tags is missing', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/missingPassageTags.html', 'utf-8');
      const story = parseTwine2HTML(fr);
      const p = story.getPassageByName('Untitled Passage');
      expect(p.tags).toHaveLength(0);
    });

    it('Should not have stylesheet tag if no passages exist with it', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/missingStyle.html', 'utf-8');
      const story = parseTwine2HTML(fr);
      const passages = story.getPassagesByTag('stylesheet');
      expect(passages.length).toBe(0);
    });

    it('Should not have script tag if no passages exist with it', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/missingScript.html', 'utf-8');
      const story = parseTwine2HTML(fr);
      const passages = story.getPassagesByTag('script');
      expect(passages.length).toBe(0);
    });

    it('Should have script and style tags normally', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/Example1.html', 'utf-8');
      const story = parseTwine2HTML(fr);
      const scriptPassages = story.getPassagesByTag('script');
      const stylesheetPassages = story.getPassagesByTag('stylesheet');
      expect(scriptPassages.length).toBe(1);
      expect(stylesheetPassages.length).toBe(1);
    });

    it('Should parse HTML without passage start node', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/missingStartnode.html', 'utf-8');
      const story = parseTwine2HTML(fr);
      expect(story.start).toBe('');
    });

    it('Should parse tag colors', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/tagColors.html', 'utf-8');
      const story = parseTwine2HTML(fr);
      // Test for tag colors
      const tagColors = story.tagColors;
      expect(tagColors.a).toBe('red');
    });

    it('Do not update name and color if those attributes do not exist', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/lyingTagColors.html', 'utf-8');
      const story = parseTwine2HTML(fr);
      const tagColorProperties = Object.keys(story.tagColors).length;
      expect(tagColorProperties).toBe(0);
    });
  });

  describe('Unescaping', () => {
    it('Should unescape HTML metacharacters for passage searching', () => {
      const fr = readFileSync('test/Twine2HTML/Twine2HTMLParser/unescaping.html', 'utf-8');
      const story = parseTwine2HTML(fr);
      expect(story.getPassageByName('"Test"').text).toBe('Success');
    });
  });

  describe('Warnings', () => {
    beforeEach(() => {
      // Mock console.warn.
      jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      // Restore all mocks.
      jest.restoreAllMocks();
    });

    it('Should generate a warning if name attribute is missing from tw-storydata', () => {
      const s = '<tw-storydata ifid=\'E70FC479-01D9-4E44-AC6A-AFF9F5E1C475\'></tw-storydata>';
      parseTwine2HTML(s);
      expect(console.warn).toHaveBeenCalledWith('Warning: The name attribute is missing from tw-storydata!');
    });

    it('Should generate a warning if ifid attribute is missing from tw-storydata', () => {
      const s = '<tw-storydata name=\'Test\'></tw-storydata>';
      parseTwine2HTML(s);
      expect(console.warn).toHaveBeenCalledWith('Warning: The ifid attribute is missing from tw-storydata!');
    });

    it('Should generate a warning if ifid on tw-storydata is malformed', () => {
      const s = '<tw-storydata ifid=\'1234\'></tw-storydata>';
      parseTwine2HTML(s);
      expect(console.warn).toHaveBeenCalledWith('Warning: The IFID is not in valid UUIDv4 formatting on tw-storydata!');
    });

    it('Should generate warning if passage name is missing', () => {
      const fr = `<tw-storydata name="Tags" startnode="1" creator="Twine" creator-version="2.3.9" ifid="1A6023FC-F68A-4E55-BE9A-5EDFDB7879E6" zoom="1" format="Harlowe" format-version="3.1.0" options="" hidden>
      <style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"></style>
      <script role="script" id="twine-user-script" type="text/twine-javascript"></script>
      <tw-passagedata pid="1" tags="this-one another-one-like-this" position="200,99" size="100,100">Double-click this passage to edit it.</tw-passagedata>
  </tw-storydata>`;
      parseTwine2HTML(fr);
      expect(console.warn).toHaveBeenCalledWith('Warning: name attribute is missing! Default passage name will be used.');
    });

    it('Should generate error if passage PID is missing', () => {
      const fr = `<tw-storydata name="Tags" startnode="1" creator="Twine" creator-version="2.3.9" ifid="1A6023FC-F68A-4E55-BE9A-5EDFDB7879E6" zoom="1" format="Harlowe" format-version="3.1.0" options="" hidden>
      <style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"></style>
      <script role="script" id="twine-user-script" type="text/twine-javascript"></script>
      <tw-passagedata name="Untitled Passage" tags="this-one another-one-like-this" position="200,99" size="100,100">Double-click this passage to edit it.</tw-passagedata>
  </tw-storydata>`;
      parseTwine2HTML(fr);
      expect(console.warn).toHaveBeenCalledWith('Warning: pid attribute is missing! Default PID will be used.');
    });
  });
});
