import {jest} from '@jest/globals';

// Mock the fs module and isDirectory before importing anything that uses them
const mockReaddirSync = jest.fn();
const mockIsDirectory = jest.fn();

jest.unstable_mockModule('node:fs', () => ({
    readdirSync: mockReaddirSync
}));

jest.unstable_mockModule('../../src/CLI/isDirectory.js', () => ({
    isDirectory: mockIsDirectory
}));

// Now import the modules that depend on the mocked modules
const { readDirectories } = await import('../../src/CLI/ProcessConfig/readDirectories.js');

describe('readDirectories', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an empty array and log an error if the directory does not exist', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        mockIsDirectory.mockReturnValue(false);

        const result = readDirectories('/nonexistent');

        expect(result).toEqual([]);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error: Directory /nonexistent does not exist.');
        consoleErrorSpy.mockRestore();
    });

    it('should return an empty array and log an error if readdirSync throws an error', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        mockIsDirectory.mockReturnValue(true);
        mockReaddirSync.mockImplementation(() => {
            throw new Error('Permission denied');
        });

        const result = readDirectories('/restricted');

        expect(result).toEqual([]);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error reading directory /restricted:', expect.any(Error));
        consoleErrorSpy.mockRestore();
    });

    it('should return an empty array if the directory is empty', () => {
        mockIsDirectory.mockReturnValue(true);
        mockReaddirSync.mockReturnValue([]);

        const result = readDirectories('/empty');

        expect(result).toEqual([]);
    });

    it('should return an array of directories', () => {
        mockIsDirectory.mockReturnValue(true);
        mockReaddirSync.mockReturnValue(['dir1', 'file1', 'dir2']);

        mockIsDirectory.mockImplementation((path) => {
            return path === '/test/dir1' || path === '/test/dir2';
        });

        const result = readDirectories('/test');

        expect(result).toEqual(['dir1', 'dir2']);
    });
    
    it('should return an empty array if the result is not an array', () => {
        mockIsDirectory.mockReturnValue(true);
        mockReaddirSync.mockReturnValue('not an array');

        const result = readDirectories('/test');

        expect(result).toEqual([]);
    });
});