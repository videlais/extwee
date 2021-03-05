import FileReader from '../src/FileReader.js';
import Story from '../src/Story.js';
import Passage from '../src/Passage.js';
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
      s.addPassage(new Passage('Start', 'Content'));
      TweeWriter.write(s, 'test/TweeWriter/test1.twee');
      const fr = FileReader.read('test/TweeWriter/test1.twee');
      const story = TweeParser.parse(fr);
      const p = story.getPassageByName('StoryTitle');
      expect(p.text).toBe('Title');
    });

    test('Should correctly write Twee file with passage tags', function () {
      const s = new Story();
      s.addPassage(new Passage('Start', '', ['tag', 'tags']));
      s.addPassage(new Passage('StoryTitle', 'Title'));
      // Verify only one passage.
      expect(s.size()).toBe(2);

      // Set an ifid property
      s.IFID = 'DE7DF8AD-E4CD-499E-A4E7-C5B98B73449A';

      // Write contents to file.
      TweeWriter.write(s, 'test/TweeWriter/test3.twee');
      // Read file.
      const fr = FileReader.read('test/TweeWriter/test3.twee');
      // Parse file.
      const tp = TweeParser.parse(fr);
      // Verify only two passages
      expect(tp.size()).toBe(2);
    });

    test('Should write format, formatVersion, zoom, and start', function () {
      const s = new Story();
      s.addPassage(new Passage('StoryTitle', 'Title'));
      s.addPassage(new Passage('Start', 'Content'));
      s.addPassage(new Passage('Untitled', 'Some stuff'));

      s.format = 'Test';
      s.formatVersion = '1.2.3';
      s.zoom = 1;
      s.start = 'Untitled';

      TweeWriter.write(s, 'test/TweeWriter/test1.twee');
      const fr = FileReader.read('test/TweeWriter/test1.twee');
      const story2 = TweeParser.parse(fr);
      expect(story2.format).toBe('Test');
    });

    test('Should write tag colors', function () {
      const s = new Story();
      s.addPassage(new Passage('StoryTitle', 'Title'));
      s.addPassage(new Passage('Start', 'Content'));
      s.addPassage(new Passage('Untitled', 'Some stuff'));
      s.tagColors = {
        bar: 'green',
        foo: 'red',
        qaz: 'blue'
      };
      TweeWriter.write(s, 'test/TweeWriter/test5.twee');
      const fr = FileReader.read('test/TweeWriter/test5.twee');
      const story2 = TweeParser.parse(fr);
      expect(story2.tagColors.bar).toBe('green');
    });
  });
});
