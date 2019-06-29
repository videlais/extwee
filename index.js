const argv = require('yargs')
    .describe('i', 'Source')
    .describe('v', 'Version')
    .describe('f', 'Story Format')
    .describe('d', 'File to decompile')
    .describe('o', 'Output File')
    .alias('v', 'version')
    .alias('i', 'input')
    .alias('f', 'format')
    .alias('d', 'decompile')
    .alias('o', 'output')
    .alias('h', 'help')
    .demandOption(['o'])
    .argv;

const FileReader = require('./FileReader.js');
const TweeParser = require('./TweeParser.js');
const TweeWriter = require('./TweeWriter.js');
const StoryFormatParser = require('./StoryFormatParser.js');
const HTMLParser = require('./HTMLParser.js');
const HTMLWriter = require('./HTMLWriter.js');

if(argv.hasOwnProperty("input") ) {

    if(argv.hasOwnProperty("format") ) {

        if(argv.hasOwnProperty("output") ) {

            let fr = new FileReader(argv.input);
            let tp = new TweeParser(fr.contents);
            let sfp = new StoryFormatParser(argv.format);
            let hw = new HTMLWriter(argv.output, tp.story, sfp.JSON);

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
}
