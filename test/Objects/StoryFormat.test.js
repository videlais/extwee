import StoryFormat from '../../src/StoryFormat.js';

describe('StoryFormat', () => {
  describe('Default values', () => {
    it('Should have default values', () => {
      const sf = new StoryFormat();
      expect(sf.name).toBe('Untitled Story Format');
      expect(sf.version).toBe('');
      expect(sf.author).toBe('');
      expect(sf.image).toBe('');
      expect(sf.url).toBe('');
      expect(sf.license).toBe('');
      expect(sf.proofing).toBe(false);
      expect(sf.source).toBe('');
    });
  });

  describe('name', () => {
    it('Set new String', () => {
      const sf = new StoryFormat();
      sf.name = 'New';
      expect(sf.name).toBe('New');
    });

    it('Throw error if non-String', () => {
      const sf = new StoryFormat();
      expect(() => {
        sf.name = 1;
      }).toThrow();
    });
  });

  describe('version', () => {
    it('Set new String', () => {
      const sf = new StoryFormat();
      sf.version = 'New';
      expect(sf.version).toBe('New');
    });

    it('Throw error if non-String', () => {
      const sf = new StoryFormat();
      expect(() => {
        sf.version = 1;
      }).toThrow();
    });
  });

  describe('author', () => {
    it('Set new String', () => {
      const sf = new StoryFormat();
      sf.author = 'New';
      expect(sf.author).toBe('New');
    });

    it('Throw error if non-String', () => {
      const sf = new StoryFormat();
      expect(() => {
        sf.author = 1;
      }).toThrow();
    });
  });

  describe('image', () => {
    it('Set new String', () => {
      const sf = new StoryFormat();
      sf.image = 'New';
      expect(sf.image).toBe('New');
    });

    it('Throw error if non-String', () => {
      const sf = new StoryFormat();
      expect(() => {
        sf.image = 1;
      }).toThrow();
    });
  });

  describe('url', () => {
    it('Set new String', () => {
      const sf = new StoryFormat();
      sf.url = 'New';
      expect(sf.url).toBe('New');
    });

    it('Throw error if non-String', () => {
      const sf = new StoryFormat();
      expect(() => {
        sf.url = 1;
      }).toThrow();
    });
  });

  describe('license', () => {
    it('Set new String', () => {
      const sf = new StoryFormat();
      sf.license = 'New';
      expect(sf.license).toBe('New');
    });

    it('Throw error if non-String', () => {
      const sf = new StoryFormat();
      expect(() => {
        sf.license = 1;
      }).toThrow();
    });
  });

  describe('proofing', () => {
    it('Set new String', () => {
      const sf = new StoryFormat();
      sf.proofing = true;
      expect(sf.proofing).toBe(true);
    });

    it('Throw error if non-String', () => {
      const sf = new StoryFormat();
      expect(() => {
        sf.proofing = 1;
      }).toThrow();
    });
  });

  describe('source', () => {
    it('Set new String', () => {
      const sf = new StoryFormat();
      sf.source = 'New';
      expect(sf.source).toBe('New');
    });

    it('Throw error if non-String', () => {
      const sf = new StoryFormat();
      expect(() => {
        sf.source = 1;
      }).toThrow();
    });
  });

  describe('description', () => {
    it('Set new String', () => {
      const sf = new StoryFormat();
      sf.description = 'New';
      expect(sf.description).toBe('New');
    });

    it('Throw error if non-String', () => {
      const sf = new StoryFormat();
      expect(() => {
        sf.description = 1;
      }).toThrow();
    });
  });

  describe('toString', () => {
    it('Should return string representation', () => {
      const sf = new StoryFormat();
      sf.version = '1.0.0';
      expect(sf.toString()).toBe(JSON.stringify(sf, null, '\t'));
    });

    it('Should throw error if version is not valid', () => {
      const sf = new StoryFormat();
      expect(() => {
        sf.toString();
      }).toThrow();
    });
  });

  describe('toJSON', () => {
    it('Should return JSON representation with default name', () => {
      const sf = new StoryFormat();
      sf.version = '1.0.0';
      expect(sf.toJSON().includes("Untitled Story Format")).toEqual(true);
    });

    it('Should return JSON representation with custom name', () => {
      const sf = new StoryFormat();
      sf.name = 'Custom Name';
      sf.version = '1.0.0';
      expect(sf.toJSON().includes("Custom Name")).toEqual(true);
    });

    it('Should overwrite with default name if name is empty string', () => {
      const sf = new StoryFormat();
      sf.name = '';
      sf.version = '1.0.0';
      expect(sf.toJSON().includes("Untitled Story Format")).toEqual(true);
    });

    it('Should throw error if version is not valid', () => {
      const sf = new StoryFormat();
      expect(() => {
        sf.toJSON();
      }).toThrow();
    });
  });
});
