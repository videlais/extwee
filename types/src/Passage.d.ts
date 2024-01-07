/**
 * A passage is the smallest unit of a Twine story.
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
     * @param {string} s - Name to replace
     */
    set name(s: string);
    /**
     * Name
     * @returns {string} Name
     */
    get name(): string;
    /**
     * @param {Array} t - Replacement array
     */
    set tags(t: any[]);
    /**
     * Tags
     * @returns {Array} Tags
     */
    get tags(): any[];
    /**
     * @param {object} m - Replacement object
     */
    set metadata(m: any);
    /**
     * Metadata
     * @returns {object} Metadata
     */
    get metadata(): any;
    /**
     * @param {string} t - Replacement text
     */
    set text(t: string);
    /**
     * Text
     * @returns {string} Text
     */
    get text(): string;
    /**
     * Return a Twee representation.
     * @returns {string} String form of passage.
     */
    toTwee(): string;
    /**
     * Return JSON representation.
     * @returns {string} JSON string.
     */
    toJSON(): string;
    /**
     * Return Twine 2 HTML representation.
     * (Default Passage ID is 1.)
     * @param {number} pid - Passage ID (PID) to record in HTML.
     * @returns {string} Twine 2 HTML string.
     */
    toTwine2HTML(pid?: number): string;
    /**
     * Return Twine 1 HTML representation.
     * @returns {string} Twine 1 HTML string.
     */
    toTwine1HTML(): string;
    #private;
}
