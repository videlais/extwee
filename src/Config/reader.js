import {readFileSync, existsSync} from 'node:fs';

/**
 * Read a JSON file and return its contents.
 * @param {string} path
 * @returns {object}
 * @throws {Error} If the file does not exist.
 * @throws {Error} If the file is not a valid JSON file.
 * @example
 * const contents = reader('test/Config/files/valid.json');
 * console.log(contents); // {"story-format": 'Harlowe', "story-title": "My Story"}
 */
export function reader(path) {
    // Does the file exist?
    if (!existsSync(path)) {
        throw new Error(`Error: File ${path} not found`);
    }

    // Read the file.
    const contents = readFileSync(path, 'utf8');

    // Parsed contents.
    let parsedContents = null;

    // Try to parse the contents into JSON object.
    try {
        parsedContents = JSON.parse(contents);
    } catch (error) {
        throw new Error(`Error: File ${path} is not a valid JSON file. ${error.message}`);
    }

    // Return the parsed contents.
    return parsedContents;
}