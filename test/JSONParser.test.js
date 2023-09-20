import Story from '../src/Story.js';
import StoryFormat from '../src/StoryFormat.js';
import Passage from '../src/Passage.js';
import JSONParser from '../src/JSONParser.js';
import JSONWriter from '../src/JSONWriter.js';

describe('JSONParser', () => {
  describe('toStory()', function () {
    it('Should throw error if JSON is invalid', function () {
      expect(() => { JSONParser.toStory('{'); }).toThrow();
    });

    it('Should parse default Story JSON', function () {
      // Create Story.
      const s = new Story();
      // Convert to JSON.
      const js = JSONWriter.fromStory(s);
      // Convert back to Story.
      const result = JSONParser.toStory(js);
      // Check all properties.
      expect(result.name).toBe('');
      expect(Object.keys(result.tagColors).length).toBe(0);
      expect(result.IFID).toBe('');
      expect(result.start).toBe('');
      expect(result.formatVersion).toBe('');
      expect(result.format).toBe('');
      expect(result.creator).toBe('extwee');
      expect(result.creatorVersion).toBe('2.2.0');
      expect(result.zoom).toBe(0);
      expect(Object.keys(result.metadata).length).toBe(0);
    });

    it('Should parse passage data', function () {
      // Create passage.
      const p = new Passage('Test', 'Default');
      // Create Story.
      const s = new Story();
      // Add a passage.
      s.addPassage(p);
      // Convert to JSON.
      const js = JSONWriter.fromStory(s);
      // Convert back to Story.
      const result = JSONParser.toStory(js);
      // Should have a single passage.
      expect(result.size()).toBe(1);
    });

    describe('Partial Story Processing', function () {
      it('Should parse everything but name', function () {
        const s = '{"tagColors":{"r":"red"},"ifid":"dd","start":"Start","formatVersion":"1.0","metadata":{"some":"thing"},"format":"Snowman","creator":"extwee","creatorVersion":"2.2.0","zoom":1,"passages":[{"name":"Start","tags":["tag1"],"metadata":{},"text":"Word"}]}';
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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
        const r = JSONParser.toStory(s);
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

  describe('toPassage()', function () {
    it('Should throw error if JSON is invalid', function () {
      expect(() => { JSONParser.toPassage('{'); }).toThrow();
    });

    it('Should parse default passage data', function () {
      // Create passage.
      const p = new Passage();
      // Convert to JSON.
      const js = JSONWriter.fromPassage(p);
      // Convert back to Passage.
      const r = JSONParser.toPassage(js);
      // Test everything.
      expect(r.name).toBe('');
      expect(r.text).toBe('');
      expect(r.tags.length).toBe(0);
      expect(Object.keys(r.metadata).length).toBe(0);
    });

    describe('Partial Passage Processing', function () {
      it('Should read everything but name', function () {
        const obj = '{"tags":["tag1"],"metadata":{"some":"thing"},"text":"Words"}';
        const p = JSONParser.toPassage(obj);
        expect(p.name).toBe('');
        expect(p.tags.length).toBe(1);
        expect(p.metadata.some).toBe('thing');
        expect(p.text).toBe('Words');
      });

      it('Should read everything but tags', function () {
        const obj = '{"name":"Test","metadata":{"some":"thing"},"text":"Words"}';
        const p = JSONParser.toPassage(obj);
        expect(p.name).toBe('Test');
        expect(p.tags.length).toBe(0);
        expect(p.metadata.some).toBe('thing');
        expect(p.text).toBe('Words');
      });

      it('Should read everything but text', function () {
        const obj = '{"name":"Test","metadata":{"some":"thing"},"tags":["tag1"]}';
        const p = JSONParser.toPassage(obj);
        expect(p.name).toBe('Test');
        expect(p.tags.length).toBe(1);
        expect(p.metadata.some).toBe('thing');
        expect(p.text).toBe('');
      });

      it('Should read everything but metadata', function () {
        const obj = '{"name":"Test","tags":["tag1"],"text":"Words"}';
        const p = JSONParser.toPassage(obj);
        expect(p.name).toBe('Test');
        expect(p.tags.length).toBe(1);
        expect(Object.prototype.hasOwnProperty.call(p.metadata, 'some')).toBe(false);
        expect(p.text).toBe('Words');
      });
    });
  });

  describe('toStoryFormat()', function () {
    it('Should throw error if JSON is invalid', function () {
      expect(() => { JSONParser.toStoryFormat('{'); }).toThrow();
    });

    it('Should parse default StoryFormat data', function () {
      // Create story format.
      const sf = new StoryFormat();
      // Convert to JSON.
      const js = JSONWriter.fromStoryFormat(sf);
      // Convert back to StoryFormat.
      const r = JSONParser.toStoryFormat(js);
      // Test all default values.
      expect(r.name).toBe('');
      expect(r.version).toBe('');
      expect(r.description).toBe('');
      expect(r.author).toBe('');
      expect(r.image).toBe('');
      expect(r.url).toBe('');
      expect(r.license).toBe('');
      expect(r.proofing).toBe(false);
      expect(r.source).toBe('');
    });

    describe('Partial StoryFormat Processing', function () {
      it('Should parse everything but name', function () {
        const p = '{"version":"b","description":"c","author":"d","image":"e","url":"f","license":"g","proofing":true,"source":"h"}';
        const r = JSONParser.toStoryFormat(p);
        expect(r.name).toBe('');
        expect(r.version).toBe('b');
        expect(r.description).toBe('c');
        expect(r.author).toBe('d');
        expect(r.image).toBe('e');
        expect(r.url).toBe('f');
        expect(r.license).toBe('g');
        expect(r.proofing).toBe(true);
        expect(r.source).toBe('h');
      });

      it('Should parse everything but version', function () {
        const p = '{"name":"a","description":"c","author":"d","image":"e","url":"f","license":"g","proofing":true,"source":"h"}';
        const r = JSONParser.toStoryFormat(p);
        expect(r.name).toBe('a');
        expect(r.version).toBe('');
        expect(r.description).toBe('c');
        expect(r.author).toBe('d');
        expect(r.image).toBe('e');
        expect(r.url).toBe('f');
        expect(r.license).toBe('g');
        expect(r.proofing).toBe(true);
        expect(r.source).toBe('h');
      });

      it('Should parse everything but description', function () {
        const p = '{"name":"a","version":"b","author":"d","image":"e","url":"f","license":"g","proofing":true,"source":"h"}';
        const r = JSONParser.toStoryFormat(p);
        expect(r.name).toBe('a');
        expect(r.version).toBe('b');
        expect(r.description).toBe('');
        expect(r.author).toBe('d');
        expect(r.image).toBe('e');
        expect(r.url).toBe('f');
        expect(r.license).toBe('g');
        expect(r.proofing).toBe(true);
        expect(r.source).toBe('h');
      });

      it('Should parse everything but author', function () {
        const p = '{"name":"a","version":"b","description":"c","image":"e","url":"f","license":"g","proofing":true,"source":"h"}';
        const r = JSONParser.toStoryFormat(p);
        expect(r.name).toBe('a');
        expect(r.version).toBe('b');
        expect(r.description).toBe('c');
        expect(r.author).toBe('');
        expect(r.image).toBe('e');
        expect(r.url).toBe('f');
        expect(r.license).toBe('g');
        expect(r.proofing).toBe(true);
        expect(r.source).toBe('h');
      });

      it('Should parse everything but image', function () {
        const p = '{"name":"a","version":"b","description":"c","author":"d","url":"f","license":"g","proofing":true,"source":"h"}';
        const r = JSONParser.toStoryFormat(p);
        expect(r.name).toBe('a');
        expect(r.version).toBe('b');
        expect(r.description).toBe('c');
        expect(r.author).toBe('d');
        expect(r.image).toBe('');
        expect(r.url).toBe('f');
        expect(r.license).toBe('g');
        expect(r.proofing).toBe(true);
        expect(r.source).toBe('h');
      });

      it('Should parse everything but url', function () {
        const p = '{"name":"a","version":"b","description":"c","author":"d","image":"e","license":"g","proofing":true,"source":"h"}';
        const r = JSONParser.toStoryFormat(p);
        expect(r.name).toBe('a');
        expect(r.version).toBe('b');
        expect(r.description).toBe('c');
        expect(r.author).toBe('d');
        expect(r.image).toBe('e');
        expect(r.url).toBe('');
        expect(r.license).toBe('g');
        expect(r.proofing).toBe(true);
        expect(r.source).toBe('h');
      });

      it('Should parse everything but license', function () {
        const p = '{"name":"a","version":"b","description":"c","author":"d","image":"e","url":"f","proofing":true,"source":"h"}';
        const r = JSONParser.toStoryFormat(p);
        expect(r.name).toBe('a');
        expect(r.version).toBe('b');
        expect(r.description).toBe('c');
        expect(r.author).toBe('d');
        expect(r.image).toBe('e');
        expect(r.url).toBe('f');
        expect(r.license).toBe('');
        expect(r.proofing).toBe(true);
        expect(r.source).toBe('h');
      });

      it('Should parse everything but proofing', function () {
        const p = '{"name":"a","version":"b","description":"c","author":"d","image":"e","url":"f","license":"g","source":"h"}';
        const r = JSONParser.toStoryFormat(p);
        expect(r.name).toBe('a');
        expect(r.version).toBe('b');
        expect(r.description).toBe('c');
        expect(r.author).toBe('d');
        expect(r.image).toBe('e');
        expect(r.url).toBe('f');
        expect(r.license).toBe('g');
        expect(r.proofing).toBe(false);
        expect(r.source).toBe('h');
      });

      it('Should parse everything but source', function () {
        const p = '{"name":"a","version":"b","description":"c","author":"d","image":"e","url":"f","license":"g","proofing":true}';
        const r = JSONParser.toStoryFormat(p);
        expect(r.name).toBe('a');
        expect(r.version).toBe('b');
        expect(r.description).toBe('c');
        expect(r.author).toBe('d');
        expect(r.image).toBe('e');
        expect(r.url).toBe('f');
        expect(r.license).toBe('g');
        expect(r.proofing).toBe(true);
        expect(r.source).toBe('');
      });
    });
  });
});
