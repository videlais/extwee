/**
 * Element extracted by {@link LightweightTwine2Parser}, in a shape shared by the DOMParser and regex paths.
 */
export type ParsedElement = {
    /**
     * - Attribute values by name (`true` for boolean attributes).
     */
    attributes: Record<string, string | boolean>;
    /**
     * - Decoded text content.
     */
    rawText: string;
    /**
     * - Raw inner HTML (not set for regex-parsed `<tw-passagedata>`).
     */
    innerHTML?: string | undefined;
};
/**
 * Web-optimized Twine 2 HTML parser with reduced dependencies
 * Parse Twine 2 HTML into Story object using lightweight DOM parsing
 *
 * Produces warnings for:
 * - Missing name attribute on `<tw-storydata>` element.
 * - Missing IFID attribute on `<tw-storydata>` element.
 * - Malformed IFID attribute on `<tw-storydata>` element.
 * - Missing name attribute on `<tw-passagedata>` elements (the passage is skipped).
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md Twine 2 HTML Output Specification}
 * @function parse
 * @param {string} content - Twine 2 HTML content to parse.
 * @returns {Story} Story object based on Twine 2 HTML content.
 * @throws {TypeError} Content is not a string!
 * @throws {TypeError} Not Twine 2 HTML content!
 * @throws {Error} Passages are required to have PID!
 */
export function parse(content: string): Story;
/**
 * Element extracted by {@link LightweightTwine2Parser}, in a shape shared by the DOMParser and regex paths.
 * @typedef {object} ParsedElement
 * @property {Record<string, string|boolean>} attributes - Attribute values by name (`true` for boolean attributes).
 * @property {string} rawText - Decoded text content.
 * @property {string} [innerHTML] - Raw inner HTML (not set for regex-parsed `<tw-passagedata>`).
 */
/**
 * Lightweight HTML parser for web builds - specifically for Twine 2 HTML parsing
 * This replaces node-html-parser to reduce bundle size
 */
export class LightweightTwine2Parser {
    /**
     * Parse HTML with the browser's DOMParser, falling back to regex extraction if it is unavailable or reports an error.
     * @param {string} html - Twine 2 HTML to parse.
     */
    constructor(html: string);
    html: string;
    doc: Document | {
        getElementsByTagName: (arg0: string) => ParsedElement[];
    };
    usingDOMParser: boolean;
    /**
     * Find elements by tag name. The regex fallback only supports `tw-storydata`, `tw-passagedata`, and `style`.
     * @param {string} tagName - Tag name to find.
     * @returns {ParsedElement[]} Matching elements (empty if none or unsupported).
     */
    getElementsByTagName(tagName: string): ParsedElement[];
    /**
     * Regex fallback: extract `<tw-storydata>` elements.
     * @returns {ParsedElement[]} `<tw-storydata>` elements found.
     */
    extractStoryDataElements(): ParsedElement[];
    /**
     * Regex fallback: extract `<tw-passagedata>` elements, with tags stripped from their text.
     * @returns {ParsedElement[]} `<tw-passagedata>` elements found.
     */
    extractPassageDataElements(): ParsedElement[];
    /**
     * Regex fallback: extract `<style>` elements.
     * @returns {ParsedElement[]} `<style>` elements found.
     */
    extractStyleElements(): ParsedElement[];
    /**
     * Parse quoted, unquoted, and boolean attributes from an element's opening tag, decoding basic HTML entities.
     * @param {string} elementHtml - Element HTML, starting with its opening tag.
     * @returns {Record<string, string|boolean>} Attribute values by name (`true` for boolean attributes).
     */
    parseAttributes(elementHtml: string): Record<string, string | boolean>;
    /**
     * Strip HTML tags, decode basic HTML entities, and trim.
     * @param {string} html - HTML fragment.
     * @returns {string} Plain text.
     */
    extractTextContent(html: string): string;
    /**
     * Build a minimal DOM-like object backed by the regex extractors.
     * @param {string} _html - Unused; the extractors read `this.html`.
     * @returns {{getElementsByTagName: function(string): ParsedElement[]}} Minimal document.
     */
    createSimpleDOM(_html: string): {
        getElementsByTagName: (arg0: string) => ParsedElement[];
    };
}
import { Story } from '../Story.js';
