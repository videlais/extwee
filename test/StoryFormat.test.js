const StoryFormat = require('../src/StoryFormat.js');

describe('StoryFormat', function () {
  describe('#constructor()', function () {
    it('Accept object values', function () {
      const sf = new StoryFormat({ name: 'testing' });
      expect(sf.name).toBe('testing');
    });

    it('Defaults to null values', function () {
      const sf = new StoryFormat({});
      expect(sf.name).toBe(null);
    });
  });
});
