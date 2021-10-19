import FileReader from './src/FileReader.js';
import TweeParser from './src/TweeParser.js';
import TweeWriter from './src/TweeWriter.js';
import StoryFormatParser from './src/StoryFormatParser.js';
import HTMLParser from './src/HTMLParser.js';
import HTMLWriter from './src/HTMLWriter.js';
import Story from './src/Story.js';
import Passage from './src/Passage.js';
import StoryFormat from './src/StoryFormat.js';

export { FileReader };
export { TweeParser };
export { StoryFormat };
export { Passage };
export { Story };
export { StoryFormatParser };
export { HTMLParser };
export { HTMLWriter };

// Export everything by default
export default {
    readFile: FileReader.read,
    parseTwee: TweeParser.parse,
    writeTwee: TweeWriter.write,
    StoryFormat,
    Passage,
    Story,
    parseStoryFormat: StoryFormatParser.parse,
    parseHTML: HTMLParser.parse,
    writeHTML: HTMLWriter.writeHTML
};
