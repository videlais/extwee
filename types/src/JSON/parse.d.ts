/**
 * Parse JSON representation into Story.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-jsonoutput-doc.md Twine 2 JSON Specification}
 * @function parse
 * @param {string} jsonString - JSON string to convert to Story.
 * @throws {Error} - Invalid JSON!
 * @returns {Story} Story object.
 * @example
 * const jsonString = `{
 *  "name": "My Story",
 *  "start": "First Passage",
 *  "ifid": "A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6",
 *  "format": "SugarCube",
 *  "formatVersion": "2.31.0",
 *  "creator": "Twine",
 *  "creatorVersion": "2.3.9",
 *  "zoom": 1,
 *  "passages": [
 *   {
 *    "name": "First Passage",
 *    "tags": "",
 *    "metadata": "",
 *    "text": "This is the first passage."
 *   },
 *  ]
 * }`;
 * const story = parse(jsonString);
 * console.log(story);
 * // => Story {
 * //      name: 'My Story',
 * //      start: 'First Passage',
 * //      IFID: 'A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6',
 * //      format: 'SugarCube',
 * //      formatVersion: '2.31.0',
 * //      creator: 'Twine',
 * //      creatorVersion: '2.3.9',
 * //      zoom: 1,
 * //      tagColors: {},
 * //      metadata: {},
 * //      passages: [
 * //        Passage {
 * //          name: 'First Passage',
 * //          tags: '',
 * //          metadata: '',
 * //          text: 'This is the first passage.'
 * //        }
 * //      ]
 * //    }
 */
export function parse(jsonString: string): Story;
import { Story } from '../Story.js';
