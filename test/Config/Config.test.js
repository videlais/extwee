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
                "story-format": 'harlowe',
                "mode": "decompile",
                "input": "index.html",
                "output": "index.twee"
            });
        });
    });

    describe('parser()', () => {

        it('should throw an error if the object is not a valid JSON object', () => {
            expect(() => ConfigParser('{')).toThrow();
        });

        it('should extract the StoryFormat and StoryFormatVersion from the JSON object', () => {
            const jsonObject = ConfigReader('test/Config/files/valid.json');
            const contents = ConfigParser(jsonObject);
            expect(contents.StoryFormat).toEqual('harlowe');
            expect(contents.StoryFormatVersion).toEqual('latest');
            expect(contents.Input).toEqual('index.html');
            expect(contents.Output).toEqual('index.twee');
            expect(contents.Mode).toEqual('decompile');
            expect(contents.Twine1Project).toEqual(false);
        });

        it('should not extract options if they do not exist in the JSON object', () => {
            const jsonObject = ConfigReader('test/Config/files/empty.json');
            const contents = ConfigParser(jsonObject);
            expect(contents.StoryFormat).toBeNull();
            expect(contents.StoryFormatVersion).toBe('latest');
            expect(contents.Input).toBeNull();
            expect(contents.Output).toBeNull();
            expect(contents.Mode).toBeNull();
            expect(contents.Twine1Project).toBe(false);
        });

        it('should set StoryFormatVersion to "latest" if it is not present in the JSON object', () => {
            const jsonObject = ConfigReader('test/Config/files/valid.json');
            const contents = ConfigParser(jsonObject);
            expect(contents.StoryFormatVersion).toEqual('latest');
        });

        it('should set Twine1Project to false if it is not present in the JSON object', () => {
            const jsonObject = ConfigReader('test/Config/files/valid.json');
            const contents = ConfigParser(jsonObject);
            expect(contents.Twine1Project).toEqual(false);
        });

        it('Should read story-format, story-format-version, and twine1-project if present', () => {
            const jsonObject = ConfigReader('test/Config/files/full.json');
            const contents = ConfigParser(jsonObject);
            expect(contents.StoryFormat).toEqual('harlowe');
            expect(contents.StoryFormatVersion).toEqual('3.2.0');
            expect(contents.Input).toEqual('index.twee');
            expect(contents.Output).toEqual('index.html');
            expect(contents.Mode).toEqual('compile');
            expect(contents.Twine1Project).toEqual(false);
        });
    });
});