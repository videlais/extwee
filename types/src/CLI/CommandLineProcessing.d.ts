/**
 * Process command line arguments.
 * @function CommandLineProcessing
 * @description Parses Extwee CLI arguments and runs the requested compile or decompile. Exits the process with code 1 on error.
 * @module CLI/commandLineProcessing
 * @param {string[]} argv - Full argument vector, usually `process.argv`.
 */
export function CommandLineProcessing(argv: string[]): void;
