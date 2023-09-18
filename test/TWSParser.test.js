import FileReader from '../src/FileReader.js';
import TWSParser from '../src/TWSParser.js';

describe('TWSParser', () => {
    describe('#parse()', () => {
        it('Should throw error if input is not Buffer', function() {
            expect(() => {TWSParser.parse(0)}).toThrow();
        });

        describe("Story parsing", function() {

            let r = null;

            beforeAll(() => {
                const b = FileReader.readBinaryAsBuffer('./test/TWSParser/Example1.tws');
                r = TWSParser.parse(b);
            });

            it('Should parse StoryTitle', function() {
                expect(r.name).toBe("Untitled Story");
            });
    
            it('Should parse zoom', function() {
                expect(r.zoom).toBe(1);
            });
    
            it('Should parse start passage', function() {
                expect(r.start).toBe("Start");
            });
        });

        describe("Passage parsing", function() {

            let r = null;

            beforeAll(() => {
                const b = FileReader.readBinaryAsBuffer('./test/TWSParser/Example1.tws');
                r = TWSParser.parse(b);
            });

            it('Should parse passage - tags', function() {
                
            });
    
            it('Should parse passage - text', function() {
    
            });
    
            it('Should set Story start (to start passage)', function() {
    
            });
        });
    });
});