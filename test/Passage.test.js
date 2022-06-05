import Passage from '../src/Passage.js';

describe('Passage', () => {
  describe('#constructor()', () => {
    test('Set default values', () => {
      const p = new Passage();
      expect(p.name).toBe('');
      expect(p.tags).toHaveLength(0);
      expect(p.text).toBe('');
      expect(typeof p.metadata).toBe('object');
      expect(p.pid).toBe(-1);
    });
  });

  describe('name', () => {
    test('Set name', () => {
      const p = new Passage();
      p.name = 'New';
      expect(p.name).toBe('New');
    });

    test('Throw error if name is not String', () => {
      const p = new Passage();
      expect(() => {
        p.name = 1;
      }).toThrow();
    });
  });

  describe('tags', () => {
    test('Set tags', () => {
      const p = new Passage();
      p.tags = ['tag'];
      expect(p.tags).toHaveLength(1);
    });

    test('Throw error if tags is not Array', () => {
      const p = new Passage();
      expect(() => {
        p.tags = 1;
      }).toThrow();
    });
  });

  describe('metadata', () => {
    test('Set metadata', () => {
      const p = new Passage();
      p.metadata = { position: '100,100' };
      expect(p.metadata).toEqual({ position: '100,100' });
    });

    test('Throw error if metadata is not an Object', () => {
      const p = new Passage();
      expect(() => {
        p.metadata = 1;
      }).toThrow();
    });
  });

  describe('text', () => {
    test('Set text', () => {
      const p = new Passage();
      p.text = 'New';
      expect(p.text).toBe('New');
    });

    test('Throw error if text is not a String', () => {
      const p = new Passage();
      expect(() => {
        p.text = 1;
      }).toThrow();
    });
  });

  describe('pid', () => {
    test('Set PID', () => {
      const p = new Passage();
      p.pid = 12;
      expect(p.pid).toBe(12);
    });

    test('Throw error if pid is not a Number', () => {
      const p = new Passage();
      expect(() => {
        p.pid = [];
      }).toThrow();
    });
  });

  describe('toString()', () => {
    test('Create name string', () => {
      const p = new Passage('Name', 'Test');
      expect(p.toString()).toBe(':: Name\nTest\n\n');
    });
    test('Create tags string', () => {
      const p = new Passage('Name', 'Test', ['tags', 'another']);
      expect(p.toString()).toBe(':: Name [tags another]\nTest\n\n');
    });
    test('Create metadata string', () => {
      const p = new Passage('Name', 'Test', ['tags', 'another'], { position: '100,100' });
      expect(p.toString()).toBe(':: Name [tags another] {"position":"100,100"}\nTest\n\n');
    });
  });
});
