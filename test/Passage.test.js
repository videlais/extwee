const Passage = require('../src/Passage.js');

describe('Passage', function () {
  describe('#constructor()', function () {
    it('Should have default values', function () {
      const p = new Passage();
      expect(p.name).toBe('');
    });
  });
});
