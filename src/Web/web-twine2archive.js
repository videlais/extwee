// Twine2ArchiveHTML parser module
import { getGlobalObject } from './getGlobalObject.js';
import { parse as parseTwine2ArchiveHTML } from '../Twine2ArchiveHTML/parse-web.js';
import { compile as compileTwine2ArchiveHTML } from '../Twine2ArchiveHTML/compile.js';

// Create UMD-compatible export object
const Extwee = {
    parseTwine2ArchiveHTML,
    compileTwine2ArchiveHTML,
    parse: parseTwine2ArchiveHTML,  // For module consistency
    compile: compileTwine2ArchiveHTML  // For module consistency
};

// Export for webpack UMD build
export default Extwee;

// Also export individual functions for ES6 module usage
export {
    parseTwine2ArchiveHTML as parse,
    compileTwine2ArchiveHTML as compile
};

// Add to global Extwee object for direct usage
const globalObject = getGlobalObject();

if (globalObject) {
    globalObject.Extwee = globalObject.Extwee || {};
    globalObject.Extwee.parseTwine2ArchiveHTML = parseTwine2ArchiveHTML;
    globalObject.Extwee.compileTwine2ArchiveHTML = compileTwine2ArchiveHTML;
}
