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
export function ConfigFileProcessing(): void;
export function ConfigFilePresent(): boolean;
