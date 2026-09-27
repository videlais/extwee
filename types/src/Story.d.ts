/**
 * Story class.
 * @class
 * @classdesc Represents a Twine story.
 * @property {string} name - Title shown to players and in Twine's library.
 * @property {string} IFID - Interactive Fiction ID (IFID) of Story.
 * @property {string} start - Name of start passage.
 * @property {string} format - Story format name (e.g. `Harlowe`).
 * @property {string} formatVersion - Semantic version of the story format.
 * @property {number} zoom - Zoom level.
 * @property {Passage[]} passages - Passages in the story. See {@link Passage}.
 * @property {string} creator - Program used to create Story.
 * @property {string} creatorVersion - Version used to create Story.
 * @property {Record<string, unknown>} metadata - Additional story metadata.
 * @property {Record<string, string>} tagColors - Map of tag names to colors.
 * @property {string} storyJavaScript - Story-wide JavaScript.
 * @property {string} storyStylesheet - Story-wide CSS.
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
     * @param {string} name - Story title (defaults to `Untitled Story`).
     */
    constructor(name?: string);
    /**
     * Set the story title.
     * @param {string} a - New story title.
     * @throws {Error} Story name must be a string
     */
    set name(a: string);
    /**
     * Story title, written as the `StoryTitle` passage in Twee and as `<tw-storydata name>` in Twine 2 HTML.
     * @returns {string} Current story title.
     */
    get name(): string;
    /**
     * Replace the tag-to-color map.
     * @param {Record<string, string>} a - New tag-to-color map.
     * @throws {Error} Tag colors must be a plain object!
     */
    set tagColors(a: Record<string, string>);
    /**
     * Map of passage tag names to display colors (e.g. `{ "bar": "green" }`), written as `<tw-tag>` elements.
     * @returns {Record<string, string>} Tag-to-color map.
     */
    get tagColors(): Record<string, string>;
    /**
     * Set story IFID.
     * @param {string} i - New IFID.
     * @throws {Error} IFID must be a String!
     */
    set IFID(i: string);
    /**
     * Interactive Fiction ID (IFID) of Story. Twine 2 expects an uppercase UUID v4.
     * @returns {string} Current IFID, or an empty string if none has been set.
     */
    get IFID(): string;
    /**
     * Set start passage name.
     * @param {string} s - Name of the new start passage.
     * @throws {Error} start (passage name) must be a String!
     */
    set start(s: string);
    /**
     * Name of the passage where the story begins.
     * @returns {string} Start passage name, or an empty string if not set.
     */
    get start(): string;
    /**
     * Set story format version.
     * @param {string} f - New format version.
     * @throws {Error} Story format version must be a String!
     */
    set formatVersion(f: string);
    /**
     * Semantic version of the story format (e.g. `2.28.2`).
     * @returns {string} Format version, or an empty string if not set.
     */
    get formatVersion(): string;
    /**
     * Replace story metadata.
     * @param {Record<string, unknown>} o - New metadata object.
     * @throws {Error} Story metadata must be a non-null Object!
     */
    set metadata(o: Record<string, unknown>);
    /**
     * Additional story metadata not covered by other properties.
     * @returns {Record<string, unknown>} Metadata object.
     */
    get metadata(): Record<string, unknown>;
    /**
     * Set story format.
     * @param {string} f - New story format name.
     * @throws {Error} Story format must be a String!
     */
    set format(f: string);
    /**
     * Name of the story format used to play the story (e.g. `Harlowe`, `SugarCube`).
     * @returns {string} Story format name, or an empty string if not set.
     */
    get format(): string;
    /**
     * Set creator program.
     * @param {string} c - New creator program name.
     * @throws {Error} Creator must be String
     */
    set creator(c: string);
    /**
     * Name of the program that created the story. Defaults to `extwee`.
     * @returns {string} Creator program name.
     */
    get creator(): string;
    /**
     * Set creator version.
     * @param {string} c - New creator program version.
     * @throws {Error} Creator version must be a string!
     */
    set creatorVersion(c: string);
    /**
     * Version of the program that created the story. Defaults to the current Extwee version.
     * @returns {string} Creator program version.
     */
    get creatorVersion(): string;
    /**
     * Set zoom level. The value is rounded to two decimal places.
     * @param {number} n - New zoom level.
     * @throws {Error} Zoom level must be a finite Number!
     */
    set zoom(n: number);
    /**
     * Twine 2 story map zoom level, where `1` is 100%.
     * @returns {number} Zoom level.
     */
    get zoom(): number;
    /**
     * Replace all passages in the story. Unlike {@link Story#addPassage}, no special passages are processed.
     * @param {Passage[]} p - New passages.
     * @throws {Error} Passages must be an Array!
     * @throws {Error} Passages must be an Array of Passage objects!
     */
    set passages(p: Passage[]);
    /**
     * Passages in the story. Does not include `StoryData`, `StoryTitle`, or `script`/`stylesheet`-tagged passages, which {@link Story#addPassage} stores in other properties.
     * @returns {Passage[]} Passages in story order.
     */
    get passages(): Passage[];
    /**
     * Set story stylesheet.
     * @param {string} s - New story stylesheet.
     * @throws {Error} Story stylesheet must be a string!
     */
    set storyStylesheet(s: string);
    /**
     * Story-wide CSS. Text from `stylesheet`-tagged passages added through {@link Story#addPassage} is appended here.
     * @returns {string} CSS text (may be empty).
     */
    get storyStylesheet(): string;
    /**
     * Set story JavaScript.
     * @param {string} s - New story JavaScript.
     * @throws {Error} Story JavaScript must be a string!
     */
    set storyJavaScript(s: string);
    /**
     * Story-wide JavaScript. Text from `script`-tagged passages added through {@link Story#addPassage} is appended here.
     * @returns {string} JavaScript source (may be empty).
     */
    get storyJavaScript(): string;
    /**
     * Add a passage to the story.
     * Some passages are consumed instead of stored:
     * - `StoryData` sets IFID, format, format version, zoom, start, and tag colors.
     * - `StoryTitle` sets the story name.
     * - `script`- and `stylesheet`-tagged passages are appended to `storyJavaScript` and `storyStylesheet`.
     *
     * A passage whose name already exists is ignored with a console warning.
     * @param {Passage} p - Passage to add to Story.
     * @returns {number} New length of the passages array.
     * @throws {Error} Can only add Passages to the story!
     */
    addPassage(p: Passage): number;
    /**
     * Remove a passage from the story by name.
     * @param {string} name - Passage name to remove.
     * @returns {number} New length of the passages array.
     */
    removePassageByName(name: string): number;
    /**
     * Find passages by tag.
     * @param {string} t - Tag to search for.
     * @returns {Passage[]} Passages with the tag (empty if none match).
     */
    getPassagesByTag(t: string): Passage[];
    /**
     * Find passage by name.
     * @param {string} name - Passage name to search for.
     * @returns {Passage | null} Matching passage, or `null` if not found.
     */
    getPassageByName(name: string): Passage | null;
    /**
     * Number of passages in {@link Story#passages}.
     * @returns {number} Passage count.
     */
    size(): number;
    /**
     * Export Story as a Twine 2 JSON string. Same as {@link Story#toJSONString}.
     *
     * **Note:** Unlike the usual `toJSON()` convention, this returns a string, not an object.
     * Do not pass a Story to `JSON.stringify()`, directly or nested; the output will be encoded twice.
     * Use {@link Story#toJSONString} when you need JSON text. This is planned to return an object in 3.0.
     * @see {@link https://github.com/videlais/extwee/issues/799 Issue #799}
     * @returns {string} Story serialized as indented JSON.
     */
    toJSON(): string;
    /**
     * Export Story as a Twine 2 JSON string.
     * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-jsonoutput-doc.md Twine 2 JSON Output}
     * @returns {string} Story serialized as JSON indented with 4 spaces.
     */
    toJSONString(): string;
    /**
     * Return Twee 3 representation. A new IFID is generated (with a warning) if the current one is not a UUID v4.
     * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md Twee 3 Specification}
     * @returns {string} Twee 3 source text.
     */
    toTwee(): string;
    /**
     * Return Twine 2 HTML `<tw-storydata>` element (without the surrounding story format template).
     * If no IFID is set, a new one is generated.
     *
     * The only required attributes are `name` and `ifid` of the `<tw-storydata>` element. All others are optional.
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
     * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md Twine 2 HTML Output}
     * @returns {string} `<tw-storydata>` element with its child passages.
     */
    toTwine2HTML(): string;
    /**
     * Return Twine 1 HTML passage elements (without the surrounding story format template).
     * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md Twine 1 HTML Output}
     * @returns {string} Concatenated `<div tiddler>` passage elements.
     */
    toTwine1HTML(): string;
    #private;
}
export const creatorName: "extwee";
export const creatorVersion: "2.4.0";
import Passage from './Passage.js';
