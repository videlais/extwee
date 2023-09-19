import Story from '../src/Story.js';
import StoryFormat from '../src/StoryFormat.js';
import Passage from '../src/Passage.js';
import JSONWriter from '../src/JSONWriter.js';

describe('JSONWriter', () => {

    describe('fromStory()', function() {

        let s_ = new Story();
        let st_ = new StoryFormat();

        beforeEach(() => {
            s_ = new Story();
            st_ = new StoryFormat();
        });

        it('Should throw error if not Story', function() {
            expect(() => {JSONWriter.fromStory(st_)}).toThrow();
        });

        it('Should have default Story values', function() {
            // Convert to string and then back to object.
            const result = JSON.parse(JSONWriter.fromStory(s_));
            expect(result.name).toBe('');
            expect(Object.keys(result.tagColors).length).toBe(0);
            expect(result.ifid).toBe('');
            expect(result.start).toBe('');
            expect(result.formatVersion).toBe('');
            expect(result.format).toBe('');
            expect(result.creator).toBe('extwee');
            expect(result.creatorVersion).toBe('2.2.0');
            expect(result.zoom).toBe(0);
            expect(Object.keys(result.metadata).length).toBe(0);
        });

        it('Should have passage data', function() {
            // Add a passage.
            s_.addPassage(new Passage("Example", "Test"));
            // Convert to string and then back to object.
            const result = JSON.parse(JSONWriter.fromStory(s_));
            expect(result.passages.length).toBe(1);
        });
    });

    describe('fromPassage()', function() {

        let p_ = new Passage();
        let s_ = new Story();

        beforeEach(() => {
            p_ = new Passage();
            s_ = new Story();
        });

        it('Should throw error if not Passage', function() {
            expect(() => {JSONWriter.fromPassage(s_)}).toThrow();
        });

        it('Should hold default values', function() {
            const r = JSON.parse(JSONWriter.fromPassage(p_));
            expect(r.name).toBe('');
            expect(r.text).toBe('');
            expect(r.tags.length).toBe(0);
            expect(Object.keys(r.metadata).length).toBe(0);
        });
    });

    describe('fromStoryFormat()', function() {

        let p_ = new Passage();
        let st_ = new StoryFormat();

        beforeEach(() => {
            st_ = new StoryFormat();
        });

        it('Should throw error if not StoryFormat', function() {
            expect(() => {JSONWriter.fromStoryFormat(p_)}).toThrow();
        });

        it('Should hold default values', function() {
            const r = JSON.parse(JSONWriter.fromStoryFormat(st_));
            expect(r.name).toBe('');
            expect(r.version).toBe('');
            expect(r.description).toBe('');
            expect(r.author).toBe('');
            expect(r.image).toBe('');
            expect(r.url).toBe('');
            expect(r.license).toBe('');
            expect(r.proofing).toBe(false);
            expect(r.source).toBe('');
        });
    });
});
