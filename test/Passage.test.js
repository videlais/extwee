import Passage from '../src/Passage.js';

describe('Passage', function () {
  describe('#constructor()', function () {
    test('Set default values', function () {
      const p = new Passage();
      expect(p.name).toBe('');
      expect(p.tags).toHaveLength(0);
      expect(p.text).toBe('');
      expect(typeof p.metadata).toBe('object');
      expect(p.pid).toBe(-1);
    });
  });

  describe('name', function () {
    test('Set name', function () {
      const p = new Passage();
      p.name = 'New';
      expect(p.name).toBe('New');
    });

    test('Throw error if name is not String', function () {
      const p = new Passage();
      expect(() => {
        p.name = 1;
      }).toThrow();
    });
  });

  describe('tags', function () {
    test('Set tags', function () {
      const p = new Passage();
      p.tags = ['tag'];
      expect(p.tags).toHaveLength(1);
    });

    test('Throw error if tags is not Array', function () {
      const p = new Passage();
      expect(() => {
        p.tags = 1;
      }).toThrow();
    });
  });

  describe('metadata', function () {
    test('Set metadata', function () {
      const p = new Passage();
      p.metadata = { position: '100,100' };
      expect(p.metadata).toEqual({ position: '100,100' });
    });

    test('Throw error if metadata is not an Object', function () {
      const p = new Passage();
      expect(() => {
        p.metadata = 1;
      }).toThrow();
    });
  });

  describe('text', function () {
    test('Set text', function () {
      const p = new Passage();
      p.text = 'New';
      expect(p.text).toBe('New');
    });

    test('Throw error if text is not a String', function () {
      const p = new Passage();
      expect(() => {
        p.text = 1;
      }).toThrow();
    });
  });

  describe('pid', function () {
    test('Set PID', function () {
      const p = new Passage();
      p.pid = 12;
      expect(p.pid).toBe(12);
    });

    test('Throw error if pid is not a Number', function () {
      const p = new Passage();
      expect(() => {
        p.pid = [];
      }).toThrow();
    });
  });

  describe('toString()', function () {
    test('Create name string', function () {
      const p = new Passage('Name', 'Test');
      expect(p.toString()).toBe(':: Name\nTest\n\n');
    });
    test('Create tags string', function () {
      const p = new Passage('Name', 'Test', ['tags', 'another']);
      expect(p.toString()).toBe(':: Name [tags another]\nTest\n\n');
    });
    test('Create metadata string', function () {
      const p = new Passage('Name', 'Test', ['tags', 'another'], { position: '100,100' });
      expect(p.toString()).toBe(':: Name [tags another] {"position":"100,100"}\nTest\n\n');
    });
  });
});
