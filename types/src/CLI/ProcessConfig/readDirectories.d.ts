/**
 * Read the contents of a directory and returns all directories.
 * @function readDirectories
 * @description This function reads the contents of a directory and returns a list of directories.
 * @param {string} directory - The path to the directory to read.
 * @returns {Array<string>} - An array of directories in the directory.
 * @throws {Error} - If the directory does not exist or if there is an error reading the directory.
 */
export function readDirectories(directory: string): Array<string>;
