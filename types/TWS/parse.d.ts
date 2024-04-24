/**
 * Parse TWS file (as Buffer) into Story.
 * Unless it throws an error, it will return a Story object.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md Twine 1 HTML Documentation}
 * @function parse
 * @param {Buffer} binaryFileContents - File contents to parse as Buffer.
 * @returns {Story} Story object.
 */
export function parse(binaryFileContents: Buffer): Story;
import { Story } from '../Story.js';
