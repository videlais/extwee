export default class Story {
    /**
     * Creates a story.
     * @param {string} name - Name of the story.
     */
    constructor(name?: string);
    /**
     * @param {string} a - Replacement story name
     */
    set name(a: string);
    /**
     * Each story has a name
     * @returns {string} Name
     */
    get name(): string;
    /**
     * @param {object} a - Replacement tag colors
     */
    set tagColors(a: any);
    /**
     * Tag Colors object (each property is a tag and its color)
     * @returns {object} tag colors array
     */
    get tagColors(): any;
    /**
     * @param {string} i - Replacement IFID
     */
    set IFID(i: string);
    /**
     * Interactive Fiction ID (IFID) of Story
     * @returns {string} IFID
     */
    get IFID(): string;
    /**
     * @param {string} s - Replacement start
     */
    set start(s: string);
    /**
     * Name of start passage.
     * @returns {string} start
     */
    get start(): string;
    /**
     * @param {string} f - Replacement format version
     */
    set formatVersion(f: string);
    /**
     * Story format version of Story.
     * @returns {string} story format version
     */
    get formatVersion(): string;
    /**
     * @param {object} o - Replacement metadata
     */
    set metadata(o: any);
    /**
     * Metadata of Story.
     * @returns {object} metadata of story
     */
    get metadata(): any;
    /**
     * @param {string} f - Replacement format
     */
    set format(f: string);
    /**
     * Story format of Story.
     * @returns {string} format
     */
    get format(): string;
    /**
     * @param {string} c - Creator Program of Story
     */
    set creator(c: string);
    /**
     * Program used to create Story.
     * @returns {string} Creator Program
     */
    get creator(): string;
    /**
     * @param {string} c - Version of creator program
     */
    set creatorVersion(c: string);
    /**
     * Version used to create Story.
     * @returns {string} Version
     */
    get creatorVersion(): string;
    /**
     * @param {number} n - Replacement zoom level
     */
    set zoom(n: number);
    /**
     * Zoom level.
     * @returns {number} Zoom level
     */
    get zoom(): number;
    /**
     * Add a passage to the story.
     * `StoryData` will override story metadata and `StoryTitle` will override story name.
     * @param {Passage} p - Passage to add to Story.
     */
    addPassage(p: Passage): void;
    /**
     * Remove a passage from the story by name.
     * @param {string} name - Passage name to remove
     */
    removePassageByName(name: string): void;
    /**
     * Find passages by tag.
     * @param {string} t - Passage name to search for
     * @returns {Array} Return array of passages
     */
    getPassagesByTag(t: string): any[];
    /**
     * Find passage by name.
     * @param {string} name - Passage name to search for
     * @returns {Passage | null} Return passage or null
     */
    getPassageByName(name: string): Passage | null;
    /**
     * Size (number of passages).
     * @returns {number} Return number of passages
     */
    size(): number;
    /**
     * forEach-style iterator of passages in Story.
     * @param {Function} callback - Callback function
     */
    forEachPassage(callback: Function): void;
    /**
     * Export Story as JSON representation.
     * @returns {string} JSON string.
     */
    toJSON(): string;
    /**
     * Return Twee representation.
     *
     * See: Twee 3 Specification
     * (https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md)
     * @returns {string} Twee String
     */
    toTwee(): string;
    /**
     * Return Twine 2 HTML.
     *
     * See: Twine 2 HTML Output
     * (https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md)
     * @returns {string} Twine 2 HTML string
     */
    toTwine2HTML(): string;
    /**
     * Return Twine 1 HTML.
     *
     * See: Twine 1 HTML Output
     * (https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md)
     * @returns {string} Twine 1 HTML string.
     */
    toTwine1HTML(): string;
    #private;
}
import Passage from './Passage.js';
