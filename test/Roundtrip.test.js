import fs from 'node:fs';
import TweeParser from '../src/TweeParser.js';
import Twine2HTMLParser from '../src/Twine2HTMLParser.js';
import Twine2HTMLCompiler from '../src/Twine2HTMLCompiler.js';
import StoryFormatParser from '../src/StoryFormatParser.js';

describe('Round-trip testing', () => {
  it('Should round-trip Twine 2 HTML to Twee', () => {
    // Read HTML.
    const fr = fs.readFileSync('test/Roundtrip/Example1.html', 'utf-8');

    // Parse HTML.
    const s = Twine2HTMLParser.parse(fr);

    // Parse the new Twee.
    const s2 = TweeParser.parse(s.toTwee());

    // Twee adds StoryData.
    // There will be one extra passage in Twee than HTML.
    expect(s2.size()).toBe(s.size());

    // IFID should be the same
    expect(s.ifid).toBe(s2.ifid);
  });

  it('Should round-trip Twee to Twine 2 HTML', () => {
    // Read StoryFormat.
    const storyFormat = fs.readFileSync('test/Roundtrip/harlowe.js', 'utf-8');

    // Parse StoryFormat.
    const sfp = StoryFormatParser.parse(storyFormat);

    // Read Twee.
    const fr = fs.readFileSync('test/Roundtrip/example2.twee', 'utf-8');

    // Parse Twee.
    const story = TweeParser.parse(fr);

    // Write HTML.
    const fr2 = Twine2HTMLCompiler.compile(story, sfp);

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
