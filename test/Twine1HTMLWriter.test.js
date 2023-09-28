import Twine1HTMLWriter from '../src/Twine1HTMLWriter.js';
import Story from '../src/Story.js';
import fs from 'fs';
import Passage from '../src/Passage.js';

describe('Twine1HTMLWriter', () => {
  describe('write()', () => {
    it('story should be instanceof Story', () => {
      expect(() => { Twine1HTMLWriter.write('test/Twine1HTMLWriter/test.html', {}); }).toThrow();
    });

    it('Should create an empty file without valid header.html', function () {
      // Create story.
      const s = new Story();

      // Write file.
      Twine1HTMLWriter.write('test/Twine1HTMLWriter/test.html', s);

      // Read file.
      const result = fs.readFileSync('test/Twine1HTMLWriter/test.html');

      // Test.
      expect(result.length).toBe(0);
    });

    it('Should replace "VERSION" and "TIME" in mock header.html file', function () {
      // Create story.
      const s = new Story();

      // Set creator.
      s.creator = 'Test1';

      // Read mock header.html
      const header = fs.readFileSync('test/Twine1HTMLWriter/test1.html', 'utf-8');

      // Write file.
      Twine1HTMLWriter.write('test/Twine1HTMLWriter/test2.html', s, header);

      // Read file.
      const result = fs.readFileSync('test/Twine1HTMLWriter/test2.html');

      // Test for creator.
      expect(result.includes('Test1')).toBe(true);

      // Test for time.
      expect(result.includes(new Date().getFullYear().toString())).toBe(true);
    });

    it('Should include Twine engine code', function () {
      // Create story.
      const s = new Story();

      // Read mock header.html
      const header = fs.readFileSync('test/Twine1HTMLWriter/engineTest.html', 'utf-8');

      // Write file.
      Twine1HTMLWriter.write('test/Twine1HTMLWriter/test3.html', s, header);

      // Read file.
      const result = fs.readFileSync('test/Twine1HTMLWriter/test3.html');

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
      const header = fs.readFileSync('test/Twine1HTMLWriter/jonah-1.4.2/header.html', 'utf-8');

      // Read code.js.
      const codeJS = fs.readFileSync('test/Twine1HTMLWriter/jonah-1.4.2/code.js', 'utf-8');

      // Write file.
      Twine1HTMLWriter.write('test/Twine1HTMLWriter/test4.html', s, header, 'jonah', codeJS);

      // Read file.
      const result = fs.readFileSync('test/Twine1HTMLWriter/test4.html');

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
      const header = fs.readFileSync('test/Twine1HTMLWriter/jonah-1.4.2/header.html', 'utf-8');

      // Read code.js.
      const codeJS = fs.readFileSync('test/Twine1HTMLWriter/jonah-1.4.2/code.js', 'utf-8');

      // Write file.
      Twine1HTMLWriter.write('test/Twine1HTMLWriter/test5.html', s, header, 'jonah', codeJS, { jquery: true, modernizr: true });

      // Read file.
      const result = fs.readFileSync('test/Twine1HTMLWriter/test5.html');

      // Test for code.js.
      expect(result.includes('Tale.prototype.canBookmark')).toBe(true);

      // Test for passage.
      expect(result.includes('tiddler="Start"')).toBe(true);

      // Test for story size.
      expect(result.includes('data-size="1"')).toBe(true);

      // Test for jQuery
      expect(result.includes('jQuery v1.11.0')).toBe(true);

      // Test for Modernizr
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
      const header = fs.readFileSync('test/Twine1HTMLWriter/jonah-1.4.2/header.html', 'utf-8');

      // Read code.js.
      const codeJS = fs.readFileSync('test/Twine1HTMLWriter/jonah-1.4.2/code.js', 'utf-8');

      // Write file.
      Twine1HTMLWriter.write('test/Twine1HTMLWriter/test5.html', s, header, 'jonah', codeJS, {});

      // Read file.
      const result = fs.readFileSync('test/Twine1HTMLWriter/test5.html');

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

    it('Should throw error if cannot write to file', function () {
      // Create story.
      const s = new Story();

      // Add passage.
      s.addPassage(new Passage('Start', 'Work'));

      // Set story start.
      s.start = 'Start';

      // Read header.html.
      const header = fs.readFileSync('test/Twine1HTMLWriter/jonah-1.4.2/header.html', 'utf-8');

      // Read code.js.
      const codeJS = fs.readFileSync('test/Twine1HTMLWriter/jonah-1.4.2/code.js', 'utf-8');

      // Expect error
      expect(() => { Twine1HTMLWriter.write('unknown/file', s, header, 'jonah', codeJS); }).toThrow();
    });
  });
});
