import Story from '../../src/Story.js';
import Passage from '../../src/Passage.js';
import { parse as parseJSON } from '../../src/JSON/parse.js';

describe('JSON', () => {
  describe('parse()', function () {
    it('Should throw error if JSON is invalid', function () {
      expect(() => { parseJSON('{'); }).toThrow();
    });

    it('Should roundtrip default Story values using toJSON() and fromJSON()', function () {
      // Create Story.
      const r = new Story();

      // Convert to JSON and back.
      const s = parseJSON(r.toJSON());

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
      const result = parseJSON(js);

      // Should have a single passage.
      expect(result.size()).toBe(1);
    });

    describe('Partial Story Processing', function () {
      it('Should parse everything but name', function () {
        const s = '{"tagColors":{"r":"red"},"ifid":"dd","start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","zoom":1,"passages":[{"name":"Start","tags":["tag1"],"metadata":{},"text":"Word"}]}';
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
        const r = parseJSON(s);
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
});
