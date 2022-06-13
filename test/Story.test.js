import Story from '../src/Story.js';
import Passage from '../src/Passage';
import FileReader from '../src/FileReader.js';

// Pull the name and version of this project from package.json.
// These are used as the 'creator' and 'creator-version'.
const { name, version } = JSON.parse(FileReader.read('package.json'));

describe('Story', () => {
  describe('#constructor()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Should have extwee name', () => {
      expect(s.creator).toBe(name);
    });

    it('Should have extwee version', () => {
      expect(s.creatorVersion).toBe(version);
    });
  });

  describe('creator', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set using String', () => {
      s.creator = 'New';
      expect(s.creator).toBe('New');
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.creator = 1;
      }).toThrow();
    });
  });

  describe('creatorVersion', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set using String', () => {
      s.creatorVersion = 'New';
      expect(s.creatorVersion).toBe('New');
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.creatorVersion = 1;
      }).toThrow();
    });
  });

  describe('IFID', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set using String', () => {
      s.IFID = 'New';
      expect(s.IFID).toBe('New');
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.IFID = 1;
      }).toThrow();
    });
  });

  describe('format', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set using String', () => {
      s.format = 'New';
      expect(s.format).toBe('New');
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.format = 1;
      }).toThrow();
    });
  });

  describe('formatVersion', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set using String', () => {
      s.formatVersion = 'New';
      expect(s.formatVersion).toBe('New');
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.formatVersion = 1;
      }).toThrow();
    });
  });

  describe('name', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set using String', () => {
      s.name = 'New';
      expect(s.name).toBe('New');
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.name = 1;
      }).toThrow();
    });
  });

  describe('zoom', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set using Number', () => {
      s.zoom = 1.0;
      expect(s.zoom).not.toBe(0);
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.zoom = null;
      }).toThrow();
    });
  });

  describe('metadata', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set metadata', () => {
      s.metadata = {};
      expect(s.metadata).not.toBe(null);
    });

    it('Should throw error if not object', () => {
      expect(() => {
        s.metadata = 1;
      }).toThrow();
    });
  });

  describe('start', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set start', () => {
      s.start = 'Start';
      expect(s.start).not.toBe('');
    });

    it('Should throw error if not String', () => {
      expect(() => {
        s.start = 1;
      }).toThrow();
    });
  });

  describe('tagColors', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('Set tagColors', () => {
      s.tagColors = {
        bar: 'green'
      };
      const count = Object.keys(s.tagColors).length;
      expect(count).toBe(1);
    });

    it('Should throw error if not object', () => {
      expect(() => {
        s.tagColors = null;
      }).toThrow();
    });
  });

  describe('addPassage()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('addPassage() - should increase size', () => {
      const p = new Passage();
      s.addPassage(p);
      expect(s.size()).toBe(1);
    });

    it('addPassage() - should throw error if non-Passage', () => {
      expect(() => {
        s.addPassage(null);
      }).toThrow();
    });

    it('addPassage() - should prevent passages with same name being added', () => {
      const p = new Passage('A');
      const p2 = new Passage('A');
      s.addPassage(p);
      s.addPassage(p2);
      expect(s.size()).toBe(1);
    });
  });

  describe('removePassageByName()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('removePassageByName() - should decrease size', () => {
      s.addPassage(new Passage('Find'));
      s.addPassage(new Passage('Find2'));
      s.removePassageByName('Find');
      expect(s.size()).toBe(1);
    });
  });

  describe('getPassagesByTag()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('getPassagesByTag() - should find passages', () => {
      const p = new Passage('Find', '', ['one']);
      const p2 = new Passage('Find2', '', ['one']);
      s.addPassage(p);
      s.addPassage(p2);
      const ps = s.getPassagesByTag('one');
      expect(ps).toHaveLength(2);
    });

    it('getPassagesByTag() - should find none if none in collection', () => {
      const ps = s.getPassagesByTag('one');
      expect(ps).toHaveLength(0);
    });

    it('getPassagesByTag() - should find none if no tags match search', () => {
      const p = new Passage('Find', '', ['one']);
      const p2 = new Passage('Find2', '', ['one']);
      s.addPassage(p);
      s.addPassage(p2);
      const ps = s.getPassagesByTag('two');
      expect(ps).toHaveLength(0);
    });
  });

  describe('getPassageByName()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('getPassageByName() - should get passage by name', () => {
      const p = new Passage('Find');
      s.addPassage(p);
      const passage = s.getPassageByName('Find');
      expect(passage.name).toBe('Find');
    });
  });

  describe('getPassageByPID()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('getPassageByPID() - should get passage by PID', () => {
      const p = new Passage('Find', '', [], {}, 12);
      s.addPassage(p);
      const passage = s.getPassageByPID(12);
      expect(passage.name).toBe('Find');
    });

    it('getPassageByPID() - should return null if not found', () => {
      expect(s.getPassageByPID(12)).toBe(null);
    });
  });

  describe('forEach()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('forEach() - should return if non-function', () => {
      s.addPassage(new Passage('A'));
      s.addPassage(new Passage('B'));
      let passageNames = '';
      s.forEach((p) => {
        passageNames += p.name;
      });
      expect(passageNames).toBe('AB');
    });

    it('forEach() - should throw error if non-function', () => {
      expect(() => {
        s.forEach(null);
      }).toThrow();
    });

    it('forEach() - should ignore StoryTitle', () => {
      let count = 0;
      s.addPassage(new Passage('StoryTitle', 'Test'));
      s.forEach(() => {count++});
      expect(count).toBe(0);
    });

    it('forEach() - should ignore "script" tags', () => {
      let count = 0;
      s.addPassage(new Passage('Test', 'Test', ['script']));
      s.forEach(() => {count++});
      expect(count).toBe(0);
    });

    it('forEach() - should ignore "stylesheet" tags', () => {
      let count = 0;
      s.addPassage(new Passage('Test', 'Test', ['stylesheet']));
      s.forEach(() => {count++});
      expect(count).toBe(0);
    });
  });

  describe('size()', () => {
    let s = null;

    beforeEach(() => {
      s = new Story();
    });

    it('size() - should report number of passages', () => {
      // Create a Passage
      const p = new Passage('');
      // Test initial size
      expect(s.size()).toBe(0);
      // Add a passage
      s.addPassage(p);
      // Test size after adding one
      expect(s.size()).toBe(1);
    });

    it('size() - should not count StoryTitle', () => {
      // Create a Passage
      const p = new Passage('StoryTitle', 'Test');
      // Test initial size
      expect(s.size()).toBe(0);
      // Add a passage
      s.addPassage(p);
      // Test size after adding one
      expect(s.size()).toBe(0);
    });

    it('size() - should not count script tags', () => {
      // Create a Passage
      const p = new Passage('Test', 'Test', ['script']);
      // Test initial size
      expect(s.size()).toBe(0);
      // Add a passage
      s.addPassage(p);
      // Test size after adding one
      expect(s.size()).toBe(0);
    });

    it('size() - should not count script tags', () => {
      // Create a Passage
      const p = new Passage('Test', 'Test', ['stylesheet']);
      // Test initial size
      expect(s.size()).toBe(0);
      // Add a passage
      s.addPassage(p);
      // Test size after adding one
      expect(s.size()).toBe(0);
    });
  });
});
