// Twine1HTML parser module
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
const globalObject = (function() {
    if (typeof globalThis !== 'undefined') return globalThis;
    if (typeof window !== 'undefined') return window;
    if (typeof global !== 'undefined') return global;
    if (typeof self !== 'undefined') return self;
    return null;
})();

if (globalObject) {
    globalObject.Extwee = globalObject.Extwee || {};
    globalObject.Extwee.parseTwine1HTML = parseTwine1HTML;
    globalObject.Extwee.compileTwine1HTML = compileTwine1HTML;
}
