import FileReader from './src/FileReader.js';
import TweeParser from './src/TweeParser.js';
import TweeWriter from './src/TweeWriter.js';
import StoryFormatParser from './src/StoryFormatParser.js';
import Twine2HTMLParser from './src/Twine2HTMLParser.js';
import Twine2HTMLWriter from './src/Twine2HTMLWriter.js';
import Story from './src/Story.js';
import Passage from './src/Passage.js';
import StoryFormat from './src/StoryFormat.js';

export { FileReader };
export { TweeParser };
export { StoryFormat };
export { Passage };
export { Story };
export { StoryFormatParser };
export { Twine2HTMLParser };
export { Twine2HTMLWriter };

// Export everything by default
export default {
    readFile: FileReader.read,
    parseTwee: TweeParser.parse,
    writeTwee: TweeWriter.write,
    StoryFormat,
    Passage,
    Story,
    parseStoryFormat: StoryFormatParser.parse,
    parseHTML: Twine2HTMLParser.parse,
    writeHTML: Twine2HTMLWriter.write
};
