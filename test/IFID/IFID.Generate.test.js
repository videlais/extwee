import { generate } from '../../src/IFID/generate.js';

describe('src/IFID/generate.js', () => {
  describe('generate()', () => {
    it('should generate a valid IFID', () => {
      const ifid = generate();
      expect(ifid).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/);
    });
  });
});
