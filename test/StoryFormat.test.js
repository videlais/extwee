const StoryFormat = require('../src/StoryFormat.js');

describe('StoryFormat', function () {
  describe('#constructor()', function () {
    test('Should accept object values', function () {
      const sf = new StoryFormat({ name: 'testing' });
      expect(sf.name).toBe('testing');
    });

    test('Should defaults to null values', function () {
      const sf = new StoryFormat({});
      expect(sf.name).toBe(null);
    });

    test('Should set everything to null with non-object', function () {
      // Create with non-object
      const sf = new StoryFormat(1);
      // All properties should be null
      expect(sf).toEqual({
        name: null,
        version: null,
        description: null,
        author: null,
        image: null,
        url: null,
        license: null,
        proofing: null,
        source: null
      });
    });
  });
});
