// TWS parser module
import { getGlobalObject } from './getGlobalObject.js';
import { parse as parseTWS } from '../TWS/parse.js';

// Create UMD-compatible export object
const Extwee = {
    parseTWS,
    parse: parseTWS  // For module consistency
};

// Export for webpack UMD build
export default Extwee;

// Also export individual functions for ES6 module usage
export {
    parseTWS as parse
};

// Add to global Extwee object for direct usage
const globalObject = getGlobalObject();

if (globalObject) {
    globalObject.Extwee = globalObject.Extwee || {};
    globalObject.Extwee.parseTWS = parseTWS;
}
