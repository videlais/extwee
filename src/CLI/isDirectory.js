import { statSync } from 'node:fs';

/*
 * Check if a passed option is a valid directory.
 * @function isDirectory
 * @description Check if a directory exists.
 * @param {string} path - Path to directory.
 * @returns {boolean} True if directory exists, false if not.
 */
export const isDirectory = (path) => {
  // set default.
  let result = false;

  try {
    // Attempt t0 get stats.
    const stats = statSync(path);

    // Return if path is a directory.
    result = stats.isDirectory();
  } catch (e) {
    // If there was an error, log it.
    console.error(`Error: ${e}`);
  }

  // Return either the default (false) or the result (true).
  return result;
};