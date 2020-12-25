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

  describe('name', function () {
    test('Set using String', function () {
      const s = new Story();
      s.name = 'New';
      expect(s.name).toBe('New');
    });

    test('Should throw error if not String', function () {
      const s = new Story();
      expect(() => {
        s.name = 1;
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

  describe('start', function () {
    test('Set using Passage', function () {
      const s = new Story();
      const p = new Passage();
      s.start = p;
      expect(s.start instanceof Passage).toBe(true);
    });

    test('Should throw error if not Passage', function () {
      const s = new Story();
      expect(() => {
        s.start = 1;
      }).toThrow();
    });
  });

  describe('scriptPassage', function () {
    test('Set using Passage', function () {
      const s = new Story();
      const p = new Passage();
      s.scriptPassage = p;
      expect(s.scriptPassage instanceof Passage).toBe(true);
    });

    test('Should throw error if not Passage', function () {
      const s = new Story();
      expect(() => {
        s.scriptPassage = 1;
      }).toThrow();
    });
  });

  describe('stylesheetPassage', function () {
    test('Set using Passage', function () {
      const s = new Story();
      const p = new Passage();
      s.stylesheetPassage = p;
      expect(s.stylesheetPassage instanceof Passage).toBe(true);
    });

    test('Should throw error if not Passage', function () {
      const s = new Story();
      expect(() => {
        s.stylesheetPassage = 1;
      }).toThrow();
    });
  });

  describe('storyTitlePassage', function () {
    test('Set using Passage', function () {
      const s = new Story();
      const p = new Passage();
      s.storyTitlePassage = p;
      expect(s.storyTitlePassage instanceof Passage).toBe(true);
    });

    test('Should throw error if not Passage', function () {
      const s = new Story();
      expect(() => {
        s.storyTitlePassage = 1;
      }).toThrow();
    });
  });

  describe('storyAuthorPassage', function () {
    test('Set using Passage', function () {
      const s = new Story();
      const p = new Passage();
      s.storyAuthorPassage = p;
      expect(s.storyAuthorPassage instanceof Passage).toBe(true);
    });

    test('Should throw error if not Passage', function () {
      const s = new Story();
      expect(() => {
        s.storyAuthorPassage = 1;
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
      const p = new Passage('Find');
      s.addPassage(p);
      const passage = s.getPassageByName('Find');
      s.removePassage(passage);
      expect(s.size()).toBe(0);
    });

    test('removePassage() - should throw error if non-Passage', function () {
      const s = new Story();
      expect(() => {
        s.removePassage(null);
      }).toThrow();
    });
  });

  describe('getPassagesByTag()', function () {
    test('getPassagesByTag() - should find passages', function () {
      const s = new Story();
      const p = new Passage('Find', ['one']);
      const p2 = new Passage('Find2', ['one']);
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
      const p = new Passage('Find', ['one']);
      const p2 = new Passage('Find2', ['one']);
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

    test('removePassage() - should return null if not found', function () {
      const s = new Story();
      expect(s.getPassageByName('Find')).toBe(null);
    });
  });

  describe('getPassageByPID()', function () {
    test('getPassageByPID() - should get passage by PID', function () {
      const s = new Story();
      const p = new Passage('Find', [], {}, '', 12);
      s.addPassage(p);
      const passage = s.getPassageByPID(12);
      expect(passage.name).toBe('Find');
    });

    test('getPassageByPID() - should return null if not found', function () {
      const s = new Story();
      expect(s.getPassageByPID(12)).toBe(null);
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
