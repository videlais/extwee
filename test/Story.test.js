import Story from '../src/Story.js';
import Passage from '../src/Passage';
import TweeParser from '../src/TweeParser.js';
import { readFileSync } from 'node:fs';

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

    it('addPassage() - should prevent passages with same name being added', () => {
      const p = new Passage('A');
      const p2 = new Passage('A');
      s.addPassage(p);
      s.addPassage(p2);
      expect(s.size()).toBe(1);
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

  describe('forEachPassage()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('forEachPassage() - should return if non-function', () => {
      s.addPassage(new Passage('A'));
      s.addPassage(new Passage('B'));
      let passageNames = '';
      s.forEachPassage((p) => {
        passageNames += p.name;
      });
      expect(passageNames).toBe('AB');
    });

    it('forEachPassage() - should throw error if non-function', () => {
      expect(() => {
        s.forEachPassage(null);
      }).toThrow();
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
      expect(result.name).toBe('');
      expect(Object.keys(result.tagColors).length).toBe(0);
      expect(result.ifid).toBe('');
      expect(result.start).toBe('');
      expect(result.formatVersion).toBe('');
      expect(result.format).toBe('');
      expect(result.creator).toBe('extwee');
      expect(result.creatorVersion).toBe('2.2.0');
      expect(result.zoom).toBe(0);
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

  describe('fromJSON()', function () {
    it('Should throw error if JSON is invalid', function () {
      const s = new Story();
      expect(() => { s.fromJSON('{'); }).toThrow();
    });

    it('Should roundtrip default Story values using toJSON() and fromJSON()', function () {
      // Create Story.
      const s = new Story();
      // Convert to JSON and back.
      s.fromJSON(s.toJSON());
      // Check all properties.
      expect(s.name).toBe('');
      expect(Object.keys(s.tagColors).length).toBe(0);
      expect(s.IFID).toBe('');
      expect(s.start).toBe('');
      expect(s.formatVersion).toBe('');
      expect(s.format).toBe('');
      expect(s.creator).toBe('extwee');
      expect(s.creatorVersion).toBe('2.2.0');
      expect(s.zoom).toBe(0);
      expect(Object.keys(s.metadata).length).toBe(0);
    });

    it('Should parse passage data', function () {
      // Create passage.
      const p = new Passage('Test', 'Default');
      // Create Story.
      const s = new Story();
      // Add a passage.
      s.addPassage(p);
      // Convert to JSON.
      const js = s.toJSON(s);
      // Convert back to Story.
      const result = new Story();
      // Convert back.
      result.fromJSON(js);
      // Should have a single passage.
      expect(result.size()).toBe(1);
    });

    describe('Partial Story Processing', function () {
      it('Should parse everything but name', function () {
        const s = '{"tagColors":{"r":"red"},"ifid":"dd","start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","zoom":1,"passages":[{"name":"Start","tags":["tag1"],"metadata":{},"text":"Word"}]}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(1);
      });

      it('Should parse everything but tagColors', function () {
        const s = '{"name":"Test","ifid":"dd","start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","zoom":1,"passages":[{"name":"Start","tags":["tag1"],"metadata":{},"text":"Word"}]}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(0);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(1);
      });

      it('Should parse everything but ifid', function () {
        const s = '{"name":"Test","tagColors":{"r":"red"},"start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","zoom":1,"passages":[{"name":"Start","tags":["tag1"],"metadata":{},"text":"Word"}]}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(1);
      });

      it('Should parse everything but start', function () {
        const s = '{"name":"Test","tagColors":{"r":"red"},"ifid":"dd","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","zoom":1,"passages":[{"name":"Star","tags":["tag1"],"metadata":{},"text":"Word"}]}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(1);
      });

      it('Should parse everything but formatVersion', function () {
        const s = '{"name":"Test","tagColors":{"r":"red"},"ifid":"dd","start":"Start","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","zoom":1,"passages":[{"name":"Start","tags":["tag1"],"metadata":{},"text":"Word"}]}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(1);
      });

      it('Should parse everything but format', function () {
        const s = '{"name":"Test","tagColors":{"r":"red"},"ifid":"dd","start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"creator":"extwee","creatorVersion":"2.2.0","zoom":1,"passages":[{"name":"Start","tags":["tag1"],"metadata":{},"text":"Word"}]}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(1);
      });

      it('Should parse everything but creator', function () {
        const s = '{"name":"Test","tagColors":{"r":"red"},"ifid":"dd","start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creatorVersion":"2.2.0","zoom":1,"passages":[{"name":"Start","tags":["tag1"],"metadata":{},"text":"Word"}]}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(1);
      });

      it('Should parse everything but creator version', function () {
        const s = '{"name":"Test","tagColors":{"r":"red"},"ifid":"dd","start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","zoom":1,"passages":[{"name":"Start","tags":["tag1"],"metadata":{},"text":"Word"}]}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(1);
      });

      it('Should parse everything but zoom', function () {
        const s = '{"name":"Test","tagColors":{"r":"red"},"ifid":"dd","start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","passages":[{"name":"Start","tags":["tag1"],"metadata":{},"text":"Word"}]}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(0);
        expect(r.size()).toBe(1);
      });

      it('Should parse everything but metadata', function () {
        const s = '{"name":"Test","tagColors":{"r":"red"},"ifid":"dd","start":"Start","formatVersion":"1.0","format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","zoom":1,"passages":[{"name":"Start","tags":["tag1"],"metadata":{},"text":"Word"}]}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(0);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(1);
      });

      it('Should parse everything but passages', function () {
        const s = '{"name":"Test","tagColors":{"r":"red"},"ifid":"dd","start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","zoom":1}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(0);
      });

      it('Should ignore non-arrays for passages', function () {
        const s = '{"name":"Test","tagColors":{"r":"red"},"ifid":"dd","start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","zoom":1,"passages":{}}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(0);
      });

      it('Should parse everything but passage name', function () {
        const s = '{"name":"Test","tagColors":{"r":"red"},"ifid":"dd","start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","zoom":1,"passages":[{"tags":["tag1"],"metadata":{},"text":"Word"}]}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(1);
        expect(r.getPassageByName('').name).toBe('');
      });

      it('Should parse everything but passage tags', function () {
        const s = '{"name":"Test","tagColors":{"r":"red"},"ifid":"dd","start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","zoom":1,"passages":[{"name":"Start","metadata":{"s":"e"},"text":"Word"}]}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(1);
        expect(r.getPassageByName('Start').metadata.s).toBe('e');
        expect(r.getPassageByName('Start').tags.length).toBe(0);
      });

      it('Should parse everything but passage text', function () {
        const s = '{"name":"Test","tagColors":{"r":"red"},"ifid":"dd","start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","zoom":1,"passages":[{"name":"Start","tags":["tag1"],"metadata":{"s":"e"}}]}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(1);
        expect(r.getPassageByName('Start').metadata.s).toBe('e');
        expect(r.getPassageByName('Start').text).toBe('');
      });

      it('Parse everything but passage metadata', function () {
        const s = '{"name":"Test","tagColors":{"r":"red"},"ifid":"dd","start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","zoom":1,"passages":[{"name":"Start","tags":["tag1"],"text":"Word"}]}';
        const r = new Story();
        r.fromJSON(s);
        expect(r.name).toBe('Test');
        expect(Object.keys(r.tagColors).length).toBe(1);
        expect(r.IFID).toBe('DD');
        expect(r.start).toBe('Start');
        expect(r.formatVersion).toBe('1.0');
        expect(Object.keys(r.metadata).length).toBe(1);
        expect(r.format).toBe('Snowman');
        expect(r.creator).toBe('extwee');
        expect(r.creatorVersion).toBe('2.2.0');
        expect(r.zoom).toBe(1);
        expect(r.size()).toBe(1);
        expect(Object.prototype.hasOwnProperty.call(r.getPassageByName('Start').metadata, 's')).toBe(false);
        expect(r.getPassageByName('Start').text).toBe('Word');
      });
    });
  });

  describe('toTwee()', function () {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Should detect StoryTitle text', function () {
      // Add one passage.
      s.addPassage(new Passage('Start', 'Content'));

      // Change Story name.
      s.name = 'Title';

      // Convert to Twee.
      const t = s.toTwee();

      // Parse into a new story.
      const story = TweeParser.parse(t);

      // Test for name.
      expect(story.name).toBe('Title');
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
      const tp = TweeParser.parse(t);

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

      // Convert to Twee.
      const t = s.toTwee();

      // Parse Twee.
      const story2 = TweeParser.parse(t);

      // Test for format, formatVersion, zoom, and start.
      expect(story2.formatVersion).toBe('1.2.3');
      expect(story2.format).toBe('Test');
      expect(story2.zoom).toBe(1);
      expect(story2.start).toBe('Untitled');
    });

    it('Should write tag colors', () => {
      // Add some passages.
      s.addPassage(new Passage('Start', 'Content'));
      s.addPassage(new Passage('Untitled', 'Some stuff'));

      // Add tag colors.
      s.tagColors = {
        bar: 'green',
        foo: 'red',
        qaz: 'blue'
      };

      // Convert to Twee.
      const t = s.toTwee();

      // Convert back into Story.
      const story2 = TweeParser.parse(t);

      // Test for tag colors
      expect(story2.tagColors.bar).toBe('green');
      expect(story2.tagColors.foo).toBe('red');
      expect(story2.tagColors.qaz).toBe('blue');
    });

    it('Should encode "script" tag', () => {
      // Add passages.
      s.addPassage(new Passage('Test', 'Test', ['script']));
      s.addPassage(new Passage('Start', 'Content'));

      // Convert into Twee.
      const t = s.toTwee();

      // Convert back into Story.
      const story = TweeParser.parse(t);

      // Search for 'script'.
      const p = story.getPassagesByTag('script');

      // Test for passage text.
      expect(p[0].text).toBe('Test');
    });

    it('Should encode "stylesheet" tag', () => {
      // Add passages.
      s.addPassage(new Passage('Test', 'Test', ['stylesheet']));
      s.addPassage(new Passage('Start', 'Content'));

      // Convert into Twee.
      const t = s.toTwee();

      // Convert back into Story.
      const story = TweeParser.parse(t);

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

    it('Should throw error if no starting passage', function () {
      // No start set.
      expect(() => { s.toTwine2HTML(); }).toThrow();
    });

    it('Should throw error if starting passage cannot be found', function () {
      // Set start.
      s.start = 'Unknown';
      // Has a start, but not part of collection.
      expect(() => { s.toTwine2HTML(); }).toThrow();
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
      expect(result.includes('<div id="storeArea" data-size="1"')).toBe(true);
    });
  });
});
