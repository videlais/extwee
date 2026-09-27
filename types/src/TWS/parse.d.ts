/**
 * Parse a Twine 1 TWS project file (a Python pickle, as a Buffer) into a Story.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-twsoutput.md Twine 1 TWS Documentation}
 * @function parse
 * @param {Buffer} binaryFileContents - File contents to parse as Buffer.
 * @returns {Story} Story object.
 * @throws {Error} Only parsing of Buffer is allowed!
 * @throws {TypeError} Error: Buffer does not contain Python pickle data!
 * @example
 * import { readFileSync } from 'node:fs';
 * import { parseTWS } from 'extwee';
 * const story = parseTWS(readFileSync('project.tws'));
 * console.log(story.toTwee());
 */
export function parse(binaryFileContents: Buffer): Story;
import { Story } from '../Story.js';
