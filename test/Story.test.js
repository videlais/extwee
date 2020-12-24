import Story from '../src/Story.js';
import Passage from '../src/Passage';

describe('Story', function () {
  describe('#constructor()', function () {
    test('Should have default values', function () {
      const s = new Story();
      expect(s.name).toBe('Unknown');
    });
  });

  describe('#getPassageByName()', function () {
    test('Should return Passage based on name', function () {
      const s = new Story();
      const p = new Passage('Name');
      s.addPassage(p);
      expect(s.getPassageByName('Name').name).toBe('Name');
    });

    test('Should return null if not found', function () {
      const s = new Story();
      const p = new Passage('Name');
      s.passages.push(p);
      expect(s.getPassageByName('Another')).toBe(null);
    });

    test('Should return null with default parameter', function () {
      const s = new Story();
      expect(s.getPassageByName()).toBe(null);
    });
  });

  describe('#getPassageByPID()', function () {
    test('Should return Passage based on name', function () {
      const s = new Story();
      const p = new Passage('Name', [], {}, '', 12);
      s.passages.push(p);
      expect(s.getPassageByPID(12).pid).toBe(12);
    });

    test('Should return null if not found', function () {
      const s = new Story();
      const p = new Passage('Name', [], {}, '', 12);
      s.passages.push(p);
      expect(s.getPassageByPID(1)).toBe(null);
    });

    test('Should return null with default parameter', function () {
      const s = new Story();
      expect(s.getPassageByPID()).toBe(null);
    });
  });

  describe('#getStartingPassage()', function () {
    test('Should be null if no passages exist', function () {
      const s = new Story();
      expect(s.getStartingPassage()).toBe(null);
    });
  });
});
