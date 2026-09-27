/**
 * Passage class.
 * @class
 * @classdesc Represents a passage in a Twine story.
 * @property {string} name - Unique name, used as the target of links.
 * @property {string[]} tags - Tags for the passage.
 * @property {Record<string, unknown>} metadata - Metadata for the passage (e.g. `position`, `size`).
 * @property {string} text - Text content of the passage.
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
     * @param {string} name - Passage name, unique within a story.
     * @param {string} text - Passage body text.
     * @param {string[]} tags - Tags applied to the passage.
     * @param {Record<string, unknown>} metadata - Passage metadata (e.g. `{ position: '10,10', size: '100,100' }`).
     * @throws {Error} If any argument has the wrong type (see the individual setters).
     */
    constructor(name?: string, text?: string, tags?: string[], metadata?: Record<string, unknown>);
    /**
     * Set passage name.
     * @param {string} s - New passage name.
     * @throws {Error} Name must be a String!
     */
    set name(s: string);
    /**
     * Passage name, used as the target of links and unique within a story.
     * @returns {string} Name used to link to this passage.
     */
    get name(): string;
    /**
     * Set passage tags.
     * @param {string[]} t - New passage tags.
     * @throws {Error} Tags must be an array!
     */
    set tags(t: string[]);
    /**
     * Passage tags. The `script` and `stylesheet` tags have special meaning when the passage is added to a story.
     * @returns {string[]} Tag list (may be empty).
     */
    get tags(): string[];
    /**
     * Set passage metadata.
     * @param {Record<string, unknown>} m - New passage metadata.
     * @throws {Error} Metadata should be an object literal!
     */
    set metadata(m: Record<string, unknown>);
    /**
     * Passage metadata. `position` and `size` are written to Twine HTML output; all keys are written to Twee output.
     * @returns {Record<string, unknown>} Key/value metadata (may be empty).
     */
    get metadata(): Record<string, unknown>;
    /**
     * Set passage text.
     * @param {string} t - New passage text.
     * @throws {Error} Text should be a String!
     */
    set text(t: string);
    /**
     * Passage body text (unencoded).
     * @returns {string} Unencoded body text.
     */
    get text(): string;
    /**
     * Return a Twee 3 representation. Metacharacters in the name and tags are escaped, as are lines starting with `::`.
     * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twee-3-specification.md Twee 3 Specification}
     * @returns {string} Twee 3 passage, ending with a blank line.
     */
    toTwee(): string;
    /**
     * Return a JSON string. Same as {@link Passage#toJSONString}.
     *
     * **Note:** Unlike the usual `toJSON()` convention, this returns a string, not an object.
     * Do not pass a Passage to `JSON.stringify()`, directly or nested; the output will be encoded twice.
     * Use {@link Passage#toJSONString} when you need JSON text. This is planned to return an object in 3.0.
     * @see {@link https://github.com/videlais/extwee/issues/799 Issue #799}
     * @returns {string} JSON string with `name`, `tags`, `metadata`, and `text`.
     */
    toJSON(): string;
    /**
     * Return a JSON string.
     * @returns {string} JSON string with `name`, `tags`, `metadata`, and `text`.
     */
    toJSONString(): string;
    /**
     * Return Twine 2 HTML `<tw-passagedata>` element with HTML-encoded text.
     * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md#passages Twine 2 HTML Output: Passages}
     * @param {number} [pid] - Passage ID (PID) to record in HTML. Defaults to `1`.
     * @returns {string} `<tw-passagedata>` element.
     */
    toTwine2HTML(pid?: number): string;
    /**
     * Return Twine 1 HTML `<div tiddler>` element with HTML-encoded text. Position defaults to `10,10`.
     * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md Twine 1 HTML Output}
     * @returns {string} `<div tiddler>` element.
     */
    toTwine1HTML(): string;
    #private;
}
