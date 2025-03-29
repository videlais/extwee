import { readFileSync } from 'node:fs';
import { isFile } from './isFile.js';

// Look for the config file in the current directory.
const configFile = 'extwee.config.json';

/**
 * Check if the config file exists.
 * @function ConfigFilePresent
 * @description This function checks if the config file exists in the current directory.
 * If the config file does not exist, the function will return false.
 * If the config file exists, the function will return true.
 * The config file is used to store configuration options for the Extwee CLI.
 * @returns {boolean} - true if the config file exists, false otherwise.
 */
export const ConfigFilePresent = () => {
    // Check if the config file exists.
    return isFile(configFile);
}

/**
 * Processes the config file, if present.
 * @function ConfigFileProcessing
 * @description This function processes the config file.
 * It checks if the config file exists and if it does, it reads the config file.
 * If the config file does not exist, the function will exit the process with an error message.
 * If the config file exists and no command-line arguments are passed, the function will read the config file.
 * If the config file exists and command-line arguments are passed, the function will not read the config file.
 * The config file is used to store configuration options for the Extwee CLI.
 * @returns {void}
 * @throws {Error} - If the config file does not exist or if there is an error parsing the config file.
 */
export function ConfigFileProcessing() {
  // Check if the config file exists.
  const configFileExists = isFile(configFile);

  // If the config file does not exist, exit the process.
  if (configFileExists === false) {
    console.error(`Error: ${configFile} does not exist.`);
    // Exit the process.
    process.exit(1);
  }

  // If the config file exists, read it.
  let configFileContents = {};
  // If the config file exists and no command-line arguments are passed, read the config file.
  if (configFileExists === true && process.argv.length === 2) {
    // Read the config file.
    const configFileData = readFileSync(configFile, 'utf-8');

    // Parse the config file.
    try {
      configFileContents = JSON.parse(configFileData);
      console.log(`Using config file: ${configFile}`, configFileContents);
      process.exit(0);
    } catch (e) {
      // There was an error parsing the config file.
      console.error(`Error parsing ${configFile}: ${e}`);
      // Exit the process.
      process.exit(1);
    }
  }
}
