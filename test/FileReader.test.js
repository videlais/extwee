import FileReader from '../src/FileReader.js';

describe('FileReader', () => {
  describe('#readFile()', () => {
    it('Should throw error if file not found', () => {
      expect(() => { FileReader.read('test/FileReader/t2.txt'); }).toThrow();
    });

    it('Should read the contents of a file', () => {
      const fr = FileReader.read('test/FileReader/t1.txt');
      expect(fr).toBe('Gibberish');
    });
  });
});
