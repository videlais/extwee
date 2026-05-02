// Core web build - Common parsers and functionality
import { getGlobalObject } from './getGlobalObject.js';
import { parse as parseTwee } from '../Twee/parse.js';
import { parse as parseJSON } from '../JSON/parse.js';
import { parse as parseStoryFormat } from '../StoryFormat/parse.js';
import { parse as parseTwine2HTML } from '../Twine2HTML/parse-web.js';
import { compile as compileTwine2HTML } from '../Twine2HTML/compile.js';
import { generate as generateIFID } from '../IFID/generate.js';
import { Story } from '../Story.js';
import Passage from '../Passage.js';
import StoryFormat from '../StoryFormat.js';
import { version } from '../version.js';

// Core functionality - most commonly used
const Extwee = {
    // Core parsers (immediately available)
    parseTwee,
    parseJSON,
    parseStoryFormat,
    parseTwine2HTML,
    
    // Core compiler
    compileTwine2HTML,
    
    // Core utilities
    generateIFID,
    Story,
    Passage,
    StoryFormat,
    
    // Version info
    version
};

// Export individual functions for ES6 module usage
export { parseTwee, parseJSON, parseStoryFormat, parseTwine2HTML, compileTwine2HTML, generateIFID, Story, Passage, StoryFormat };

// Export default for webpack UMD build
export default Extwee;

// For direct ES6 module usage, also assign to global object
// Use globalThis for cross-environment compatibility (browser, Node.js, Web Workers)
const globalObject = getGlobalObject();

if (globalObject) {
    globalObject.Extwee = Extwee;
}
