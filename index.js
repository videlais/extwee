import FileReader from './src/FileReader.js';
import TweeParser from './src/TweeParser.js';
import TweeWriter from './src/TweeWriter.js';
import StoryFormatParser from './src/StoryFormatParser.js';
import HTMLParser from './src/HTMLParser.js';
import HTMLWriter from './src/HTMLWriter.js';
import Story from './src/Story.js';
import Passage from './src/Passage.js';
import StoryFormat from './src/StoryFormat.js';

// Just FileReader
export { FileReader };

// Just TweeParser
export { TweeParser };

// Just TweeWriter
export { TweeWriter };

// Just StoryFormat
export { StoryFormat };

// Just StoryFormatParser
export { StoryFormatParser };

// Just Story
export { Story };

// Just Passage
export { Passage };

// Just HTMLWriter
export { HTMLWriter };

// Just HTMLParser
export { HTMLParser };

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
  writeHTML: HTMLWriter.write,
};
