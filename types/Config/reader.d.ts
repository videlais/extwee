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
export function reader(path: string): object;
