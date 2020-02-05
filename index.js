const FileReader = require('./src/FileReader.js');
const TweeParser = require('./src/TweeParser.js');
const TweeWriter = require('./src/TweeWriter.js');
const StoryFormatParser = require('./src/StoryFormatParser.js');
const HTMLParser = require('./src/HTMLParser.js');
const HTMLWriter = require('./src/HTMLWriter.js');
const DirectoryReader = require('./src/DirectoryReader.js');
const DirectoryWatcher = require('./src/DirectoryWatcher.js');
const Story = require('./src/Story.js');
const Passage = require('./src/Passage.js');
const StoryFormat = require('./src/StoryFormat.js');

module.exports = {
  FileReader: FileReader,
  TweeParser: TweeParser,
  TweeWriter: TweeWriter,
  StoryFormat: StoryFormat,
  Passage: Passage,
  Story: Story,
  StoryFormatParser: StoryFormatParser,
  FileReader: FileReader,
  HTMLParser: HTMLParser,
  HTMLWriter: HTMLWriter,
  DirectoryReader: DirectoryReader,
  DirectoryWatcher: DirectoryWatcher
};
