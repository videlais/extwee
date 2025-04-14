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
export function loadStoryFormat(storyFormatName: string, storyFormatVersion: string): string;
