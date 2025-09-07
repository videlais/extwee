// TWS parser module
import { parse as parseTWS } from '../TWS/parse.js';

// Export for use as a separate module
export {
    parseTWS as parse
};

// Also add to global Extwee if it exists
if (typeof window !== 'undefined' && window.Extwee) {
    window.Extwee.parseTWS = parseTWS;
}
