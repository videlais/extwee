import TweeWriter from '../src/TweeWriter.js';
import FileReader from '../src/FileReader.js';
import TweeParser from '../src/TweeParser.js';
import HTMLParser from '../src/HTMLParser.js';
import StoryFormatParser from '../src/StoryFormatParser.js';
import HTMLWriter from '../src/HTMLWriter.js';

describe('Round-trip testing', () => {
  it('Should round-trip HTML-to-Twee', () => {
    // Read HTML
    const fr = FileReader.read('test/Roundtrip/Example1.html');
    // Parse HTML
    const s = HTMLParser.parse(fr);
    // Write Story into Twee
    TweeWriter.write(s, 'test/Roundtrip/example1.twee');
    // Read new Twee file
    const fr2 = FileReader.read('test/Roundtrip/example1.twee');
    // Parse the new Twee
    const s2 = TweeParser.parse(fr2);
    // Number of passages should be the same, too
    expect(s2.size()).toBe(s.size());
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
    HTMLWriter.write('test/Roundtrip/round.html', story, sfp);
    // Read HTML
    const fr2 = FileReader.read('test/Roundtrip/round.html');
    // Parse HTML
    const story2 = HTMLParser.parse(fr2);
    // Number of passages should be the same, too
    expect(story2.size()).toBe(story.size());
    // IFID should be the same
    expect(story.ifid).toBe(story2.ifid);
    // Should have same 'start' name
    expect(story.start).toBe(story2.start);
  });
});
