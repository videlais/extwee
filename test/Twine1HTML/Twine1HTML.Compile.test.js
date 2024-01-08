import { compile as compileTwine1HTML } from '../../src/Twine1HTML/compile.js';
import { Story } from '../../src/Story.js';
import { readFileSync } from 'fs';
import Passage from '../../src/Passage.js';

describe('Twine1HTMLCompiler', () => {
  describe('compile()', () => {
    it('story should be instanceof Story', () => {
      expect(() => { compileTwine1HTML({}); }).toThrow();
    });

    it('Should create an empty file without valid header.html', function () {
      // Create story.
      const s = new Story();

      // Compile Twine 1.
      const t1 = compileTwine1HTML(s);

      // Test.
      expect(t1.length).toBe(0);
    });

    it('Should replace "VERSION" and "TIME" in mock header.html file', function () {
      // Create story.
      const s = new Story();

      // Set creator.
      s.creator = 'Test1';

      // Read mock header.html
      const header = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/test1.html', 'utf-8');

      // Read engine code.
      const engine = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/Twine1/engine.js', 'utf-8');

      // Compile file.
      const result = compileTwine1HTML(s, engine, header);

      // Test for creator.
      expect(result.includes('Test1')).toBe(true);

      // Test for time.
      expect(result.includes(new Date().getFullYear().toString())).toBe(true);
    });

    it('Should include Twine engine code', function () {
      // Create story.
      const s = new Story();

      // Read mock header.html
      const header = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/engineTest.html', 'utf-8');

      // Read engine code.
      const engine = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/Twine1/engine.js', 'utf-8');

      // Compile file.
      compileTwine1HTML(s, engine, header);

      // Read file.
      const result = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/test3.html', 'utf-8');

      // Test for engine.
      expect(result.includes('function clone(a)')).toBe(true);
    });

    it('Should include story format based on name', function () {
      // Create story.
      const s = new Story();

      // Add passage.
      s.addPassage(new Passage('Start', 'Work'));

      // Set story start.
      s.start = 'Start';

      // Read header.html.
      const header = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/jonah-1.4.2/header.html', 'utf-8');

      // Read code.js.
      const codeJS = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/jonah-1.4.2/code.js', 'utf-8');

      // Read engine code.
      const engine = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/Twine1/engine.js', 'utf-8');

      // Compile file.
      const result = compileTwine1HTML(s, engine, header, 'jonah', codeJS);

      // Test for code.js.
      expect(result.includes('Tale.prototype.canBookmark')).toBe(true);

      // Test for passage.
      expect(result.includes('tiddler="Start"')).toBe(true);

      // Test for story size.
      expect(result.includes('data-size="1"')).toBe(true);
    });

    it('Should include story format based on name with jQuery and Modernizr', function () {
      // Create story.
      const s = new Story();

      // Add passage.
      s.addPassage(new Passage('Start', 'Work'));

      // Set story start.
      s.start = 'Start';

      // Read header.html.
      const header = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/jonah-1.4.2/header.html', 'utf-8');

      // Read code.js.
      const codeJS = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/jonah-1.4.2/code.js', 'utf-8');

      // Read engine code.
      const engine = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/Twine1/engine.js', 'utf-8');

      // Read Modernizr.
      const Modernizr = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/Twine1/modernizr.js');

      // Read jQuery.
      const jQuery = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/Twine1/jquery.js');

      // Compile file.
      const result = compileTwine1HTML(s, engine, header, 'jonah', codeJS, { jquery: jQuery, modernizr: Modernizr });

      // Test for code.js.
      expect(result.includes('Tale.prototype.canBookmark')).toBe(true);

      // Test for passage.
      expect(result.includes('tiddler="Start"')).toBe(true);

      // Test for story size.
      expect(result.includes('data-size="1"')).toBe(true);

      // Test for jQuery.
      expect(result.includes('jQuery v1.11.0')).toBe(true);

      // Test for Modernizr.
      expect(result.includes('Modernizr 2.6.2')).toBe(true);
    });

    it('Should include story format based on name without jQuery and Modernizr', function () {
      // Create story.
      const s = new Story();

      // Add passage.
      s.addPassage(new Passage('Start', 'Work'));

      // Set story start.
      s.start = 'Start';

      // Read header.html.
      const header = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/jonah-1.4.2/header.html', 'utf-8');

      // Read code.js.
      const codeJS = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/jonah-1.4.2/code.js', 'utf-8');

      // Read engine code.
      const engine = readFileSync('test/Twine1HTML/Twine1HTMLCompiler/Twine1/engine.js', 'utf-8');

      // Compile file.
      const result = compileTwine1HTML(s, engine, header, 'jonah', codeJS, {});

      // Test for code.js.
      expect(result.includes('Tale.prototype.canBookmark')).toBe(true);

      // Test for passage.
      expect(result.includes('tiddler="Start"')).toBe(true);

      // Test for story size.
      expect(result.includes('data-size="1"')).toBe(true);

      // Test for jQuery
      expect(result.includes('jQuery v1.11.0')).not.toBe(true);

      // Test for Modernizr
      expect(result.includes('Modernizr 2.6.2')).not.toBe(true);
    });
  });
});
