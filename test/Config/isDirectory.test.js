import {jest} from '@jest/globals';

// Mock the fs module before importing anything that uses it
const mockStatSync = jest.fn();
jest.unstable_mockModule('node:fs', () => ({
    statSync: mockStatSync
}));

// Now import the modules that depend on the mocked module
const { isDirectory } = await import('../../src/CLI/isDirectory.js');

describe('isDirectory', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return true if the path is a directory', () => {
        const mockStats = { isDirectory: jest.fn(() => true) };
        mockStatSync.mockReturnValue(mockStats);

        const result = isDirectory('/valid/directory/path');
        expect(mockStatSync).toHaveBeenCalledWith('/valid/directory/path');
        expect(mockStats.isDirectory).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    it('should return false if the path is not a directory', () => {
        const mockStats = { isDirectory: jest.fn(() => false) };
        mockStatSync.mockReturnValue(mockStats);

        const result = isDirectory('/valid/file/path');
        expect(mockStatSync).toHaveBeenCalledWith('/valid/file/path');
        expect(mockStats.isDirectory).toHaveBeenCalled();
        expect(result).toBe(false);
    });

    it('should return false and log an error if statSync throws an error', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        mockStatSync.mockImplementation(() => {
            throw new Error('Test error');
        });

        const result = isDirectory('/invalid/path');
        expect(mockStatSync).toHaveBeenCalledWith('/invalid/path');
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error: Test error'));
        expect(result).toBe(false);

        consoleErrorSpy.mockRestore();
    });
});