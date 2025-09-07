import { parse as parseTwee } from '../Twee/parse.js';
import { parse as parseJSON } from '../JSON/parse.js';
import { parse as parseStoryFormat } from '../StoryFormat/parse.js';
import { parse as parseTwine1HTML } from '../Twine1HTML/parse.js';
import { parse as parseTwine2HTML } from '../Twine2HTML/parse.js';
import { parse as parseTwine2ArchiveHTML } from '../Twine2ArchiveHTML/parse.js';
import { parse as parseTWS } from '../TWS/parse.js';
import { compile as compileTwine1HTML } from '../Twine1HTML/compile.js';
import { compile as compileTwine2HTML } from '../Twine2HTML/compile.js';
import { compile as compileTwine2ArchiveHTML } from '../Twine2ArchiveHTML/compile.js';
import { generate as generateIFID } from '../IFID/generate.js';
import { Story } from '../Story.js';
import Passage from '../Passage.js';
import StoryFormat from '../StoryFormat.js';

window.Extwee = {
    parseTwee,
    parseJSON,
    parseTWS,
    parseStoryFormat,
    parseTwine1HTML,
    parseTwine2HTML,
    parseTwine2ArchiveHTML,
    compileTwine1HTML,
    compileTwine2HTML,
    compileTwine2ArchiveHTML,
    generateIFID,
    Story,
    Passage,
    StoryFormat
};
