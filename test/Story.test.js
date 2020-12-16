const FileReader = require('../src/FileReader.js');
const TweeParser = require('../src/TweeParser.js');
const Story = require('../src/Story.js');

describe('Story', function () {
  describe('#constructor()', function () {
    it('Should have default values', function () {
      const s = new Story();
      expect(s.name).toBe('Unknown');
    });
  });

  describe('#getStylePassages()', function () {
    it('Should return empty array when no stylesheet-tagged passages are present', function () {
      const s = new Story();
      expect(s.getStylePassages()).toHaveLength(0);
    });

    it('Should return correct number of stylesheet-tagged passages', function () {
      const fr = FileReader.read('test/Story/test.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.getStylePassages()).toHaveLength(2);
    });
  });

  describe('#getScriptPassages()', function () {
    it('Should return empty array when no script-tagged passages are present', function () {
      const s = new Story();
      expect(s.getScriptPassages()).toHaveLength(0);
    });

    it('Should return correct number of script-tagged passages', function () {
      const fr = FileReader.read('test/Story/test.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.getScriptPassages()).toHaveLength(2);
    });
  });

  describe('#deleteAllByTag()', function () {
    it('Should do nothing if internal passages array is empty', function () {
      const s = new Story();
      s.passages = [];
      s.deleteAllByTag();
      expect(s.passages).toHaveLength(0);
    });

    it('Should remove passages based on tag', function () {
      const fr = FileReader.read('test/Story/test.twee');
      const tp = TweeParser.parse(fr);
      tp.deleteAllByTag('script');
      expect(tp.getScriptPassages()).toHaveLength(0);
    });
  });

  describe('#getStartingPassage()', function () {
    it('Should throw error if no passages exist', function () {
      const s = new Story();
      expect(() => { s.getStartingPassage(); }).toThrow();
    });

    it('Should return correct PID of Start passage (skipping numbering of StoryTitle and StoryData passages)', function () {
      const fr = FileReader.read('test/Story/test.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.getStartingPassage()).toBe(1);
    });

    it('Should return correct PID of Start metadata passage (skipping numbering of StoryTitle and StoryData passages)', function () {
      const fr = FileReader.read('test/Story/startmeta.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.getStartingPassage()).toBe(1);
    });
  });
});
