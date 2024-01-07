/**
 * Parse TWS file (as Buffer) into Story.
 * Unless it throws an error, it will return a Story object.
 *
 * See: Twine 1 TWS Documentation [Approval Pending]
 * @param {Buffer} binaryFileContents - File contents to parse as Buffer.
 * @returns {Story} Story object.
 */
export function parse(binaryFileContents: Buffer): Story;
import Story from '../Story.js';
