const FileReader = require('../src/FileReader.js');

describe('FileReader', function () {
  describe('#readFile()', function () {
    it('Should throw error if file not found', function () {
      expect(() => { FileReader.read('test/FileReader/t2.txt'); }).toThrow();
    });

    it('Should read the contents of a file', function () {
      const fr = FileReader.read('test/FileReader/t1.txt');
      expect(fr).toBe('Gibberish');
    });
  });
});
