import { randomUUID } from 'node:crypto';

/**
 * Generates an Interactive Fiction Identification (IFID) based the Treaty of Babel.
 *
 * For Twine works, the IFID is a UUID (v4) in uppercase.
 * @see Treaty of Babel ({@link https://babel.ifarchive.org/babel_rev11.html#the-ifid-for-an-html-story-file})
 * @function generate
 * @description Generates a new IFID using UUIDv4 (RFC 4122).
 * @returns {string} IFID - A UUIDv4 string in uppercase format
 * @example
 * const ifid = generate();
 * console.log(ifid);
 * // => 'A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6'
 */
function generate () {
  // crypto.randomUUID() generates RFC 4122 version 4 UUIDs
  return randomUUID().toUpperCase();
}

export { generate };
