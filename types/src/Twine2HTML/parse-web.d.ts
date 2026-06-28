/**
 * Web-optimized Twine 2 HTML parser with reduced dependencies
 * Parse Twine 2 HTML into Story object using lightweight DOM parsing
 *
 * See: Twine 2 HTML Output Specification
 * (https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md)
 *
 * Produces warnings for:
 * - Missing name attribute on `<tw-storydata>` element.
 * - Missing IFID attribute on `<tw-storydata>` element.
 * - Malformed IFID attribute on `<tw-storydata>` element.
 * @function parse
 * @param {string} content - Twine 2 HTML content to parse.
 * @returns {Story} Story object based on Twine 2 HTML content.
 * @throws {TypeError} Content is not a string.
 * @throws {Error} Not Twine 2 HTML content!
 * @throws {Error} Cannot parse passage data without name!
 * @throws {Error} Passages are required to have PID!
 */
export function parse(content: string): Story;
/**
 * Lightweight HTML parser for web builds - specifically for Twine 2 HTML parsing
 * This replaces node-html-parser to reduce bundle size
 */
export class LightweightTwine2Parser {
    constructor(html: any);
    html: any;
    doc: Document | {
        getElementsByTagName: (tagName: any) => {
            attributes: {};
            rawText: any;
        }[];
    };
    usingDOMParser: boolean;
    getElementsByTagName(tagName: any): {
        attributes: {};
        rawText: any;
    }[];
    extractStoryDataElements(): {
        attributes: {};
        innerHTML: string;
        rawText: string;
    }[];
    extractPassageDataElements(): {
        attributes: {};
        rawText: any;
    }[];
    extractStyleElements(): {
        attributes: {};
        rawText: string;
        innerHTML: string;
    }[];
    parseAttributes(elementHtml: any): {};
    extractTextContent(html: any): any;
    createSimpleDOM(_html: any): {
        getElementsByTagName: (tagName: any) => {
            attributes: {};
            rawText: any;
        }[];
    };
}
import { Story } from '../Story.js';
