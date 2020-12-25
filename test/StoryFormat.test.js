import StoryFormat from '../src/StoryFormat.js';

describe('StoryFormat', function () {
  describe('#constructor()', function () {
    test('Should create default values', function () {
      const sf = new StoryFormat();
      expect(sf.name).toBe('');
      expect(sf.version).toBe('');
      expect(sf.author).toBe('');
      expect(sf.image).toBe('');
      expect(sf.url).toBe('');
      expect(sf.license).toBe('');
      expect(sf.proofing).toBe('');
      expect(sf.source).toBe('');
    });
  });

  describe('name', function () {
    test('Set new String', function () {
      const sf = new StoryFormat();
      sf.name = 'New';
      expect(sf.name).toBe('New');
    });

    test('Throw error if non-String', function () {
      const sf = new StoryFormat();
      expect(() => {
        sf.name = 1;
      }).toThrow();
    });
  });

  describe('version', function () {
    test('Set new String', function () {
      const sf = new StoryFormat();
      sf.version = 'New';
      expect(sf.version).toBe('New');
    });

    test('Throw error if non-String', function () {
      const sf = new StoryFormat();
      expect(() => {
        sf.version = 1;
      }).toThrow();
    });
  });

  describe('author', function () {
    test('Set new String', function () {
      const sf = new StoryFormat();
      sf.author = 'New';
      expect(sf.author).toBe('New');
    });

    test('Throw error if non-String', function () {
      const sf = new StoryFormat();
      expect(() => {
        sf.author = 1;
      }).toThrow();
    });
  });

  describe('image', function () {
    test('Set new String', function () {
      const sf = new StoryFormat();
      sf.image = 'New';
      expect(sf.image).toBe('New');
    });

    test('Throw error if non-String', function () {
      const sf = new StoryFormat();
      expect(() => {
        sf.image = 1;
      }).toThrow();
    });
  });

  describe('url', function () {
    test('Set new String', function () {
      const sf = new StoryFormat();
      sf.url = 'New';
      expect(sf.url).toBe('New');
    });

    test('Throw error if non-String', function () {
      const sf = new StoryFormat();
      expect(() => {
        sf.url = 1;
      }).toThrow();
    });
  });

  describe('license', function () {
    test('Set new String', function () {
      const sf = new StoryFormat();
      sf.license = 'New';
      expect(sf.license).toBe('New');
    });

    test('Throw error if non-String', function () {
      const sf = new StoryFormat();
      expect(() => {
        sf.license = 1;
      }).toThrow();
    });
  });

  describe('proofing', function () {
    test('Set new String', function () {
      const sf = new StoryFormat();
      sf.proofing = 'New';
      expect(sf.proofing).toBe('New');
    });

    test('Throw error if non-String', function () {
      const sf = new StoryFormat();
      expect(() => {
        sf.proofing = 1;
      }).toThrow();
    });
  });

  describe('source', function () {
    test('Set new String', function () {
      const sf = new StoryFormat();
      sf.source = 'New';
      expect(sf.source).toBe('New');
    });

    test('Throw error if non-String', function () {
      const sf = new StoryFormat();
      expect(() => {
        sf.source = 1;
      }).toThrow();
    });
  });

  describe('description', function () {
    test('Set new String', function () {
      const sf = new StoryFormat();
      sf.description = 'New';
      expect(sf.description).toBe('New');
    });

    test('Throw error if non-String', function () {
      const sf = new StoryFormat();
      expect(() => {
        sf.description = 1;
      }).toThrow();
    });
  });
});
