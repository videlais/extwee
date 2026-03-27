/**
 * Passage class.
 * @class
 * @classdesc Represents a passage in a Twine story.
 * @property {string} name - Name of the passage.
 * @property {Array} tags - Tags for the passage.
 * @property {object} metadata - Metadata for the passage.
 * @property {string} text - Text content of the passage.
 * @function toTwee - Return a Twee representation.
 * @function toJSON - Return JSON representation.
 * @function toTwine2HTML - Return Twine 2 HTML representation.
 * @function toTwine1HTML - Return Twine 1 HTML representation.
 * @example
 * const p = new Passage('Start', 'This is the start of the story.');
 * console.log(p.toTwee());
 * // :: Start
 * // This is the start of the story.
 * //
 * console.log(p.toJSON());
 * // {"name":"Start","tags":[],"metadata":{},"text":"This is the start of the story."}
 * console.log(p.toTwine2HTML());
 * // <tw-passagedata pid="1" name="Start" tags="" >This is the start of the story.</tw-passagedata>
 * console.log(p.toTwine1HTML());
 * // <div tiddler="Start" tags="" modifier="extwee" twine-position="10,10">This is the start of the story.</div>
 * @example
 * const p = new Passage('Start', 'This is the start of the story.', ['start', 'beginning'], {position: '10,10', size: '100,100'});
 * console.log(p.toTwee());
 * // :: Start [start beginning] {"position":"10,10","size":"100,100"}
 * // This is the start of the story.
 * //
 * console.log(p.toJSON());
 * // {"name":"Start","tags":["start","beginning"],"metadata":{"position":"10,10","size":"100,100"},"text":"This is the start of the story."}
 * console.log(p.toTwine2HTML());
 * // <tw-passagedata pid="1" name="Start" tags="start beginning" position="10,10" size="100,100">This is the start of the story.</tw-passagedata>
 * console.log(p.toTwine1HTML());
 * // <div tiddler="Start" tags="start beginning" modifier="extwee" twine-position="10,10">This is the start of the story.</div>
 */
export default class Passage {
    /**
     * Create a passage.
     * @param {string} name - Name
     * @param {string} text - Content
     * @param {Array} tags - Tags
     * @param {object} metadata - Metadata
     */
    constructor(name?: string, text?: string, tags?: any[], metadata?: object);
    /**
     * Set passage name.
     * @param {string} s - Name to replace
     * @throws {Error} Name must be a String!
     */
    set name(s: string);
    /**
     * Name
     * @returns {string} Name
     */
    get name(): string;
    /**
     * Set passage tags.
     * @param {Array} t - Replacement array
     * @throws {Error} Tags must be an array!
     */
    set tags(t: any[]);
    /**
     * Tags
     * @returns {Array} Tags
     */
    get tags(): any[];
    /**
     * Set passage metadata.
     * @param {object} m - Replacement object
     * @throws {Error} Metadata must be an object literal!
     */
    set metadata(m: object);
    /**
     * Metadata
     * @returns {object} Metadata
     */
    get metadata(): object;
    /**
     * Set passage text.
     * @param {string} t - Replacement text
     * @throws {Error} Text should be a String!
     */
    set text(t: string);
    /**
     * Text
     * @returns {string} Text
     */
    get text(): string;
    /**
     * Return a Twee representation.
     *
     * See: https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md
     * @function toTwee
     * @returns {string} String form of passage.
     */
    toTwee(): string;
    /**
     * Return JSON representation.
     * @function toJSON
     * @returns {string} JSON string.
     */
    toJSON(): string;
    /**
     * Return Twine 2 HTML representation.
     * (Default Passage ID is 1.)
     * @function toTwine2HTML
     * @param {number} pid - Passage ID (PID) to record in HTML.
     * @returns {string} Twine 2 HTML string.
     */
    toTwine2HTML(pid?: number): string;
    /**
     * Return Twine 1 HTML representation.
     * @function toTwine1HTML
     * @returns {string} Twine 1 HTML string.
     */
    toTwine1HTML(): string;
    #private;
}
