import TweeParser from './src/TweeParser.js';
import JSONParser from './src/JSONParser.js';
import StoryFormatParser from './src/StoryFormatParser.js';
import Twine1HTMLParser from './src/Twine1HTMLParser.js';
import Twine2HTMLParser from './src/Twine2HTMLParser.js';
import Twine2ArchiveHTMLParser from './src/Twine2ArchiveHTMLParser.js';
import Twine1HTMLCompiler from './src/Twine1HTMLCompiler.js';
import Twine2ArchiveHTMLCompiler from './src/Twine2ArchiveHTMLCompiler.js';
import Twine2HTMLCompiler from './src/Twine2HTMLCompiler.js';
import Story from './src/Story.js';
import Passage from './src/Passage.js';
import StoryFormat from './src/StoryFormat.js';

// Code objects.
export { StoryFormat };
export { Passage };
export { Story };

// Parsers.
export { TweeParser };
export { JSONParser };
export { StoryFormatParser };
export { Twine2HTMLParser };
export { Twine1HTMLParser };
export { Twine2ArchiveHTMLParser };

// Compilers.
export { Twine2HTMLCompiler };
export { Twine1HTMLCompiler };
export { Twine2ArchiveHTMLCompiler };

// Export everything by default.
export default {
    // Objects
    StoryFormat,
    Passage,
    Story,
    // Parser shortcuts.
    parseTwee: TweeParser.parse,
    parseStoryFormat: StoryFormatParser.parse,
    parseTwine1HTML: Twine1HTMLParser.parse,
    parseTwine2HTML: Twine2HTMLParser.parse,
    parseTwine2ArchiveHTML: Twine2ArchiveHTMLParser.parse,
    // Compiler shortcuts.
    compileTwine2HTML: Twine2HTMLCompiler.compile,
    compileTwine1HTML: Twine1HTMLCompiler.compile,
    compileTwine2ArchiveHTML: Twine2ArchiveHTMLCompiler.compile
};
