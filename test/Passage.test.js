import Passage from '../src/Passage.js';

describe('Passage', () => {
  describe('constructor()', () => {
    it('Set default values', () => {
      const p = new Passage();
      expect(p.name).toBe('');
      expect(p.tags).toHaveLength(0);
      expect(p.text).toBe('');
      expect(typeof p.metadata).toBe('object');
      expect(p.pid).toBe(-1);
    });
  });

  describe('name', () => {
    it('Set name', () => {
      const p = new Passage();
      p.name = 'New';
      expect(p.name).toBe('New');
    });

    it('Throw error if name is not String', () => {
      const p = new Passage();
      expect(() => {
        p.name = 1;
      }).toThrow();
    });
  });

  describe('tags', () => {
    it('Set tags', () => {
      const p = new Passage();
      p.tags = ['tag'];
      expect(p.tags).toHaveLength(1);
    });

    it('Throw error if tags is not Array', () => {
      const p = new Passage();
      expect(() => {
        p.tags = 1;
      }).toThrow();
    });
  });

  describe('metadata', () => {
    it('Set metadata', () => {
      const p = new Passage();
      p.metadata = { position: '100,100' };
      expect(p.metadata).toEqual({ position: '100,100' });
    });

    it('Throw error if metadata is not an Object', () => {
      const p = new Passage();
      expect(() => {
        p.metadata = 1;
      }).toThrow();
    });
  });

  describe('text', () => {
    it('Set text', () => {
      const p = new Passage();
      p.text = 'New';
      expect(p.text).toBe('New');
    });

    it('Throw error if text is not a String', () => {
      const p = new Passage();
      expect(() => {
        p.text = 1;
      }).toThrow();
    });
  });

  describe('pid', () => {
    it('Set PID', () => {
      const p = new Passage();
      p.pid = 12;
      expect(p.pid).toBe(12);
    });

    it('Throw error if pid is not a Number', () => {
      const p = new Passage();
      expect(() => {
        p.pid = [];
      }).toThrow();
    });
  });

  describe('toTwee()', () => {
    it('Create name string', () => {
      const p = new Passage('Name', 'Test');
      expect(p.toTwee()).toBe(':: Name\nTest\n\n');
    });
    it('Create tags string', () => {
      const p = new Passage('Name', 'Test', ['tags', 'another']);
      expect(p.toTwee()).toBe(':: Name [tags another]\nTest\n\n');
    });
    it('Create metadata string', () => {
      const p = new Passage('Name', 'Test', ['tags', 'another'], { position: '100,100' });
      expect(p.toTwee()).toBe(':: Name [tags another] {"position":"100,100"}\nTest\n\n');
    });
  });

  describe('toJSON()', function () {
    it('Should hold default values', function () {
      const p = new Passage();
      const r = JSON.parse(p.toJSON());
      expect(r.name).toBe('');
      expect(r.text).toBe('');
      expect(r.tags.length).toBe(0);
      expect(Object.keys(r.metadata).length).toBe(0);
    });
  });

  describe('toTwine2HTML()', function() {

    let p = null;
    let result = null;

    beforeEach(() => {
      p = new Passage("Test", "Word", ['tag1'], {'some': 'thing'}, 10);
      result = p.toTwine2HTML();
    });

    it('Should contain PID', function() {
      expect(result.includes('pid="10"')).toBe(true);
    });

    it('Should include name', function() {
      expect(result.includes('name="Test"')).toBe(true);
    });

    it('Should include single tag', function() {
      expect(result.includes('tags="tag1"')).toBe(true);
    });

    it('Should include multiple tags', function() {
      p.tags = ['tag1', 'tag2'];
      result = p.toTwine2HTML();
      expect(result.includes('tags="tag1 tag2"')).toBe(true);
    });

    it('Should include position, if it exists', function() {
      p.metadata = {'position': "102,99"};
      result = p.toTwine2HTML();
      expect(result.includes('position="102,99"')).toBe(true);
    });

    it('Should include size, if it exists', function() {
      p.metadata = {'size': "100,100"};
      result = p.toTwine2HTML();
      expect(result.includes('size="100,100"')).toBe(true);
    });
  });

  describe('toTwine1HTML()', function() {
    let p = null;
    let result = null;

    beforeEach(() => {
      p = new Passage("Test", "Word", ['tag1'], {'position': '12, 12'});
      result = p.toTwine1HTML();
    });

    it('Should include tiddler', function() {
      expect(result.includes('tiddler="Test"')).toBe(true);
    });

    it('Should include single tag', function() {
      expect(result.includes('tags="tag1"')).toBe(true);
    });

    it('Should include multiple tags', function() {
      p.tags = ['tag1', 'tag2'];
      result = p.toTwine1HTML();
      expect(result.includes('tags="tag1 tag2"')).toBe(true);
    });

    it('Should include position, if it exists', function() {
      p.metadata = {'position': "102,99"};
      result = p.toTwine1HTML();
      expect(result.includes('position="102,99"')).toBe(true);
    });

    it('Should use default position', function() {
      p.metadata = {};
      result = p.toTwine1HTML();
      expect(result.includes('position="10,10"')).toBe(true);
    });
  });
});
