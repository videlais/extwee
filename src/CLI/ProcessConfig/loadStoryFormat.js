import { isDirectory } from "../isDirectory.js";
import { isFile } from "../isFile.js";
import { readDirectories } from "./readDirectories.js";
import { readFileSync } from "node:fs";

/**
 * Load the story format from the story-formats directory.
 * @function loadStoryFormat
 * @description Loads a story format's format.js from the local `story-formats/` directory.
 * With `latest`, an unversioned `story-formats/<name>/format.js` is used if present; otherwise the
 * highest-numbered version directory is chosen.
 * If any check fails, an Error is thrown.
 * @param {string} storyFormatName - Directory name of the story format under `story-formats/` (e.g. `Harlowe`).
 * @param {string} storyFormatVersion - Version directory name, or `latest` for the highest available version.
 * @returns {string} Contents of the format.js file.
 * @throws {Error} If the name or version contains path characters, or if the story-formats directory, named story format,
 * version directory, or format.js file does not exist.
 * @example
 * // Load the story format from the story-formats directory.
 * const storyFormat = loadStoryFormat('Harlowe', '3.2.0');
 * console.log(storyFormat);
 * // Output: The contents of the format.js file.
 */
export function loadStoryFormat(storyFormatName, storyFormatVersion) {
    // Validate path components to prevent path traversal.
    if (/[/\\]|\.\./.test(storyFormatName)) {
        throw new Error('Error: story format name contains invalid characters.');
    }
    if (/[/\\]|\.\./.test(storyFormatVersion)) {
        throw new Error('Error: story format version contains invalid characters.');
    }

    // If the story-formats directory does not exist, throw error.
    if (isDirectory('story-formats') === false) {
        throw new Error(`Error: story-formats directory does not exist. Consider running 'npx sfa-get' to download the latest story formats.`);
    }

    // Does the named story format exist in the story-formats directory?
    const isStoryFormatDir = isDirectory(`story-formats/${storyFormatName}`);
    
    // If the story format directory does not exist, throw error.
    if (isStoryFormatDir === false) {
        throw new Error(`Error: story format ${storyFormatName} does not exist in the story-formats directory.`);
    }

    let filepath = `story-formats/${storyFormatName}/format.js`;

    // If the story format version is 'latest', check if the format.js file exists.
    // If the format.js file does not exist, check if there are version directories.
    // If there are version directories, get the latest version and set the filepath to that version directory and format.js file.
    // If the format.js file exists, return its contents.

    // Check if storyFormatVersion is "latest"
    if (storyFormatVersion === 'latest' && isFile(filepath) === false) {
        // Read the directories in the story format directory.
        // The directories are expected to be version directories.
        let directories = readDirectories(`story-formats/${storyFormatName}`);

        // Check if there are any version directories.
        if (directories.length === 0) {
            // If there are no version directories, throw error.
            throw new Error(`Error: story format ${storyFormatName} does not have any version directories.`);
        }
            
        // Sort the directories in descending order.
        directories.sort((a, b) => {
            return b.localeCompare(a, undefined, { numeric: true });
        });

        // Get the latest version directory.
        const latestVersion = directories[0];
        
        // Set the filepath to the latest version directory.
        filepath = `story-formats/${storyFormatName}/${latestVersion}/format.js`;

        // Is there a 'format.js' file in the version directory?
        let isFormatFile = isFile(filepath);

        // If the format.js file does not exist, exit the process.
        if (isFormatFile === false) {
            throw new Error(`Error: story format ${storyFormatName} version ${storyFormatVersion} does not have a format.js file.`);
        }
    }

    // If the story format version is not 'latest', check if version directories exists.
    if(storyFormatVersion !== 'latest') {
        // Does the named story format have a version directory?
        const isVersionDir = isDirectory(`story-formats/${storyFormatName}/${storyFormatVersion}`);
        
        // If the version directory does not exist, throw error.
        if (isVersionDir === false) {
            throw new Error(`Error: story format ${storyFormatName} version ${storyFormatVersion} does not exist in the story-formats directory.`);
        }

        // Set an initial path based on the version.
        filepath = `story-formats/${storyFormatName}/${storyFormatVersion}/format.js`;
        
        // If the format.js file does not exist, throw error.
        if (isFile(filepath) === false) {
            throw new Error(`Error: story format ${storyFormatName} version ${storyFormatVersion} does not have a format.js file.`);
        }
    }

    // If the format.js file exists, read and return its contents.
    return readFileSync(filepath, 'utf-8');
}