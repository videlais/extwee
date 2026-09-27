export type Story = import("../Story.js").Story;
/**
 * `<tw-storydata>` element extracted by {@link LightweightTwine2ArchiveParser}.
 */
export type ParsedStoryData = {
    /**
     * - Full element HTML.
     */
    outerHTML: string;
    /**
     * - Returns `outerHTML`.
     */
    toString: () => string;
};
/**
 * Web-optimized Twine 2 Archive HTML parser with reduced dependencies
 * Parse Twine 2 Archive HTML and returns an array of story objects using browser DOM APIs.
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-archive-spec.md Twine 2 Archive Specification}
 * @function parse
 * @param {string} content - Content to parse for Twine 2 HTML elements.
 * @throws {TypeError} Content is not a string!
 * @returns {Story[]} Stories found in content (empty if none).
 * @example
 * const content = '<tw-storydata name="Untitled" startnode="1" creator="Twine" creator-version="2.3.9" ifid="A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6" zoom="1" format="Harlowe" format-version="3.1.0" options="" hidden><style role="stylesheet" id="twine-user-stylesheet" type="text/twine-css"></style><script role="script" id="twine-user-script" type="text/twine-javascript"></script><tw-passagedata pid="1" name="Untitled Passage" tags="" position="0,0" size="100,100"></tw-passagedata></tw-storydata>';
 * console.log(parse(content));
 * // => [
 * //     Story {
 * //      name: 'Untitled',
 * //      startnode: '1',
 * //      creator: 'Twine',
 * //      creatorVersion: '2.3.9',
 * //      ifid: 'A1B2C3D4-E5F6-G7H8-I9J0-K1L2M3N4O5P6',
 * //      zoom: '1',
 * //      format: 'Harlowe',
 * //      formatVersion: '3.1.0',
 * //      options: '',
 * //      hidden: '',
 * //      passages: [
 * //        Passage {
 * //          pid: '1',
 * //          name: 'Untitled Passage',
 * //          tags: '',
 * //          position: '0,0',
 * //          size: '100,100',
 * //          text: ''
 * //        }
 * //      ]
 * //    }
 * //   ]
 */
export function parse(content: string): Story[];
/** @typedef {import('../Story.js').Story} Story */
/**
 * `<tw-storydata>` element extracted by {@link LightweightTwine2ArchiveParser}.
 * @typedef {object} ParsedStoryData
 * @property {string} outerHTML - Full element HTML.
 * @property {function(): string} toString - Returns `outerHTML`.
 */
/**
 * Lightweight HTML parser for web builds - specifically for Twine 2 Archive HTML parsing
 * This replaces node-html-parser to reduce bundle size and uses browser DOM APIs
 */
export class LightweightTwine2ArchiveParser {
    /**
     * Parse HTML with the browser's DOMParser, falling back to regex extraction if it is unavailable or reports an error.
     * @param {string} html - Twine 2 Archive HTML to parse.
     */
    constructor(html: string);
    html: string;
    doc: Document | {
        getElementsByTagName: (arg0: string) => ParsedStoryData[];
    };
    usingDOMParser: boolean;
    /**
     * Find elements by tag name. The regex fallback only supports `tw-storydata`.
     * @param {string} tagName - Tag name to find.
     * @returns {ParsedStoryData[]} Matching elements (empty if none or unsupported).
     */
    getElementsByTagName(tagName: string): ParsedStoryData[];
    /**
     * Regex fallback: extract complete `<tw-storydata>` elements.
     * @returns {ParsedStoryData[]} Complete `<tw-storydata>` elements found.
     */
    extractStoryDataElements(): ParsedStoryData[];
    /**
     * Build a minimal DOM-like object backed by the regex extractor.
     * @param {string} _htmlContent - Unused; the extractor reads `this.html`.
     * @returns {{getElementsByTagName: function(string): ParsedStoryData[]}} Minimal document.
     */
    createSimpleDOM(_htmlContent: string): {
        getElementsByTagName: (arg0: string) => ParsedStoryData[];
    };
}
