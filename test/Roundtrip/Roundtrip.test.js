import { readFileSync } from 'node:fs';
import { parse as parseTwee } from '../../src/Twee/parse.js';
import { parse as parseTwine2HTML } from '../../src/Twine2HTML/parse.js';
import { compile as compileTwine2HTML } from '../../src/Twine2HTML/compile.js';
import { parse as parseStoryFormat } from '../../src/StoryFormat/parse.js';

describe('Round-trip testing', () => {
  it('Should round-trip Twine 2 HTML to Twee', () => {
    // Read HTML.
    const fr = readFileSync('test/Roundtrip/Files/Example1.html', 'utf-8');

    // Parse HTML.
    const s = parseTwine2HTML(fr);

    // Parse the new Twee.
    const s2 = parseTwee(s.toTwee());

    // Twee adds StoryData.
    // There will be one extra passage in Twee than HTML.
    expect(s2.size()).toBe(s.size());

    // IFID should be the same
    expect(s.ifid).toBe(s2.ifid);
  });

  it('Should round-trip Twee to Twine 2 HTML', () => {
    // Read StoryFormat.
    const storyFormat = readFileSync('test/Roundtrip/Files/harlowe.js', 'utf-8');

    // Parse StoryFormat.
    const sfp = parseStoryFormat(storyFormat);

    // Read Twee.
    const fr = readFileSync('test/Roundtrip/Files/example2.twee', 'utf-8');

    // Parse Twee.
    const story = parseTwee(fr);

    // Write HTML.
    const fr2 = compileTwine2HTML(story, sfp);

    // Parse HTML
    const story2 = parseTwine2HTML(fr2);

    // Number of passages should be the same, too
    expect(story2.size()).toBe(story.size());

    // IFID should be the same
    expect(story.ifid).toBe(story2.ifid);

    // Should have same 'start' name
    expect(story.start).toBe(story2.start);
  });
});
