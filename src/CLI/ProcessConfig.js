import { readFileSync, writeFileSync } from 'node:fs';
import { isFile } from './isFile.js';
import {
  parseTwine2HTML,
  parseTwee,
  parseStoryFormat,
  parseTwine1HTML,
  compileTwine2HTML
} from '../../index.js';
import { loadStoryFormat } from './ProcessConfig/loadStoryFormat.js';

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
  
  // Read the config file.
  const configFileData = readFileSync(configFile, 'utf-8');

  // Parse the config file.
  try {
      configFileContents = JSON.parse(configFileData);
      console.log(`Using config file: ${configFile}`, configFileContents);
  } catch (e) {
      // There was an error parsing the config file.
      console.error(`Error parsing ${configFile}: ${e}`);
      // Exit the process.
      process.exit(1);
  }

  // First, we need to know the mode (compile or decompile).

  // Does the config file the "mode" property?
  if (configFileContents.mode === undefined) {
    // The config file does not have a "mode" property.
    console.error(`Error: ${configFile} does not have a "mode" property.`);
    // Exit the process.
    process.exit(1);
  }

  // Check if the mode is valid.
  if (configFileContents.mode !== 'compile' && configFileContents.mode !== 'decompile') {
    // The mode is not valid.
    console.error(`Error: ${configFile} has an invalid "mode" property. Must be "compile" or "decompile".`);
    // Exit the process.
    process.exit(1);
  }

  // Check if the "input" property is present.
  if (configFileContents.input === undefined) {
    // The config file does not have an "input" property.
    console.error(`Error: ${configFile} does not have an "input" property.`);
    // Exit the process.
    process.exit(1);
  }

  // Check if the "output" property is present.
  if (configFileContents.output === undefined) {
    // The config file does not have an "input" property.
    console.error(`Error: ${configFile} does not have an "output" property.`);
    // Exit the process.
    process.exit(1);
  }

  // Check if de-compile mode is enabled.
  const isDecompileMode = (configFileContents.mode === "decompile");

  // Check if compile mode is enabled.
  const isCompileMode = (configFileContents.mode === "compile");

  // Check if Twine 1 is enabled.
  const isTwine1Mode = (configFileContents.twine1Project === true);

  // Check if story-format-version is present.
  if (configFileContents.storyFormatVersion === undefined) {
    // If not present, assume "latest" version.
    configFileContents.storyFormatVersion = 'latest';
  }

  // Check if Twine 2 is enabled.
  // By default, Twine 2 is enabled and only disabled if Twine 1 is enabled.
  // This is because Twine 2 is the default mode for Extwee.
  const isTwine2Mode = (isTwine1Mode === false ? true : false);

  // De-compile Twine 2 HTML into Twee 3 branch.
  if (isTwine2Mode === true && isDecompileMode === true) {
      // Read the input HTML file.
      const inputHTML = readFileSync(configFileContents.input, 'utf-8');
  
      // Parse the input HTML file into Story object.
      const storyObject = parseTwine2HTML(inputHTML);
  
      // Write the output file from Story as Twee 3.
      writeFileSync(configFileContents.output, storyObject.toTwee());
  
      // Exit the process.
      return;
    }
  
  // Compile Twee 3 into Twine 2 HTML branch.
  if (isTwine2Mode === true && isCompileMode === true) {
    // Read the input file.
    const inputTwee = readFileSync(configFileContents.input, 'utf-8');

    // Parse the input file.
    const story = parseTwee(inputTwee);

    // Read the story format file.
    const inputStoryFormat = loadStoryFormat(configFileContents.storyFormatName, configFileContents.storyFormatVersion);

    // Parse the story format file.
    const parsedStoryFormat = parseStoryFormat(inputStoryFormat);

    // Compile the story.
    const Twine2HTML = compileTwine2HTML(story, parsedStoryFormat);

    // Write the output file.
    writeFileSync(configFileContents.output, Twine2HTML);

    // Exit the process.
    return;
  }

  // De-compile Twine 1 HTML into Twee 3 branch.
  if (isTwine1Mode === true && isDecompileMode === true) {
    // Read the input HTML file.
    const inputHTML = readFileSync(configFileContents.input, 'utf-8');

    // Parse the input HTML file into Story object.
    const storyObject = parseTwine1HTML(inputHTML);

    // Write the output file from Story as Twee 3.
    writeFileSync(configFileContents.output, storyObject.toTwee());

    return;
  }

}
