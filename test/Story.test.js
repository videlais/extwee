const FileReader = require('../src/FileReader.js');
const TweeParser = require('../src/TweeParser.js');
const HTMLParser = require('../src/HTMLParser');
const Story = require('../src/Story.js');
const Passage = require('../src/Passage');

describe('Story', function () {
  describe('#constructor()', function () {
    test('Should have default values', function () {
      const s = new Story();
      expect(s.name).toBe('Unknown');
    });
  });

  describe('#getStylePassages()', function () {
    test('Should return empty array when no stylesheet-tagged passages are present', function () {
      const s = new Story();
      expect(s.getStylePassages()).toHaveLength(0);
    });

    test('Should return correct number of stylesheet-tagged passages', function () {
      const fr = FileReader.read('test/Story/test.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.getStylePassages()).toHaveLength(2);
    });
  });

  describe('#getScriptPassages()', function () {
    test('Should return empty array when no script-tagged passages are present', function () {
      const s = new Story();
      expect(s.getScriptPassages()).toHaveLength(0);
    });

    test('Should return correct number of script-tagged passages', function () {
      const fr = FileReader.read('test/Story/test.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.getScriptPassages()).toHaveLength(2);
    });
  });

  describe('#deleteAllByTag()', function () {
    test('Should do nothing if internal passages array is empty', function () {
      const s = new Story();
      s.passages = [];
      s.deleteAllByTag();
      expect(s.passages).toHaveLength(0);
    });

    test('Should remove passages based on tag', function () {
      const fr = FileReader.read('test/Story/test.twee');
      const tp = TweeParser.parse(fr);
      tp.deleteAllByTag('script');
      expect(tp.getScriptPassages()).toHaveLength(0);
    });
  });

  describe('#getPassageByName()', function () {
    test('Should return Passage based on name', function () {
      const s = new Story();
      const p = new Passage('Name');
      s.passages.push(p);
      expect(s.getPassageByName('Name').name).toBe('Name');
    });

    test('Should return null if not found', function () {
      const s = new Story();
      const p = new Passage('Name');
      s.passages.push(p);
      expect(s.getPassageByName('Another')).toBe(null);
    });

    test('Should return null with default parameter', function () {
      const s = new Story();
      expect(s.getPassageByName()).toBe(null);
    });
  });

  describe('#getPassageByPID()', function () {
    test('Should return Passage based on name', function () {
      const s = new Story();
      const p = new Passage('Name', [], {}, '', 12);
      s.passages.push(p);
      expect(s.getPassageByPID(12).pid).toBe(12);
    });

    test('Should return null if not found', function () {
      const s = new Story();
      const p = new Passage('Name', [], {}, '', 12);
      s.passages.push(p);
      expect(s.getPassageByPID(1)).toBe(null);
    });

    test('Should return null with default parameter', function () {
      const s = new Story();
      expect(s.getPassageByPID()).toBe(null);
    });
  });

  describe('#getStartingPassage()', function () {
    test('Should be null if no passages exist', function () {
      const s = new Story();
      expect(s.getStartingPassage()).toBe(null);
    });

    test('Should return correct PID of Start passage', function () {
      const fr = FileReader.read('test/Story/test.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.getStartingPassage()).toBe(2);
    });

    test('Should return correct PID of Start metadata passage (skipping numbering of StoryTitle and StoryData passages)', function () {
      const fr = FileReader.read('test/Story/startmeta.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.getStartingPassage()).toBe(2);
    });

    test('Should return correct PID of startnode when Story generated from HTML', function () {
      const fr = FileReader.read('test/HTMLParser/Example1.html');
      const tp = HTMLParser.parse(fr);
      expect(tp.getStartingPassage()).toBe(1);
    });
  });
});
