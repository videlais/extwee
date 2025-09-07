// Core web build - Common parsers and functionality
import { parse as parseTwee } from '../Twee/parse.js';
import { parse as parseJSON } from '../JSON/parse.js';
import { parse as parseStoryFormat } from '../StoryFormat/parse.js';
import { parse as parseTwine2HTML } from '../Twine2HTML/parse-web.js';
import { compile as compileTwine2HTML } from '../Twine2HTML/compile.js';
import { generate as generateIFID } from '../IFID/generate.js';
import { Story } from '../Story.js';
import Passage from '../Passage.js';
import StoryFormat from '../StoryFormat.js';

// Core functionality - most commonly used
window.Extwee = {
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
    version: '2.3.2'
};
