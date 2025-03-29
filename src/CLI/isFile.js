// Import fs.
import { statSync } from 'node:fs';

/*
 * Check if a passed option is a valid file.
 * @function isFile
 * @description Check if a file exists.
 * @param {string} path - Path to file.
 * @returns {boolean} True if file exists, false if not.
 */
export const isFile = (path) => {
  // set default.
  let result = false;

  try {
    // Attempt t0 get stats.
    const stats = statSync(path);

    // Return if path is a file.
    result = stats.isFile();
  } catch (e) {
    // If there was an error, log it.
    console.error(`Error: ${e}`);
  }

  // Return either the default (false) or the result (true).
  return result;
};