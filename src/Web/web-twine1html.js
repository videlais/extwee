// Twine1HTML parser module
import { getGlobalObject } from './getGlobalObject.js';
import { parse as parseTwine1HTML } from '../Twine1HTML/parse-web.js';
import { compile as compileTwine1HTML } from '../Twine1HTML/compile.js';

// Create UMD-compatible export object
const Extwee = {
    parseTwine1HTML,
    compileTwine1HTML,
    parse: parseTwine1HTML,  // For module consistency
    compile: compileTwine1HTML  // For module consistency
};

// Export for webpack UMD build
export default Extwee;

// Also export individual functions for ES6 module usage
export {
    parseTwine1HTML as parse,
    compileTwine1HTML as compile
};

// Add to global Extwee object for direct usage
const globalObject = getGlobalObject();

if (globalObject) {
    globalObject.Extwee = globalObject.Extwee || {};
    globalObject.Extwee.parseTwine1HTML = parseTwine1HTML;
    globalObject.Extwee.compileTwine1HTML = compileTwine1HTML;
}
