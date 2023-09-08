import FileReader from '../src/FileReader.js';

describe('FileReader', () => {
  describe('#read()', () => {
    it('Should throw error if file not found', () => {
      expect(() => { FileReader.read('test/FileReader/t2.txt'); }).toThrow();
    });

    it('Should read the contents of a file', () => {
      const fr = FileReader.read('test/FileReader/t1.txt');
      expect(fr).toBe('Gibberish');
    });
  });
  describe('#readBinaryAsBuffer()', () => {
    it('Should throw error if file not found', () => {
      expect(() => { FileReader.readBinaryAsBuffer('test/FileReader/Example2.tws'); }).toThrow();
    });

    it('Should read the binary contents of a file and return a Buffer', () => {
      const fr = FileReader.readBinaryAsBuffer('test/FileReader/Example1.tws');
      expect(Buffer.isBuffer(fr)).toBe(true);
    });
  });
});
