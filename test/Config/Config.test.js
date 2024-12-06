import {reader as ConfigReader} from '../../src/Config/reader.js';
import {parser as ConfigParser} from '../../src/Config/parser.js';

describe('src/Config/reader.js', () => {
    describe('reader()', () => {
        it('should throw an error if the file does not exist', () => {
            expect(() => ConfigReader('non-existent-file.json')).toThrow('Error: File non-existent-file.json not found');
        });

        it('should throw an error if the file is not a valid JSON file', () => {
            expect(() => ConfigReader('test/Config/files/invalid.json')).toThrow();
        });

        it('should return the parsed JSON contents of the file', () => {
            const contents = ConfigReader('test/Config/files/valid.json');
            expect(contents).toEqual({
                "story-format": 'Harlowe',
                "story-title": "My Story",
                "story-version": "2.0.1"
            });
        });
    });

    describe('parser()', () => {

        it('should throw an error if the object is not a valid JSON object', () => {
            expect(() => ConfigParser('{')).toThrow();
        });

        it('should extract the StoryFormat, StoryTitle, and StoryVersion from the JSON object', () => {
            const jsonObject = ConfigReader('test/Config/files/valid.json');
            const contents = ConfigParser(jsonObject);
            expect(contents.StoryFormat).toEqual('Harlowe');
            expect(contents.StoryTitle).toEqual('My Story');
            expect(contents.StoryVersion).toEqual('2.0.1');
        });

        it('should not extract the StoryFormat, StoryTitle, and StoryVersion if they do not exist in the JSON object', () => {
            const jsonObject = ConfigReader('test/Config/files/empty.json');
            const contents = ConfigParser(jsonObject);
            expect(contents.StoryFormat).toBeNull();
            expect(contents.StoryTitle).toBeNull();
            expect(contents.StoryVersion).toBeNull();
        });
    });
});