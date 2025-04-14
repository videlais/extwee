import { isDirectory } from "../isDirectory.js";
import { isFile } from "../isFile.js";
import { readDirectories } from "./readDirectories.js";
import { readFileSync } from "node:fs";

/**
 * Load the story format from the story-formats directory.
 * @function loadStoryFormat
 * @description This function loads the story format from the story-formats directory.
 * It checks if the story-formats directory exists, if the named story format exists,
 * if the version directory exists, and if the format.js file exists.
 * If any of these checks fail, the function will exit the process with an error message.
 * If all checks pass, the function will return the contents of the format.js file.
 * @param {string} storyFormatName - The name of the story format.
 * @param {string} storyFormatVersion - The version of the story format.
 * @returns {string} - The contents of the format.js file.
 * @throws {Error} - If the story-formats directory does not exist, if the named story format does not exist,
 * if the version directory does not exist, or if the format.js file does not exist.
 * @example
 * // Load the story format from the story-formats directory.
 * const storyFormat = loadStoryFormat('Harlowe', '3.2.0');
 * console.log(storyFormat);
 * // Output: The contents of the format.js file.
 */
export function loadStoryFormat(storyFormatName, storyFormatVersion) {
    // Does the story-formats directory exist?
    const isDir = isDirectory('story-formats');
    // If the story-formats directory does not exist, exit the process.
    if (isDir === false) {
        console.error(`Error: story-formats directory does not exist. Consider running 'npx sfa-get' to download the latest story formats.`);
        // Exit the process.
        process.exit(1);
    }

    // Does the named story format exist in the story-formats directory?
    const isStoryFormatDir = isDirectory(`story-formats/${storyFormatName}`);
    // If the story format directory does not exist, exit the process.
    if (isStoryFormatDir === false) {
        console.error(`Error: story format ${storyFormatName} does not exist in the story-formats directory.`);
        // Exit the process.
        process.exit(1);
    }

    // Does the named story format have a version directory?
    const isVersionDir = isDirectory(`story-formats/${storyFormatName}/${storyFormatVersion}`);
    // If the version directory does not exist, exit the process.
    if (isVersionDir === false) {
        console.error(`Error: story format ${storyFormatName} version ${storyFormatVersion} does not exist in the story-formats directory.`);
        // Exit the process.
        process.exit(1);
    }

    // Set an initial path based on the version.
    let filepath = `story-formats/${storyFormatName}/${storyFormatVersion}/format.js`;

    // check if storyFormatVersion is "latest"
    if (storyFormatVersion === 'latest') {
        // If latest, check if 'format.js' exists in the story format directory.
        const latestFormat = `story-formats/${storyFormatName}/format.js`;
        const isLatestFormatFile = isFile(latestFormat);

        // If the `format.js` file does not exist, read the directories with in the story format directory.
        if (isLatestFormatFile === false) {
            // Read the directories in the story format directory.
            // The directories are expected to be version directories.
            const directories = readDirectories(`story-formats/${storyFormatName}`);
            
            // Sort the directories in descending order.
            directories.sort((a, b) => {
                return b.localeCompare(a, undefined, { numeric: true });
            });

            // Get the latest version directory.
            // The latest version is the last directory in the sorted list.
            const latestVersion = directories[0];
            // Set the filepath to the latest version directory.
            filepath = `story-formats/${storyFormatName}/${latestVersion}/format.js`;
        } else {
            filepath = latestFormat;
        }
    } else {
        // If the version is not "latest", set the filepath to the version directory.
        filepath = `story-formats/${storyFormatName}/${storyFormatVersion}/format.js`;
    }

    // Is there a 'format.js' file in the version directory?
    let isFormatFile = isFile(filepath);

    // If the format.js file does not exist, exit the process.
    if (isFormatFile === false) {
        console.error(`Error: story format ${storyFormatName} version ${storyFormatVersion} does not have a format.js file.`);
        // Exit the process.
        process.exit(1);
    }

    // If the format.js file exists, read and return its contents.
    return readFileSync(filepath, 'utf-8');
}