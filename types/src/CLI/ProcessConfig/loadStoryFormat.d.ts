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
export function loadStoryFormat(storyFormatName: string, storyFormatVersion: string): string;
