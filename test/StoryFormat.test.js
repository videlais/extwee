const StoryFormat = require('../src/StoryFormat.js');

describe('StoryFormat', function () {
  describe('#constructor()', function () {
    it('Should accept object values', function () {
      const sf = new StoryFormat({ name: 'testing' });
      expect(sf.name).toBe('testing');
    });

    it('Should defaults to null values', function () {
      const sf = new StoryFormat({});
      expect(sf.name).toBe(null);
    });

    it('Should throw error if non-object passed to it', function () {
      expect(() => {
        const sf = new StoryFormat(1);
      }).toThrow();
    });
  });
});
