const argv = require('yargs')
    .describe('i', 'Source')
    .describe('v', 'Version')
    .describe('f', 'Story Format')
    .describe('d', 'File to decompile')
    .describe('o', 'Output File')
    .describe('r', 'Directory')
    .describe('w', 'Watch')
    .alias('v', 'version')
    .alias('i', 'input')
    .alias('f', 'format')
    .alias('d', 'decompile')
    .alias('o', 'output')
    .alias('h', 'help')
    .alias('r', 'dir')
    .alias('w', 'watch')
    .argv;

const FileReader = require('./FileReader.js');
const TweeParser = require('./TweeParser.js');
const TweeWriter = require('./TweeWriter.js');
const StoryFormatParser = require('./StoryFormatParser.js');
const HTMLParser = require('./HTMLParser.js');
const HTMLWriter = require('./HTMLWriter.js');
const DirectoryReader = require('./DirectoryReader.js');
const DirectoryWatcher = require('./DirectoryWatcher.js');

if(argv.hasOwnProperty("input") ) {

    if(argv.hasOwnProperty("format") ) {

        if(argv.hasOwnProperty("output") ) {

            let fr = new FileReader(argv.input);
            let tp = new TweeParser(fr.contents);
            let sfp = new StoryFormatParser(argv.format);
            let hw = new HTMLWriter(argv.output, tp.story, sfp.storyformat);

        } else {
            throw new Error("Missing output file!");
        }

    } else {
        throw new Error("Missing format file");
    }
} else if(argv.hasOwnProperty("decompile") ) {

    if(argv.hasOwnProperty("output") )
    {
        let fr = new FileReader(argv.decompile);
        let hd = new HTMLParser(fr.contents);
        let tw = new TweeWriter(hd.story, argv.output);

    } else {
        throw new Error("Missing output file!");
    }
} else if(argv.hasOwnProperty("dir") ) {

  const dir = new DirectoryReader(argv.dir);

  if(argv.hasOwnProperty("format") ) {

      if(argv.hasOwnProperty("output") ) {

          let tp = new TweeParser(dir.tweeContents);
          let sfp = new StoryFormatParser(argv.format);
          let hw = new HTMLWriter(argv.output, tp.story, sfp.storyformat, dir.CSScontents, dir.JScontents);

      } else {
          throw new Error("Missing output file!");
      }

  } else {
      throw new Error("Missing format file");
  }

} else if(argv.hasOwnProperty("watch") ) {

  if(argv.hasOwnProperty("format") ) {

      if(argv.hasOwnProperty("output") ) {

        let dir = new DirectoryReader(argv.watch);

        let dw = new DirectoryWatcher(argv.watch, () => {

          console.info("Re-building files.");
          dir.update();
          let tp = new TweeParser(dir.tweeContents);
          let sfp = new StoryFormatParser(argv.format);
          let hw = new HTMLWriter(argv.output, tp.story, sfp.storyformat, dir.CSScontents, dir.JScontents);

        });

      } else {
          throw new Error("Missing output file!");
      }

  } else {
      throw new Error("Missing format file");
  }

}
