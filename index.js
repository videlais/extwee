/*
 *	 
 *    
 */

const util = require('util');

const argv = require('yargs')
	.usage('Usage: extwee -i [Source] -f [Story Format] -d [Decompile File] -o [Output file]')
	.describe('i', 'Source')
    .describe('h', 'Help')
    .describe('v', 'Version')
    .describe('f', 'Story Format')
    .describe('d', 'File to decompile')
    .describe('o', 'Output File')
    .alias('h', 'help')
    .alias('v', 'version')
    .alias('i', 'input')
    .alias('f', 'format')
    .alias('d', 'decompile')
    .alias('o', 'output')
    .argv;

const TweeParser = require('./TweeParser.js');
const StoryFormatParser = require('./StoryFormatParser.js');
const HTMLDecompiler = require('./HTMLDecompiler.js')

if(argv.hasOwnProperty("input")) {

    let tp = new TweeParser(argv.input);
    console.log(util.inspect(tp.story, { showHidden: true, depth: null, colors: true }));

}

if(argv.hasOwnProperty("format")) {

    let sfp = new StoryFormatParser(argv.format);
    console.log(util.inspect(sfp.storyformat, { showHidden: true, depth: null, colors: true }));

}

if(argv.hasOwnProperty("decompile")) { 

    let hd = new HTMLDecompiler(argv.decompile, argv.output);
    //console.log(util.inspect(hd.passages, { showHidden: true, depth: null, colors: true }));

}


