import { Story, creatorName, creatorVersion } from '../../src/Story.js';
import Passage from '../../src/Passage.js';
import { parse as parseTwee } from '../../src/Twee/parse.js';
import { readFileSync } from 'node:fs';
import { parse as HTMLParser } from 'node-html-parser';
import { generate as generateIFID } from '../../src/IFID/generate.js';

// Pull the name and version of this project from package.json.
// These are used as the 'creator' and 'creator-version'.
const { name, version } = JSON.parse(readFileSync('package.json'));

describe('Story', () => {
  describe('constructor()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Should have extwee name', () => {
      expect(s.creator).toBe(name);
    });

    it('Should have extwee version', () => {
      expect(s.creatorVersion).toBe(version);
    });

    it('Should have name', () => {
      s = new Story('Test');
      expect(s.name).toBe('Test');
    });

    it('Should have default name', () => {
      s = new Story();
      expect(s.name).toBe('Untitled Story');
    });
  });

  describe('creator', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set using String', () => {
      s.creator = 'New';
      expect(s.creator).toBe('New');
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.creator = 1;
      }).toThrow();
    });
  });

  describe('creatorVersion', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set using String', () => {
      s.creatorVersion = 'New';
      expect(s.creatorVersion).toBe('New');
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.creatorVersion = 1;
      }).toThrow();
    });
  });

  describe('IFID', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set using String', () => {
      s.IFID = 'New';
      expect(s.IFID).toBe('New');
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.IFID = 1;
      }).toThrow();
    });
  });

  describe('format', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set using String', () => {
      s.format = 'New';
      expect(s.format).toBe('New');
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.format = 1;
      }).toThrow();
    });
  });

  describe('formatVersion', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set using String', () => {
      s.formatVersion = '1.1.1';
      expect(s.formatVersion).toBe('1.1.1');
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.formatVersion = 1;
      }).toThrow();
    });
  });

  describe('name', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set using String', () => {
      s.name = 'New';
      expect(s.name).toBe('New');
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.name = 1;
      }).toThrow();
    });
  });

  describe('zoom', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set using Number', () => {
      s.zoom = 1.0;
      expect(s.zoom).not.toBe(0);
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.zoom = null;
      }).toThrow();
    });
  });

  describe('metadata', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set metadata', () => {
      s.metadata = {};
      expect(s.metadata).not.toBe(null);
    });

    it('Should throw error if not object', () => {
      expect(() => {
        s.metadata = 1;
      }).toThrow();
    });
  });

  describe('start', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set start', () => {
      s.start = 'Start';
      expect(s.start).not.toBe('');
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.start = 1;
      }).toThrow();
    });
  });

  describe('tagColors', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set tagColors', () => {
      s.tagColors = {
        bar: 'green'
      };
      const count = Object.keys(s.tagColors).length;
      expect(count).toBe(1);
    });

    it('Should throw error if not object', () => {
      expect(() => {
        s.tagColors = null;
      }).toThrow();
    });
  });

  describe('passages', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set passages to a new array containing at least one Passage', () => {
      s.passages = [new Passage()];
      expect(s.passages.length).toBe(1);
    });

    it('Should throw error if trying to set to a non-Array type', () => {
      expect(() => {
        s.passages = null;
      }).toThrow();
    });

    it('Should throw error if trying to set to an array containing non-Passage types', () => {
      expect(() => {
        s.passages = [null];
      }).toThrow();
    });
  });

  describe('addPassage()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('addPassage() - should increase size', () => {
      const p = new Passage();
      s.addPassage(p);
      expect(s.size()).toBe(1);
    });

    it('addPassage() - should throw error if non-Passage', () => {
      expect(() => {
        s.addPassage(null);
      }).toThrow();
    });

    it('addPassage() - should override StoryData: ifid', function () {
      // Generate object.
      const o = {
        ifid: 'D674C58C-DEFA-4F70-B7A2-27742230C0FC'
      };

      // Add the passage.
      s.addPassage(new Passage('StoryData', JSON.stringify(o)));

      // Test for IFID.
      expect(s.IFID).toBe('D674C58C-DEFA-4F70-B7A2-27742230C0FC');
    });

    it('addPassage() - should override StoryData: format', function () {
      // Generate object.
      const o = {
        format: 'SugarCube'
      };

      // Add the passage.
      s.addPassage(new Passage('StoryData', JSON.stringify(o)));

      // Test for format.
      expect(s.format).toBe('SugarCube');
    });

    it('addPassage() - should override StoryData: formatVersion', function () {
      // Generate object.
      const o = {
        'format-version': '2.28.2'
      };

      // Add the passage.
      s.addPassage(new Passage('StoryData', JSON.stringify(o)));

      // Test for format.
      expect(s.formatVersion).toBe('2.28.2');
    });
  });

  describe('removePassageByName()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('removePassageByName() - should decrease size', () => {
      s.addPassage(new Passage('Find'));
      s.addPassage(new Passage('Find2'));
      s.removePassageByName('Find');
      expect(s.size()).toBe(1);
    });
  });

  describe('getPassagesByTag()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('getPassagesByTag() - should find passages', () => {
      const p = new Passage('Find', '', ['one']);
      const p2 = new Passage('Find2', '', ['one']);
      s.addPassage(p);
      s.addPassage(p2);
      const ps = s.getPassagesByTag('one');
      expect(ps).toHaveLength(2);
    });

    it('getPassagesByTag() - should find none if none in collection', () => {
      const ps = s.getPassagesByTag('one');
      expect(ps).toHaveLength(0);
    });

    it('getPassagesByTag() - should find none if no tags match search', () => {
      const p = new Passage('Find', '', ['one']);
      const p2 = new Passage('Find2', '', ['one']);
      s.addPassage(p);
      s.addPassage(p2);
      const ps = s.getPassagesByTag('two');
      expect(ps).toHaveLength(0);
    });
  });

  describe('getPassageByName()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('getPassageByName() - should get passage by name', () => {
      const p = new Passage('Find');
      s.addPassage(p);
      const passage = s.getPassageByName('Find');
      expect(passage.name).toBe('Find');
    });
  });

  describe('size()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('size() - should report number of passages', () => {
      // Create a Passage
      const p = new Passage('');
      // Test initial size
      expect(s.size()).toBe(0);
      // Add a passage
      s.addPassage(p);
      // Test size after adding one
      expect(s.size()).toBe(1);
    });
  });

  describe('toJSON()', function () {
    it('Should have default Story values', function () {
      // Create a new Story.
      const s = new Story();
      // Convert to string and then back to object.
      const result = JSON.parse(s.toJSON());
      expect(result.name).toBe('Untitled Story');
      expect(Object.keys(result.tagColors).length).toBe(0);
      expect(result.ifid).toBe('');
      expect(result.start).toBe('');
      expect(result.formatVersion).toBe('');
      expect(result.format).toBe('');
      expect(result.creator).toBe(creatorName);
      expect(result.creatorVersion).toBe(creatorVersion);
      expect(result.zoom).toBe(1);
      expect(Object.keys(result.metadata).length).toBe(0);
    });

    it('Should have passage data', function () {
      // Create default Story.
      const s = new Story();
      // Add a passage.
      s.addPassage(new Passage('Example', 'Test'));
      // Convert to JSON and then back to object.
      const result = JSON.parse(s.toJSON());
      // Should have a single passage.
      expect(result.passages.length).toBe(1);
    });
  });

  describe('toTwee()', function () {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Should not generate format if empty', function () {
      // Add one passage.
      s.addPassage(new Passage('Start', 'Content'));

      // Add an IFID (to prevent warning)
      s.IFID = generateIFID();

      // Set format to empty string.
      s.format = '';

      // Convert to Twee.
      const t = s.toTwee();

      // Test for format in metadata, should not exist.
      expect(t.includes('"\'format":')).not.toBe(true);
    });

    it('Should not generate formatVersion if empty', function () {
      // Add one passage.
      s.addPassage(new Passage('Start', 'Content'));

      // Add an IFID (to prevent warning)
      s.IFID = generateIFID();

      // Set formatVersion to empty string.
      s.formatVersion = '';

      // Convert to Twee.
      const t = s.toTwee();

      // Test for formatVersion in metadata, should not exist.
      expect(t.includes('"\'format-version":')).not.toBe(true);
    });

    it('Should not generate zoom if zero', function () {
      // Add one passage.
      s.addPassage(new Passage('Start', 'Content'));

      // Add an IFID (to prevent warning)
      s.IFID = generateIFID();

      // Set zoom to 0.
      s.zoom = 0;

      // Convert to Twee.
      const t = s.toTwee();

      // Test for zoom in metadata, should not exist.
      expect(t.includes('"\'zoom":')).not.toBe(true);
    });

    it('Should not generate start if empty', function () {
      // Add one passage.
      s.addPassage(new Passage('Start', 'Content'));

      // Add an IFID (to prevent warning)
      s.IFID = generateIFID();

      // Set start to empty string.
      s.start = '';

      // Convert to Twee.
      const t = s.toTwee();

      // Test for start in metadata, should not exist.
      expect(t.includes('"\'start":')).not.toBe(true);
    });

    it('Should detect StoryTitle text', function () {
      // Add one passage.
      s.addPassage(new Passage('StoryTitle', 'Content'));

      // Add an IFID (to prevent warning)
      s.IFID = generateIFID();

      // Convert to Twee.
      const t = s.toTwee();

      // Parse into a new story.
      const story = parseTwee(t);

      // Test for name.
      expect(story.name).toBe('Content');
    });

    it('Should encode IFID', () => {
      // Add passages.
      s.addPassage(new Passage('Start'));
      s.addPassage(new Passage('StoryTitle', 'Title'));

      // Set an ifid property.
      s.IFID = 'DE7DF8AD-E4CD-499E-A4E7-C5B98B73449A';

      // Convert to Twee.
      const t = s.toTwee();

      // Parse file.
      const tp = parseTwee(t);

      // Verify IFID.
      expect(tp.IFID).toBe('DE7DF8AD-E4CD-499E-A4E7-C5B98B73449A');
    });

    it('Should encode format, formatVersion, zoom, and start', () => {
      // Add passages.
      s.addPassage(new Passage('Start', 'Content'));
      s.addPassage(new Passage('Untitled', 'Some stuff'));

      s.name = 'Title';
      s.format = 'Test';
      s.formatVersion = '1.2.3';
      s.zoom = 1;
      s.start = 'Untitled';
      s.IFID = 'DE7DF8AD-E4CD-499E-A4E7-C5B98B73449A';

      // Convert to Twee.
      const t = s.toTwee();

      // Parse Twee.
      const story2 = parseTwee(t);

      // Test for format, formatVersion, zoom, and start.
      expect(story2.formatVersion).toBe('1.2.3');
      expect(story2.format).toBe('Test');
      expect(story2.zoom).toBe(1);
      expect(story2.start).toBe('Untitled');
      expect(story2.IFID).toBe('DE7DF8AD-E4CD-499E-A4E7-C5B98B73449A');
    });

    it('Should write tag colors', () => {
      // Add some passages.
      s.addPassage(new Passage('Start', 'Content'));
      s.addPassage(new Passage('Untitled', 'Some stuff'));

      s.IFID = 'DE7DF8AD-E4CD-499E-A4E7-C5B98B73449A';

      // Add tag colors.
      s.tagColors = {
        bar: 'green',
        foo: 'red',
        qaz: 'blue'
      };

      // Convert to Twee.
      const t = s.toTwee();

      // Convert back into Story.
      const story2 = parseTwee(t);

      // Test for tag colors
      expect(story2.tagColors.bar).toBe('green');
      expect(story2.tagColors.foo).toBe('red');
      expect(story2.tagColors.qaz).toBe('blue');
    });

    it('Should encode "script" tag', () => {
      // Add passages.
      s.addPassage(new Passage('Test', 'Test', ['script']));
      s.addPassage(new Passage('Start', 'Content'));

      // Set IFID.
      s.IFID = 'DE7DF8AD-E4CD-499E-A4E7-C5B98B73449A';

      // Convert into Twee.
      const t = s.toTwee();

      // Convert back into Story.
      const story = parseTwee(t);

      // Search for 'script'.
      const p = story.getPassagesByTag('script');

      // Test for passage text.
      expect(p[0].text).toBe('Test');
    });

    it('Should encode "stylesheet" tag', () => {
      // Add passages.
      s.addPassage(new Passage('Test', 'Test', ['stylesheet']));
      s.addPassage(new Passage('Start', 'Content'));

      // Set IFID.
      s.IFID = 'DE7DF8AD-E4CD-499E-A4E7-C5B98B73449A';

      // Convert into Twee.
      const t = s.toTwee();

      // Convert back into Story.
      const story = parseTwee(t);

      // Search for 'stylesheet'.
      const p = story.getPassagesByTag('stylesheet');

      // Test for passage text.
      expect(p[0].text).toBe('Test');
    });
  });

  describe('toTwine2HTML()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Should encode name', () => {
      // Add passage.
      s.addPassage(new Passage('Start', 'Word'));
      // Set start.
      s.start = 'Start';
      // Set name.
      s.name = 'Test';
      // Create HTML.
      const result = s.toTwine2HTML();
      // Expect the name to be encoded.
      expect(result.includes('<tw-storydata name="Test"')).toBe(true);
    });

    it('Should encode IFID', () => {
      // Add passage.
      s.addPassage(new Passage('Start', 'Word'));
      // Set start.
      s.start = 'Start';
      // Set IFID.
      s.IFID = 'B94AC8AD-03E3-4496-96C8-FE958645FE61';
      // Create HTML.
      const result = s.toTwine2HTML();
      // Expect the IFID to be encoded.
      expect(result.includes('ifid="B94AC8AD-03E3-4496-96C8-FE958645FE61"')).toBe(true);
    });

    it('Should encode stylesheet passages', () => {
      // Add passage.
      s.addPassage(new Passage('Start', 'Word'));
      // Set start.
      s.start = 'Start';
      // Add a stylesheet passage.
      s.addPassage(new Passage('Test', 'Word', ['stylesheet']));
      // Create HTML.
      const result = s.toTwine2HTML();
      // Expect the stylesheet passage text to be encoded.
      expect(result.includes('<style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css">Word')).toBe(true);
    });

    it('Should encode script passages', () => {
      // Add passage.
      s.addPassage(new Passage('Start', 'Word'));
      // Set start.
      s.start = 'Start';
      // Add a script passage.
      s.addPassage(new Passage('Test', 'Word', ['script']));
      // Create HTML.
      const result = s.toTwine2HTML();
      // Expect the script passage text to be encoded.
      expect(result.includes('<script role="script" id="twine-user-script" type="text/twine-javascript">Word')).toBe(true);
    });

    it('Should encode format', () => {
      // Add passage.
      s.addPassage(new Passage('Start', 'Word'));
      // Set start.
      s.start = 'Start';
      // Set format.
      s.format = 'Harlowe';
      // Create HTML.
      const result = s.toTwine2HTML();
      // Expect the format to be encoded.
      expect(result.includes('format="Harlowe"')).toBe(true);
    });

    it('Should encode formatVersion', () => {
      // Add passage.
      s.addPassage(new Passage('Start', 'Word'));
      // Set start.
      s.start = 'Start';
      // Set formatVersion.
      s.formatVersion = '3.2.0';
      // Create HTML.
      const result = s.toTwine2HTML();
      // Expect the formatVersion to be encoded.
      expect(result.includes('format-version="3.2.0"')).toBe(true);
    });

    it('Should encode zoom', () => {
      // Add passage.
      s.addPassage(new Passage('Start', 'Word'));
      // Set start.
      s.start = 'Start';
      // Set zoom.
      s.zoom = 2;
      // Create HTML.
      const result = s.toTwine2HTML();
      // Expect the zoom to be encoded.
      expect(result.includes('zoom="2"')).toBe(true);
    });

    it('Should encode start', () => {
      // Add passage.
      s.addPassage(new Passage('Start', 'Word'));
      // Set start.
      s.start = 'Start';
      // Create HTML.
      const result = s.toTwine2HTML();
      // Expect the start to be encoded.
      expect(result.includes('startnode="1"')).toBe(true);
    });

    it('Should encode start if property is not set but Start passage is', () => {
      // Add passage.
      s.addPassage(new Passage('Start', 'Word'));
      // Create HTML.
      const result = s.toTwine2HTML();
      // Expect the start to be encoded.
      expect(result.includes('startnode="1"')).toBe(true);
    });

    it('Should encode creator', () => {
      // Add passage.
      s.addPassage(new Passage('Start', 'Word'));
      // Set start.
      s.start = 'Start';
      // Create HTML.
      const result = s.toTwine2HTML();
      // Expect the creator to be encoded.
      expect(result.includes(`creator="${creatorName}"`)).toBe(true);
    });

    it('Should encode creatorVersion', () => {
      // Add passage.
      s.addPassage(new Passage('Start', 'Word'));
      // Set start.
      s.start = 'Start';
      // Create HTML.
      const result = s.toTwine2HTML();
      // Expect the creatorVersion to be encoded.
      expect(result.includes(`creator-version="${creatorVersion}"`)).toBe(true);
    });

    it('Should not encode creatorVersion if not set', () => {
      // Add passage.
      s.addPassage(new Passage('Start', 'Word'));
      // Set start.
      s.start = 'Start';
      // Set creatorVersion to empty string.
      s.creatorVersion = '';
      // Create HTML.
      const result = s.toTwine2HTML();
      // Expect the creatorVersion to be encoded.
      expect(result.includes(`creator-version="${creatorVersion}"`)).not.toBe(true);
    });

    it('Should not encode creator if not set', () => {
      // Add passage.
      s.addPassage(new Passage('Start', 'Word'));
      // Set start.
      s.start = 'Start';
      // Set creator to empty string.
      s.creator = '';
      // Create HTML.
      const result = s.toTwine2HTML();
      // Expect the creator to be encoded.
      expect(result.includes(`creator="${creatorName}"`)).not.toBe(true);
    });
  });

  describe('toTwine1HTML()', function () {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Should have correct data-size', function () {
      // Add a passage.
      s.addPassage(new Passage('Start', 'Word'));
      // Create Twine 1 HTML.
      const result = s.toTwine1HTML();
      // Expect data-size to be 1.
      expect(result.includes('<div tiddler="Start"')).toBe(true);
    });
  });

  describe('Escaping', function () {
    it('Should produce valid Twine 2 Story HTML', function () {
      // Create a new Story.
      const s = new Story('"Abuse" &test');
      // Add a passage.
      s.addPassage(new Passage('"Test"', 'Word'));
      // Set start.
      s.start = '"Test"';
      // Parse HTML.
      const root = HTMLParser(s.toTwine2HTML());
      // Expect correct name attribute for tw-storydata.
      expect(root.querySelector('tw-storydata').getAttribute('name')).toBe('"Abuse" &test');
      // Expect correct name attribute for tw-passagedata.
      expect(root.querySelector('tw-passagedata').getAttribute('name')).toBe('"Test"');
      // Use Twine 2 result.
      const s2 = '<tw-storydata name="&quot;Abuse&quot; &amp;test" startnode="1" creator="Twine" creator-version="2.8.1" format="Harlowe" format-version="3.3.8" ifid="452A9D80-C759-42C5-B001-5B861A2410C5" options="" tags="" zoom="1" hidden><style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"></style><script role="script" id="twine-user-script" type="text/twine-javascript"></script><tw-passagedata pid="1" name="&quot;Test&quot;" tags="&amp;tag &quot;bad&quot;" position="300,100" size="100,100"></tw-passagedata></tw-storydata>';
      // Parse HTML.
      const root2 = HTMLParser(s2);
      // Expect correct name attribute for tw-storydata.
      expect(root2.querySelector('tw-storydata').getAttribute('name')).toBe('"Abuse" &test');
      // Expect correct name attribute for tw-passagedata.
      expect(root2.querySelector('tw-passagedata').getAttribute('name')).toBe('"Test"');
    });

    it('Should produce valid Twine 1 Story HTML', function () {
      // Create a new Story.
      const s = new Story('"Abuse" &test');
      // Add a passage.
      s.addPassage(new Passage('"Test"', 'Word'));
      // Set start.
      s.start = '"Test"';
      // Parse HTML.
      const root = HTMLParser(s.toTwine1HTML());
      // Expect correct name attribute for div.
      expect(root.querySelector('div').getAttribute('tiddler')).toBe('"Test"');
    });
  });

  describe('Warnings', function () {
    beforeEach(() => {
      // Mock console.warn.
      jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      // Restore all mocks.
      jest.restoreAllMocks();
    });

    it('Should generate warning if a passage with the same name already exists', function () {
      // Create a new Story.
      const s = new Story();
      // Add a passage.
      s.addPassage(new Passage('Test'));
      // Add a passage with the same name.
      s.addPassage(new Passage('Test'));
      // Expect warning.
      expect(console.warn).toHaveBeenCalledWith('Warning: A passage with the name "Test" already exists!');
    });

    it('Should generate a warning if story IFID is not in the correct format', function () {
      // Create a new Story.
      const s = new Story();
      // Set IFID.
      s.IFID = 'Test';
      // Create Twee
      s.toTwee();
      // Expect warning.
      expect(console.warn).toHaveBeenCalledWith('Warning: IFID is not in UUIDv4 format! A new IFID was generated.');
    });
  });
});
