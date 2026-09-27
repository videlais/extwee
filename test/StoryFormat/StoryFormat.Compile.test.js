import StoryFormat from '../../src/StoryFormat.js';
import { compile as compileStoryFormat } from '../../src/StoryFormat/compile.js';
import { parse as parseStoryFormat } from '../../src/StoryFormat/parse.js';

describe('StoryFormat', () => {
  describe('compile()', () => {
    it('Should throw if not passed a StoryFormat', () => {
      expect(() => compileStoryFormat({})).toThrow('Error: Incoming object is not a storyFormat object');
    });

    it('Should throw if the version is not valid semver', () => {
      expect(() => compileStoryFormat(new StoryFormat('Bad', 'one'))).toThrow('ERROR: Version must be a valid semantic version!');
    });

    // Regression: https://github.com/videlais/extwee/issues/797
    it('Should pass an object, not a string, to window.storyFormat()', () => {
      const sf = new StoryFormat('My Format', '1.0.0');
      sf.source = '<html>{{STORY_DATA}}</html>';

      const output = compileStoryFormat(sf);
      expect(output.startsWith('window.storyFormat({')).toBe(true);

      let received;
      const window = { storyFormat: (data) => { received = data; } };
      new Function('window', output)(window);

      expect(typeof received).toBe('object');
      expect(received.name).toBe('My Format');
      expect(received.source).toBe('<html>{{STORY_DATA}}</html>');
    });

    it('Should round-trip through parse()', () => {
      const sf = new StoryFormat('My Format', '1.2.3', 'Desc', 'Author', 'icon.svg', 'https://example.com', 'MIT', true, '<html>{{STORY_DATA}}</html>');
      const parsed = parseStoryFormat(compileStoryFormat(sf));

      expect(parsed.name).toBe(sf.name);
      expect(parsed.version).toBe(sf.version);
      expect(parsed.description).toBe(sf.description);
      expect(parsed.author).toBe(sf.author);
      expect(parsed.image).toBe(sf.image);
      expect(parsed.url).toBe(sf.url);
      expect(parsed.license).toBe(sf.license);
      expect(parsed.proofing).toBe(sf.proofing);
      expect(parsed.source).toBe(sf.source);
    });
  });
});
