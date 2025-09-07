import {jest} from '@jest/globals';

// Mock the fs module before importing anything that uses it
const mockStatSync = jest.fn();
jest.unstable_mockModule('node:fs', () => ({
    statSync: mockStatSync
}));

// Now import the modules that depend on the mocked module
const { isFile } = await import('../../src/CLI/isFile.js');

describe('isFile', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return true if the path is a valid file', () => {
        // Mock statSync to return an object with isFile() returning true.
        mockStatSync.mockReturnValue({
            isFile: jest.fn(() => true),
        });

        const result = isFile('/path/to/file');
        expect(result).toBe(true);
        expect(mockStatSync).toHaveBeenCalledWith('/path/to/file');
    });

    it('should return false if the path is not a valid file', () => {
        // Mock statSync to return an object with isFile() returning false.
        mockStatSync.mockReturnValue({
            isFile: jest.fn(() => false),
        });

        const result = isFile('/path/to/directory');
        expect(result).toBe(false);
        expect(mockStatSync).toHaveBeenCalledWith('/path/to/directory');
    });

    it('should return false and log an error if statSync throws an error', () => {
        // Mock statSync to throw an error.
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        mockStatSync.mockImplementation(() => {
            throw new Error('File not found');
        });

        const result = isFile('/invalid/path');
        expect(result).toBe(false);
        expect(mockStatSync).toHaveBeenCalledWith('/invalid/path');
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error: Error: File not found'));

        consoleErrorSpy.mockRestore();
    });
});