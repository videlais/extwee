import FileReader from '../src/FileReader.js';
import TweeParser from '../src/TweeParser.js';
import Twine2HTMLParser from '../src/Twine2HTMLParser.js';
import Twine2HTMLWriter from '../src/Twine2HTMLWriter.js';
import StoryFormatParser from '../src/StoryFormatParser.js';

describe('Round-trip testing', () => {
  it('Should round-trip HTML-to-Twee', () => {
    // Read HTML.
    const fr = FileReader.read('test/Roundtrip/Example1.html');

    // Parse HTML.
    const s = Twine2HTMLParser.parse(fr);

    // Parse the new Twee.
    const s2 = TweeParser.parse(s.toTwee());

    // Twee adds StoryData.
    // There will be one extra passage in Twee than HTML.
    expect(s2.size()).toBe(s.size() + 1);

    // IFID should be the same
    expect(s.ifid).toBe(s2.ifid);
  });

  it('Should round-trip Twee-to-HTML', () => {
    // Read StoryFormat
    const storyFormat = FileReader.read('test/Roundtrip/harlowe.js');

    // Parse StoryFormat
    const sfp = StoryFormatParser.parse(storyFormat);

    // Read Twee
    const fr = FileReader.read('test/Roundtrip/example2.twee');

    // Parse Twee
    const story = TweeParser.parse(fr);

    // Write HTML
    Twine2HTMLWriter.write('test/Roundtrip/round.html', story, sfp);

    // Read HTML
    const fr2 = FileReader.read('test/Roundtrip/round.html');

    // Parse HTML
    const story2 = Twine2HTMLParser.parse(fr2);

    // Number of passages should be the same, too
    expect(story2.size()).toBe(story.size());

    // IFID should be the same
    expect(story.ifid).toBe(story2.ifid);

    // Should have same 'start' name
    expect(story.start).toBe(story2.start);
  });
});
