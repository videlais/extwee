const TweeWriter = require('../src/TweeWriter');
const FileReader = require('../src/FileReader');
const TweeParser = require('../src/TweeParser');
const HTMLParser = require('../src/HTMLParser');
const StoryFormatParser = require('../src/StoryFormatParser');
const HTMLWriter = require('../src/HTMLWriter');
// const Story = require('../src/Story');
// const Passage = require('../src/Passage');

describe('Round-trip testing', () => {
  test('Should round-trip HTML-to-Twee', () => {
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
    // Name should be the same
    expect(s.name).toBe(s2.name);
    // Number of passages should be the same, too
    expect(s2.passages).toHaveLength(s.passages.length);
    // IFID should be the same
    expect(s.metadata.ifid).toBe(s2.metadata.ifid);
    // Should have same 'start' PID
    expect(s.metadata.start).toBe(s2.metadata.start);
  });

  test('Should round-trip Twee-to-HTML', () => {
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
    // Test name
    expect(story.name).toBe(story2.name);
    // Number of passages should be the same, too
    expect(story2.passages).toHaveLength(story.passages.length);
    // IFID should be the same
    expect(story.metadata.ifid).toBe(story2.metadata.ifid);
    // Should have same 'start' PID
    expect(story.metadata.start).toBe(story2.metadata.start);
  });
});
