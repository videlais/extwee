import { readdirSync } from 'node:fs';
import { isDirectory } from '../isDirectory.js';

/**
 * Read the contents of a directory and returns all directories.
 * @function readDirectories
 * @description This function reads the contents of a directory and returns a list of directories.
 * @param {string} directory - The path to the directory to read.
 * @returns {Array<string>} - An array of directories in the directory.
 * @throws {Error} - If the directory does not exist or if there is an error reading the directory.
 */
export function readDirectories(directory) {
    // Check if the directory exists
    const isDir = isDirectory(directory);
    if (!isDir) {
        console.error(`Error: Directory ${directory} does not exist.`);
        return [];
    }

    // Create an empty array to hold the directories
    let directories = [];

    // Read the directory and return the list of files
    try {
        directories = readdirSync(directory);
    } catch (error) {
        console.error(`Error reading directory ${directory}:`, error);
    }

    // Filter the list to only include directories
    const directoriesOnly = directories.filter((item) => {
        return isDirectory(`${directory}/${item}`);
    });

    // Return the list of directories
    return directoriesOnly;
}