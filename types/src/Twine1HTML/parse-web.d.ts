/**
 * Web-optimized Twine 1 HTML parser with reduced dependencies
 * Parses Twine 1 HTML into a Story object using lightweight DOM parsing
 * @see {@link https://github.com/iftechfoundation/twine-specs/blob/master/twine-1-htmloutput-doc.md Twine 1 HTML Documentation}
 * @function parse
 * @param {string} content - Twine 1 HTML content to parse.
 * @returns {Story} Story object
 */
export function parse(content: string): Story;
/**
 * Lightweight HTML parser for web builds - specifically for Twine 1 HTML parsing
 * This replaces node-html-parser to reduce bundle size
 */
export class LightweightTwine1Parser {
    constructor(html: any);
    html: any;
    doc: Document | {
        querySelector: (selector: any) => {
            found: boolean;
        } | null;
        querySelectorAll: (selector: any) => {
            attributes: {
                tiddler: any;
                tags: any;
                'twine-position': any;
                modifier: any;
            };
            rawText: any;
        }[];
    };
    usingDOMParser: boolean;
    querySelector(selector: any): HTMLElement | {
        found: boolean;
    } | null;
    querySelectorAll(selector: any): {
        attributes: {};
        rawText: any;
    }[];
    extractTiddlerElements(): {
        attributes: {
            tiddler: any;
            tags: any;
            'twine-position': any;
            modifier: any;
        };
        rawText: any;
    }[];
    parseAttributes(elementHtml: any): {
        tiddler: any;
        tags: any;
        'twine-position': any;
        modifier: any;
    };
    extractTextContent(html: any): any;
    createSimpleDOM(html: any): {
        querySelector: (selector: any) => {
            found: boolean;
        } | null;
        querySelectorAll: (selector: any) => {
            attributes: {
                tiddler: any;
                tags: any;
                'twine-position': any;
                modifier: any;
            };
            rawText: any;
        }[];
    };
}
import { Story } from '../Story.js';
