import FileReader from '../src/FileReader.js';

describe('FileReader', function () {
  describe('#readFile()', function () {
    test('Should throw error if file not found', function () {
      expect(() => { FileReader.read('test/FileReader/t2.txt'); }).toThrow();
    });

    test('Should read the contents of a file', function () {
      const fr = FileReader.read('test/FileReader/t1.txt');
      expect(fr).toBe('Gibberish');
    });
  });
});
