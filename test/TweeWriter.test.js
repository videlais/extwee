const TweeWriter = require('../src/TweeWriter');
const FileReader = require('../src/FileReader');
const TweeParser = require('../src/TweeParser');
const Story = require('../src/Story');
const Passage = require('../src/Passage');

describe('TweeWriter', function () {
  describe('#write()', function () {
    it('Should throw error if object passed is not instanceof Story', function () {
      expect(() => { TweeWriter.write({}); }).toThrow();
    });

    it('Should throw error if output file invalid', function () {
      expect(() => { TweeWriter.write(new Story(), ''); }).toThrow();
    });

    it('Should write Twee file', function () {
      const s = new Story();
      TweeWriter.write(s, 'test/TweeWriter/test1.twee');
      const fr = FileReader.read('test/TweeWriter/test1.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.name).toBe('Unknown');
    });

    it('Should correctly write Twee file with passage metadata', function () {
      const s = new Story();
      const p = new Passage('Start', [], { position: '100,100' });
      s.passages = [];
      s.passages.push(p);
      TweeWriter.write(s, 'test/TweeWriter/test2.twee');
      const fr = FileReader.read('test/TweeWriter/test2.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.passages[0].metadata.position).toBe('100,100');
    });

    it('Should correctly write Twee file with passage tags', function () {
      const s = new Story();
      s.name = 'TweeWriter';
      const p = new Passage('Start', ['tag', 'tags'], { position: '100,100' });
      s.passages.push(p);
      TweeWriter.write(s, 'test/TweeWriter/test3.twee');
      const fr = FileReader.read('test/TweeWriter/test3.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.passages[0].tags.length).toBe(2);
    });

    it('Should throw error if story.metadata is not an object', function () {
      const s = new Story();
      s.metadata = 2;
      expect(() => { TweeWriter.write(s, 'test/TweeWriter/test4.twee'); }).toThrow();
    });
  });
});
