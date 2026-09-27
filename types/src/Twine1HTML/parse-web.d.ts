/**
 * Passage element extracted by {@link LightweightTwine1Parser}, in a shape shared by the DOMParser and regex paths.
 */
export type ParsedTiddler = {
    /**
     * - Attribute values by name (e.g. `tiddler`, `tags`, `twine-position`).
     */
    attributes: Record<string, string>;
    /**
     * - Decoded text content.
     */
    rawText: string;
};
/**
 * Web-optimized Twine 1 HTML parser with reduced dependencies
 * Parses Twine 1 HTML into a Story object using lightweight DOM parsing
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md Twine 1 HTML Documentation}
 * @function parse
 * @param {string} content - Twine 1 HTML content to parse.
 * @returns {Story} Story object
 * @throws {Error} Cannot find #storeArea or #store-area!
 */
export function parse(content: string): Story;
/**
 * Passage element extracted by {@link LightweightTwine1Parser}, in a shape shared by the DOMParser and regex paths.
 * @typedef {object} ParsedTiddler
 * @property {Record<string, string>} attributes - Attribute values by name (e.g. `tiddler`, `tags`, `twine-position`).
 * @property {string} rawText - Decoded text content.
 */
/**
 * Lightweight HTML parser for web builds - specifically for Twine 1 HTML parsing
 * This replaces node-html-parser to reduce bundle size
 */
export class LightweightTwine1Parser {
    /**
     * Parse HTML with the browser's DOMParser, falling back to regex extraction if it is unavailable or reports an error.
     * @param {string} html - Twine 1 HTML to parse.
     */
    constructor(html: string);
    html: string;
    doc: Document | {
        querySelector: (arg0: string) => ({
            found: true;
        } | null);
        querySelectorAll: (arg0: string) => ParsedTiddler[];
    };
    usingDOMParser: boolean;
    /**
     * Find the first element matching a selector. The regex fallback only supports `#storeArea` and `#store-area`.
     * @param {string} selector - CSS selector.
     * @returns {Element|{found: true}|null} Matching element, a placeholder when found by the fallback, or `null`.
     */
    querySelector(selector: string): Element | {
        found: true;
    } | null;
    /**
     * Find all elements matching a selector. The regex fallback only supports `[tiddler]`.
     * @param {string} selector - CSS selector.
     * @returns {ParsedTiddler[]} Matching elements (empty if none or unsupported).
     */
    querySelectorAll(selector: string): ParsedTiddler[];
    /**
     * Regex fallback: extract `<div tiddler>` passage elements.
     * @returns {ParsedTiddler[]} Passage elements.
     */
    extractTiddlerElements(): ParsedTiddler[];
    /**
     * Extract the `tiddler`, `tags`, `twine-position`, and `modifier` attributes from a passage element.
     * @param {string} elementHtml - Passage element HTML.
     * @returns {Record<string, string>} Attribute values found.
     */
    parseAttributes(elementHtml: string): Record<string, string>;
    /**
     * Strip HTML tags, decode basic HTML entities, and trim.
     * @param {string} html - HTML fragment.
     * @returns {string} Plain text.
     */
    extractTextContent(html: string): string;
    /**
     * Build a minimal DOM-like object backed by string checks and the regex extractors.
     * @param {string} html - Twine 1 HTML.
     * @returns {{querySelector: function(string): ({found: true}|null), querySelectorAll: function(string): ParsedTiddler[]}} Minimal document.
     */
    createSimpleDOM(html: string): {
        querySelector: (arg0: string) => ({
            found: true;
        } | null);
        querySelectorAll: (arg0: string) => ParsedTiddler[];
    };
}
import { Story } from '../Story.js';
