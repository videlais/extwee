import { isDirectory } from '../../src/CLI/isDirectory';
import { statSync } from 'node:fs';

jest.mock('node:fs');

describe('isDirectory', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return true if the path is a directory', () => {
        const mockStats = { isDirectory: jest.fn(() => true) };
        statSync.mockReturnValue(mockStats);

        const result = isDirectory('/valid/directory/path');
        expect(statSync).toHaveBeenCalledWith('/valid/directory/path');
        expect(mockStats.isDirectory).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    it('should return false if the path is not a directory', () => {
        const mockStats = { isDirectory: jest.fn(() => false) };
        statSync.mockReturnValue(mockStats);

        const result = isDirectory('/valid/file/path');
        expect(statSync).toHaveBeenCalledWith('/valid/file/path');
        expect(mockStats.isDirectory).toHaveBeenCalled();
        expect(result).toBe(false);
    });

    it('should return false and log an error if statSync throws an error', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        statSync.mockImplementation(() => {
            throw new Error('Test error');
        });

        const result = isDirectory('/invalid/path');
        expect(statSync).toHaveBeenCalledWith('/invalid/path');
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error: Test error'));
        expect(result).toBe(false);

        consoleErrorSpy.mockRestore();
    });
});