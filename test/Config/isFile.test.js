import { isFile } from '../../src/CLI/isFile.js';
import { statSync } from 'node:fs';

// Mock the statSync function from 'fs'.
jest.mock('node:fs', () => ({
    statSync: jest.fn(),
}));

describe('isFile', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return true if the path is a valid file', () => {
        // Mock statSync to return an object with isFile() returning true.
        statSync.mockReturnValue({
            isFile: jest.fn(() => true),
        });

        const result = isFile('/path/to/file');
        expect(result).toBe(true);
        expect(statSync).toHaveBeenCalledWith('/path/to/file');
    });

    it('should return false if the path is not a valid file', () => {
        // Mock statSync to return an object with isFile() returning false.
        statSync.mockReturnValue({
            isFile: jest.fn(() => false),
        });

        const result = isFile('/path/to/directory');
        expect(result).toBe(false);
        expect(statSync).toHaveBeenCalledWith('/path/to/directory');
    });

    it('should return false and log an error if statSync throws an error', () => {
        // Mock statSync to throw an error.
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        statSync.mockImplementation(() => {
            throw new Error('File not found');
        });

        const result = isFile('/invalid/path');
        expect(result).toBe(false);
        expect(statSync).toHaveBeenCalledWith('/invalid/path');
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error: Error: File not found'));

        consoleErrorSpy.mockRestore();
    });
});