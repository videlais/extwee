import Twine1HTMLWriter from '../src/Twine2HTMLWriter.js';
import Story from '../src/Story.js';

describe('Twine1HTMLWriter', () => {
  describe('write()', () => {
    it('story should be instanceof Story', () => {
      expect(() => { Twine1HTMLWriter.write('test/Twine1HTMLWriter/test.html', {}); }).toThrow();
    });

    it('storyFormat should be instanceof StoryFormat', () => {
      const s = new Story();
      expect(() => { Twine1HTMLWriter.write('test/Twine1HTMLWriter/test.html', s, {}); }).toThrow();
    });
  });
});
