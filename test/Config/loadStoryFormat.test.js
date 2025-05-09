import { loadStoryFormat } from "../../src/CLI/ProcessConfig/loadStoryFormat.js";
import { isDirectory } from "../../src/CLI/isDirectory.js";
import { isFile } from "../../src/CLI/isFile.js";
import { readDirectories } from "../../src/CLI/ProcessConfig/readDirectories.js";
import { readFileSync } from "node:fs";

jest.mock("../../src/CLI/isDirectory.js");
jest.mock("../../src/CLI/isFile.js");
jest.mock("../../src/CLI/ProcessConfig/readDirectories.js");
jest.mock("node:fs");

describe("loadStoryFormat", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should throw an error if the story-formats directory does not exist", () => {
        isDirectory.mockReturnValueOnce(false);

        expect(() => loadStoryFormat("Harlowe", "3.2.0")).toThrow(
            "Error: story-formats directory does not exist. Consider running 'npx sfa-get' to download the latest story formats."
        );
    });

    it("should throw an error if the named story format directory does not exist", () => {
        isDirectory.mockReturnValueOnce(true).mockReturnValueOnce(false);

        expect(() => loadStoryFormat("Harlowe", "3.2.0")).toThrow(
            "Error: story format Harlowe does not exist in the story-formats directory."
        );
    });

    it("should throw an error if the version directory does not exist", () => {
        isDirectory.mockReturnValueOnce(true).mockReturnValueOnce(true).mockReturnValueOnce(false);

        expect(() => loadStoryFormat("Harlowe", "3.2.0")).toThrow(
            "Error: story format Harlowe version 3.2.0 does not exist in the story-formats directory."
        );
    });

    it("should throw an error if the format.js file does not exist in the version directory", () => {
        isDirectory.mockReturnValueOnce(true).mockReturnValueOnce(true).mockReturnValueOnce(true);
        isFile.mockReturnValueOnce(false);

        expect(() => loadStoryFormat("Harlowe", "3.2.0")).toThrow(
            "Error: story format Harlowe version 3.2.0 does not have a format.js file."
        );
    });

    it("should return the contents of the format.js file if all checks pass", () => {
        isDirectory.mockReturnValueOnce(true).mockReturnValueOnce(true).mockReturnValueOnce(true);
        isFile.mockReturnValueOnce(true);
        readFileSync.mockReturnValueOnce("format.js content");

        const result = loadStoryFormat("Harlowe", "3.2.0");
        expect(result).toBe("format.js content");
    });

    it("should handle 'latest' version and return the contents of the format.js file", () => {
        isDirectory.mockReturnValueOnce(true).mockReturnValueOnce(true);
        isFile.mockReturnValueOnce(false).mockReturnValueOnce(true);
        readDirectories.mockReturnValueOnce(["3.2.0", "3.1.0"]);
        readFileSync.mockReturnValueOnce("latest format.js content");

        const result = loadStoryFormat("Harlowe", "latest");
        expect(result).toBe("latest format.js content");
        expect(readDirectories).toHaveBeenCalledWith("story-formats/Harlowe");
    });

    it("should throw an error if 'latest' version has no format.js file", () => {
        isDirectory.mockReturnValueOnce(true).mockReturnValueOnce(true);
        isFile.mockReturnValueOnce(false).mockReturnValueOnce(false);
        readDirectories.mockReturnValueOnce(["3.2.0", "3.1.0"]);

        expect(() => loadStoryFormat("Harlowe", "latest")).toThrow(
            "Error: story format Harlowe version latest does not have a format.js file."
        );
    });

    it("should read format.js file from the story format directory if it exists", () => {
        isDirectory.mockReturnValueOnce(true).mockReturnValueOnce(true);
        isFile.mockReturnValueOnce(true);
        readDirectories.mockReturnValueOnce([]);
        readFileSync.mockReturnValueOnce("latest format.js content");

        const result = loadStoryFormat("Harlowe", "latest");
        expect(result).toBe("latest format.js content");
        expect(readFileSync).toHaveBeenCalledWith("story-formats/Harlowe/format.js", "utf-8");
    });

    it("should throw an error if the story format version is not 'latest' and version directories do not exist", () => {
        isDirectory.mockReturnValueOnce(true).mockReturnValueOnce(true);
        isFile.mockReturnValueOnce(false);
        readDirectories.mockReturnValueOnce([]);

        expect(() => loadStoryFormat("Harlowe", "latest")).toThrow(
            `Error: story format Harlowe does not have any version directories.`
        );
    }
    );
});