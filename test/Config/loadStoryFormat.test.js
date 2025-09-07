import {jest} from '@jest/globals';

// Mock all dependencies before importing anything that uses them
const mockIsDirectory = jest.fn();
const mockIsFile = jest.fn();
const mockReadDirectories = jest.fn();
const mockReadFileSync = jest.fn();

jest.unstable_mockModule("../../src/CLI/isDirectory.js", () => ({
    isDirectory: mockIsDirectory
}));

jest.unstable_mockModule("../../src/CLI/isFile.js", () => ({
    isFile: mockIsFile
}));

jest.unstable_mockModule("../../src/CLI/ProcessConfig/readDirectories.js", () => ({
    readDirectories: mockReadDirectories
}));

jest.unstable_mockModule("node:fs", () => ({
    readFileSync: mockReadFileSync
}));

// Now import the modules that depend on the mocked modules
const { loadStoryFormat } = await import("../../src/CLI/ProcessConfig/loadStoryFormat.js");

describe("loadStoryFormat", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should throw an error if the story-formats directory does not exist", () => {
        mockIsDirectory.mockReturnValueOnce(false);

        expect(() => loadStoryFormat("Harlowe", "3.2.0")).toThrow(
            "Error: story-formats directory does not exist. Consider running 'npx sfa-get' to download the latest story formats."
        );
    });

    it("should throw an error if the named story format directory does not exist", () => {
        mockIsDirectory.mockReturnValueOnce(true).mockReturnValueOnce(false);

        expect(() => loadStoryFormat("Harlowe", "3.2.0")).toThrow(
            "Error: story format Harlowe does not exist in the story-formats directory."
        );
    });

    it("should throw an error if the version directory does not exist", () => {
        mockIsDirectory.mockReturnValueOnce(true).mockReturnValueOnce(true).mockReturnValueOnce(false);

        expect(() => loadStoryFormat("Harlowe", "3.2.0")).toThrow(
            "Error: story format Harlowe version 3.2.0 does not exist in the story-formats directory."
        );
    });

    it("should throw an error if the format.js file does not exist in the version directory", () => {
        mockIsDirectory.mockReturnValueOnce(true).mockReturnValueOnce(true).mockReturnValueOnce(true);
        mockIsFile.mockReturnValueOnce(false);

        expect(() => loadStoryFormat("Harlowe", "3.2.0")).toThrow(
            "Error: story format Harlowe version 3.2.0 does not have a format.js file."
        );
    });

    it("should return the contents of the format.js file if all checks pass", () => {
        mockIsDirectory.mockReturnValueOnce(true).mockReturnValueOnce(true).mockReturnValueOnce(true);
        mockIsFile.mockReturnValueOnce(true);
        mockReadFileSync.mockReturnValueOnce("format.js content");

        const result = loadStoryFormat("Harlowe", "3.2.0");
        expect(result).toBe("format.js content");
    });

    it("should handle 'latest' version and return the contents of the format.js file", () => {
        mockIsDirectory.mockReturnValueOnce(true).mockReturnValueOnce(true);
        mockIsFile.mockReturnValueOnce(false).mockReturnValueOnce(true);
        mockReadDirectories.mockReturnValueOnce(["3.2.0", "3.1.0"]);
        mockReadFileSync.mockReturnValueOnce("latest format.js content");

        const result = loadStoryFormat("Harlowe", "latest");
        expect(result).toBe("latest format.js content");
        expect(mockReadDirectories).toHaveBeenCalledWith("story-formats/Harlowe");
    });

    it("should throw an error if 'latest' version has no format.js file", () => {
        mockIsDirectory.mockReturnValueOnce(true).mockReturnValueOnce(true);
        mockIsFile.mockReturnValueOnce(false).mockReturnValueOnce(false);
        mockReadDirectories.mockReturnValueOnce(["3.2.0", "3.1.0"]);

        expect(() => loadStoryFormat("Harlowe", "latest")).toThrow(
            "Error: story format Harlowe version latest does not have a format.js file."
        );
    });

    it("should read format.js file from the story format directory if it exists", () => {
        mockIsDirectory.mockReturnValueOnce(true).mockReturnValueOnce(true);
        mockIsFile.mockReturnValueOnce(true);
        mockReadDirectories.mockReturnValueOnce([]);
        mockReadFileSync.mockReturnValueOnce("latest format.js content");

        const result = loadStoryFormat("Harlowe", "latest");
        expect(result).toBe("latest format.js content");
        expect(mockReadFileSync).toHaveBeenCalledWith("story-formats/Harlowe/format.js", "utf-8");
    });

    it("should throw an error if the story format version is not 'latest' and version directories do not exist", () => {
        mockIsDirectory.mockReturnValueOnce(true).mockReturnValueOnce(true);
        mockIsFile.mockReturnValueOnce(false);
        mockReadDirectories.mockReturnValueOnce([]);

        expect(() => loadStoryFormat("Harlowe", "latest")).toThrow(
            `Error: story format Harlowe does not have any version directories.`
        );
    }
    );
});