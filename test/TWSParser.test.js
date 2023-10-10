import fs from 'node:fs';
import TWSParser from '../src/TWSParser.js';

describe('TWSParser', () => {
  describe('#parse()', () => {
    it('Should throw error if input is not Buffer', function () {
      expect(() => { TWSParser.parse(0); }).toThrow();
    });

    describe('Story parsing', function () {
      let r = null;

      beforeAll(() => {
        const contents = fs.readFileSync('./test/TWSParser/Example1.tws', 'binary');
        const b = Buffer.from(contents, 'binary');
        r = TWSParser.parse(b);
      });

      it('Should parse StoryTitle', function () {
        expect(r.name).toBe('Untitled Story');
      });

      it('Should parse zoom', function () {
        expect(r.zoom).toBe(1);
      });

      it('Should parse start passage', function () {
        expect(r.start).toBe('Start');
      });
    });

    describe('Passage parsing', function () {
      let r = null;

      beforeAll(() => {
        const contents = fs.readFileSync('./test/TWSParser/Example5.tws', 'binary');
        const b = Buffer.from(contents, 'binary');
        r = TWSParser.parse(b);
      });

      it('Should parse passage - tags', function () {
        const p = r.getPassageByName('Untitled Passage 1');
        expect(p.tags.length).toBe(3);
      });

      it('Should parse passage - text', function () {
        const p = r.getPassageByName('Untitled Passage 2');
        expect(p.text).toBe('dd');
      });

      it('Should set Story start (to start passage)', function () {
        expect(r.start).toBe('Start');
      });
    });

    describe('Exceptions and parsing issues', function () {
      it('Should throw error if parsing a Buffer but not pickle data', function () {
        const contents = 'Test';
        const b = Buffer.from(contents);
        expect(() => { TWSParser.parse(b); }).toThrow();
      });

      it('Should create default Story object if pickle data but not TWS data', function () {
        const contents = fs.readFileSync('./test/TWSParser/nostory.tws', 'binary');
        const b = Buffer.from(contents, 'binary');
        const r = TWSParser.parse(b);
        expect(r.size()).toBe(0);
      });

      it('Should parse storyPanel but no scale', function () {
        const contents = fs.readFileSync('./test/TWSParser/noscale.tws', 'binary');
        const b = Buffer.from(contents, 'binary');
        const r = TWSParser.parse(b);
        expect(r.zoom).toBe(0);
      });
    });
  });
});
