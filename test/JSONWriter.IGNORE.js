import StoryFormat from '../src/StoryFormat.js';
import Passage from '../src/Passage.js';
import JSONWriter from '../src/JSONWriter.js';

describe('JSONWriter', () => {

  describe('fromStoryFormat()', function () {
    const p_ = new Passage();
    let st_ = new StoryFormat();

    beforeEach(() => {
      st_ = new StoryFormat();
    });

    it('Should throw error if not StoryFormat', function () {
      expect(() => { JSONWriter.fromStoryFormat(p_); }).toThrow();
    });

    it('Should hold default values', function () {
      const r = JSON.parse(JSONWriter.fromStoryFormat(st_));
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
  });
});
