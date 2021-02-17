import Story from '../src/Story.js';
import Passage from '../src/Passage';
import { name, version } from '../package.json';

describe('Story', function () {
  describe('#constructor()', function () {
    test('Should have extwee name', function () {
      const s = new Story();
      expect(s.creator).toBe(name);
    });

    test('Should have extwee version', function () {
      const s = new Story();
      expect(s.creatorVersion).toBe(version);
    });
  });

  describe('creator', function () {
    test('Set using String', function () {
      const s = new Story();
      s.creator = 'New';
      expect(s.creator).toBe('New');
    });

    test('Should throw error if not String', function () {
      const s = new Story();
      expect(() => {
        s.creator = 1;
      }).toThrow();
    });
  });

  describe('creatorVersion', function () {
    test('Set using String', function () {
      const s = new Story();
      s.creatorVersion = 'New';
      expect(s.creatorVersion).toBe('New');
    });

    test('Should throw error if not String', function () {
      const s = new Story();
      expect(() => {
        s.creatorVersion = 1;
      }).toThrow();
    });
  });

  describe('IFID', function () {
    test('Set using String', function () {
      const s = new Story();
      s.IFID = 'New';
      expect(s.IFID).toBe('New');
    });

    test('Should throw error if not String', function () {
      const s = new Story();
      expect(() => {
        s.IFID = 1;
      }).toThrow();
    });
  });

  describe('format', function () {
    test('Set using String', function () {
      const s = new Story();
      s.format = 'New';
      expect(s.format).toBe('New');
    });

    test('Should throw error if not String', function () {
      const s = new Story();
      expect(() => {
        s.format = 1;
      }).toThrow();
    });
  });

  describe('formatVersion', function () {
    test('Set using String', function () {
      const s = new Story();
      s.formatVersion = 'New';
      expect(s.formatVersion).toBe('New');
    });

    test('Should throw error if not String', function () {
      const s = new Story();
      expect(() => {
        s.formatVersion = 1;
      }).toThrow();
    });
  });

  describe('zoom', function () {
    test('Set using String', function () {
      const s = new Story();
      s.zoom = 'New';
      expect(s.zoom).toBe('New');
    });

    test('Should throw error if not String', function () {
      const s = new Story();
      expect(() => {
        s.zoom = 1;
      }).toThrow();
    });
  });

  describe('metadata', function () {
    test('Set metadata', function () {
      const s = new Story();
      s.metadata = {};
      expect(s.metadata).not.toBe(null);
    });

    test('Should throw error if not object', function () {
      const s = new Story();
      expect(() => {
        s.metadata = 1;
      }).toThrow();
    });
  });

  describe('start', function () {
    test('Set start', function () {
      const s = new Story();
      s.start = 'Start';
      expect(s.start).not.toBe('');
    });

    test('Should throw error if not String', function () {
      const s = new Story();
      expect(() => {
        s.start = 1;
      }).toThrow();
    });
  });

  describe('addPassage()', function () {
    test('addPassage() - should increase size', function () {
      const s = new Story();
      const p = new Passage();
      s.addPassage(p);
      expect(s.size()).toBe(1);
    });

    test('addPassage() - should throw error if non-Passage', function () {
      const s = new Story();
      expect(() => {
        s.addPassage(null);
      }).toThrow();
    });

    test('addPassage() - should prevent passages with same name being added', function () {
      const s = new Story();
      const p = new Passage('A');
      const p2 = new Passage('A');
      s.addPassage(p);
      s.addPassage(p2);
      expect(s.size()).toBe(1);
    });
  });

  describe('removePassage()', function () {
    test('removePassage() - should decrease size', function () {
      const s = new Story();
      s.addPassage(new Passage('Find'));
      s.addPassage(new Passage('Find2'));
      s.removePassage('Find');
      expect(s.size()).toBe(1);
    });
  });

  describe('getPassagesByTag()', function () {
    test('getPassagesByTag() - should find passages', function () {
      const s = new Story();
      const p = new Passage('Find', '', ['one']);
      const p2 = new Passage('Find2', '', ['one']);
      s.addPassage(p);
      s.addPassage(p2);
      const ps = s.getPassagesByTag('one');
      expect(ps).toHaveLength(2);
    });

    test('getPassagesByTag() - should find none if none in collection', function () {
      const s = new Story();
      const ps = s.getPassagesByTag('one');
      expect(ps).toHaveLength(0);
    });

    test('getPassagesByTag() - should find none if no tags match search', function () {
      const s = new Story();
      const p = new Passage('Find', '', ['one']);
      const p2 = new Passage('Find2', '', ['one']);
      s.addPassage(p);
      s.addPassage(p2);
      const ps = s.getPassagesByTag('two');
      expect(ps).toHaveLength(0);
    });
  });

  describe('getPassageByName()', function () {
    test('getPassageByName() - should get passage by name', function () {
      const s = new Story();
      const p = new Passage('Find');
      s.addPassage(p);
      const passage = s.getPassageByName('Find');
      expect(passage.name).toBe('Find');
    });
  });

  describe('getPassageByPID()', function () {
    test('getPassageByPID() - should get passage by PID', function () {
      const s = new Story();
      const p = new Passage('Find', '', [], {}, 12);
      s.addPassage(p);
      const passage = s.getPassageByPID(12);
      expect(passage.name).toBe('Find');
    });

    test('getPassageByPID() - should return null if not found', function () {
      const s = new Story();
      expect(s.getPassageByPID(12)).toBe(null);
    });
  });

  describe('forEach()', function () {
    test('forEach() - should return if non-function', function () {
      const s = new Story();
      s.addPassage(new Passage('A'));
      s.addPassage(new Passage('B'));
      let passageNames = '';
      s.forEach((p) => {
        passageNames += p.name;
      });
      expect(passageNames).toBe('AB');
    });

    test('forEach() - should throw error if non-function', function () {
      const s = new Story();
      expect(() => {
        s.forEach(null);
      }).toThrow();
    });
  });

  describe('size()', function () {
    test('size() - should report number of passages', function () {
      // Create a Story
      const s = new Story();
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
});
