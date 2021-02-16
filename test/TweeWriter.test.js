import FileReader from '../src/FileReader';
import Story from '../src/Story';
import Passage from '../src/Passage';
import TweeWriter from '../src/TweeWriter.js';
import TweeParser from '../src/TweeParser.js';

describe('TweeWriter', function () {
  describe('#write()', function () {
    test('Should throw error if object passed is not instanceof Story', function () {
      expect(() => { TweeWriter.write({}); }).toThrow();
    });

    test('Should throw error if output file invalid', function () {
      expect(() => { TweeWriter.write(new Story(), ''); }).toThrow();
    });

    test('Should write Twee file', function () {
      const s = new Story();
      s.addPassage(new Passage('StoryData', '{}'));
      s.addPassage(new Passage('StoryTitle', 'Title'));
      s.addPassage(new Passage('Start', 'Title'));
      TweeWriter.write(s, 'test/TweeWriter/test1.twee');
      const fr = FileReader.read('test/TweeWriter/test1.twee');
      const tp = TweeParser.parse(fr);
      expect(tp.storyTitlePassage.text).toBe('Title');
    });

    test('Should correctly write Twee file with passage tags', function () {
      const s = new Story();
      s.addPassage(new Passage('Start', '', ['tag', 'tags']));
      s.addPassage(new Passage('StoryTitle', 'Title'));
      s.addPassage(new Passage('StoryData', '{"ifid": "DE7DF8AD-E4CD-499E-A4E7-C5B98B73449A"}'));
      // Verify only one passage.
      expect(s.size()).toBe(1);

      // Write contents to file.
      TweeWriter.write(s, 'test/TweeWriter/test3.twee');
      // Read file.
      const fr = FileReader.read('test/TweeWriter/test3.twee');
      // Parse file.
      const tp = TweeParser.parse(fr);
      // Verify only one passage
      expect(tp.size()).toBe(1);
    });
  });
});
