/**
 * Story class.
 * @class
 * @classdesc Represents a Twine story.
 * @property {string} name - Name of the story.
 * @property {string} IFID - Interactive Fiction ID (IFID) of Story.
 * @property {string} start - Name of start passage.
 * @property {string} format - Story format of Story.
 * @property {string} formatVersion - Story format version of Story.
 * @property {number} zoom - Zoom level.
 * @property {Array} passages - Array of Passage objects. See {@link Passage}.
 * @property {string} creator - Program used to create Story.
 * @property {string} creatorVersion - Version used to create Story.
 * @property {object} metadata - Metadata of Story.
 * @property {object} tagColors - Tag Colors
 * @property {string} storyJavaScript - Story JavaScript
 * @property {string} storyStylesheet - Story Stylesheet
 * @function addPassage - Add a passage to the story and returns the new length of the passages array.
 * @function removePassageByName - Remove a passage from the story by name and returns the new length of the passages array.
 * @function getPassagesByTag - Find passages by tag.
 * @function getPassageByName - Find passage by name.
 * @function size - Size (number of passages).
 * @function toJSON - Export Story as JSON representation.
 * @function toTwee - Return Twee representation.
 * @function toTwine2HTML - Return Twine 2 HTML representation.
 * @function toTwine1HTML - Return Twine 1 HTML representation.
 * @example
 * const story = new Story('My Story');
 * story.IFID = '12345678-1234-5678-1234-567812345678';
 * story.start = 'Start';
 * story.format = 'SugarCube';
 * story.formatVersion = '2.31.0';
 * story.zoom = 1;
 * story.creator = 'extwee';
 * story.creatorVersion = '2.2.1';
 */
export class Story {
    /**
     * Creates a story.
     * @param {string} name - Name of the story.
     */
    constructor(name?: string);
    /**
     * Set story name.
     * @param {string} a - Replacement story name
     */
    set name(a: string);
    /**
     * Each story has a name
     * @returns {string} Name
     */
    get name(): string;
    /**
     * Set tag colors.
     * @param {object} a - Replacement tag colors
     */
    set tagColors(a: object);
    /**
     * Tag Colors object (each property is a tag and its color)
     * @returns {object} tag colors array
     */
    get tagColors(): object;
    /**
     * Set story IFID.
     * @param {string} i - Replacement IFID.
     */
    set IFID(i: string);
    /**
     * Interactive Fiction ID (IFID) of Story.
     * @returns {string} IFID
     */
    get IFID(): string;
    /**
     * Set start passage name.
     * @param {string} s - Replacement start
     */
    set start(s: string);
    /**
     * Name of start passage.
     * @returns {string} start
     */
    get start(): string;
    /**
     * Set story format version.
     * @param {string} f - Replacement format version
     */
    set formatVersion(f: string);
    /**
     * Story format version of Story.
     * @returns {string} story format version
     */
    get formatVersion(): string;
    /**
     * Set story metadata.
     * @param {object} o - Replacement metadata
     */
    set metadata(o: object);
    /**
     * Metadata of Story.
     * @returns {object} metadata of story
     */
    get metadata(): object;
    /**
     * Set story format.
     * @param {string} f - Replacement format
     */
    set format(f: string);
    /**
     * Story format of Story.
     * @returns {string} format
     */
    get format(): string;
    /**
     * Set creator program.
     * @param {string} c - Creator Program of Story
     */
    set creator(c: string);
    /**
     * Program used to create Story.
     * @returns {string} Creator Program
     */
    get creator(): string;
    /**
     * Set creator version.
     * @param {string} c - Version of creator program
     */
    set creatorVersion(c: string);
    /**
     * Version used to create Story.
     * @returns {string} Version
     */
    get creatorVersion(): string;
    /**
     * Set zoom level.
     * @param {number} n - Replacement zoom level
     */
    set zoom(n: number);
    /**
     * Zoom level.
     * @returns {number} Zoom level
     */
    get zoom(): number;
    /**
     * Set passages in Story.
     * @param {Array} p - Replacement passages
     * @property {Array} passages - Passages
     * @throws {Error} Passages must be an Array!
     * @throws {Error} Passages must be an Array of Passage objects!
     */
    set passages(p: any[]);
    /**
     * Passages in Story.
     * @returns {Array} Passages
     * @property {Array} passages - Passages
     */
    get passages(): any[];
    /**
     * Set story stylesheet.
     * @param {string} s - Replacement story stylesheet
     */
    set storyStylesheet(s: string);
    /**
     * Story stylesheet data can be set as a passage, property value, or both.
     * @returns {string} storyStylesheet
     */
    get storyStylesheet(): string;
    /**
     * Set story JavaScript.
     * @param {string} s - Replacement story JavaScript
     */
    set storyJavaScript(s: string);
    /**
     * Get story JavaScript.
     * @returns {string} storyJavaScript
     */
    get storyJavaScript(): string;
    /**
     * Add a passage to the story.
     * Passing `StoryData` will override story metadata and `StoryTitle` will override story name.
     * @function addPassage
     * @param {Passage} p - Passage to add to Story.
     * @returns {number} Return new length of passages array.
     */
    addPassage(p: Passage): number;
    /**
     * Remove a passage from the story by name.
     * @function removePassageByName
     * @param {string} name - Passage name to remove.
     * @returns {number} Return new length of passages array.
     */
    removePassageByName(name: string): number;
    /**
     * Find passages by tag.
     * @function getPassagesByTag
     * @param {string} t - Passage name to search for
     * @returns {Array} Return array of passages
     */
    getPassagesByTag(t: string): any[];
    /**
     * Find passage by name.
     * @function getPassageByName
     * @param {string} name - Passage name to search for
     * @returns {Passage | null} Return passage or null
     */
    getPassageByName(name: string): Passage | null;
    /**
     * Size (number of passages).
     * @function size
     * @returns {number} Return number of passages
     */
    size(): number;
    /**
     * Export Story as JSON representation.
     * @function toJSON
     * @returns {string} JSON string.
     */
    toJSON(): string;
    /**
     * Return Twee representation.
     *
     * See: Twee 3 Specification
     * (https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md)
     * @function toTwee
     * @returns {string} Twee String
     */
    toTwee(): string;
    /**
     * Return Twine 2 HTML.
     *
     * See: Twine 2 HTML Output
     * (https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md)
     *
     *  The only required attributes are `name` and `ifid` of the `<tw-storydata>` element. All others are optional.
     *
     * The `<tw-storydata>` element may have any number of optional attributes, which are:
     * - `startnode`: (integer) Optional. The PID of the starting passage.
     * - `creator`: (string) Optional. The name of the program that created the story.
     * - `creator-version`: (string) Optional. The version of the program that created the story.
     * - `zoom`: (decimal) Optional. The zoom level of the story.
     * - `format`: (string) Optional. The format of the story.
     * - `format-version`: (string) Optional. The version of the format of the story.
     *
     * Because story stylesheet data can be represented as a passage, property value, or both, all approaches are encoded.
     *
     * Because story JavaScript can be represented as a passage, property value, or both, all approaches are encoded.
     * @function toTwine2HTML
     * @returns {string} Twine 2 HTML string
     */
    toTwine2HTML(): string;
    /**
     * Return Twine 1 HTML.
     *
     * See: Twine 1 HTML Output
     * (https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md)
     * @function toTwine1HTML
     * @returns {string} Twine 1 HTML string.
     */
    toTwine1HTML(): string;
    #private;
}
export const creatorName: "extwee";
export const creatorVersion: "2.3.14";
import Passage from './Passage.js';
