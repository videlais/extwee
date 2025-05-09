import { readDirectories } from '../../src/CLI/ProcessConfig/readDirectories.js';
import { readdirSync } from 'node:fs';
import { isDirectory } from '../../src/CLI/isDirectory.js';

jest.mock('node:fs');
jest.mock('../../src/CLI/isDirectory.js');

describe('readDirectories', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an empty array and log an error if the directory does not exist', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        isDirectory.mockReturnValue(false);

        const result = readDirectories('/nonexistent');

        expect(result).toEqual([]);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error: Directory /nonexistent does not exist.');
        consoleErrorSpy.mockRestore();
    });

    it('should return an empty array and log an error if readdirSync throws an error', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        isDirectory.mockReturnValue(true);
        readdirSync.mockImplementation(() => {
            throw new Error('Permission denied');
        });

        const result = readDirectories('/restricted');

        expect(result).toEqual([]);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error reading directory /restricted:', expect.any(Error));
        consoleErrorSpy.mockRestore();
    });

    it('should return an empty array if the directory is empty', () => {
        isDirectory.mockReturnValue(true);
        readdirSync.mockReturnValue([]);

        const result = readDirectories('/empty');

        expect(result).toEqual([]);
    });

    it('should return an array of directories', () => {
        isDirectory.mockReturnValue(true);
        readdirSync.mockReturnValue(['dir1', 'file1', 'dir2']);

        isDirectory.mockImplementation((path) => {
            return path === '/test/dir1' || path === '/test/dir2';
        });

        const result = readDirectories('/test');

        expect(result).toEqual(['dir1', 'dir2']);
    });
    
    it('should return an empty array if the result is not an array', () => {
        isDirectory.mockReturnValue(true);
        readdirSync.mockReturnValue('not an array');

        const result = readDirectories('/test');

        expect(result).toEqual([]);
    });
});