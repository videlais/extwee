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
const TweeWriter = require('./TweeWriter.js');
const StoryFormatParser = require('./StoryFormatParser.js');
const HTMLParser = require('./HTMLParser.js');
const HTMLWriter = require('./HTMLWriter.js');

let tp = null;
let sfp = null;

if(argv.hasOwnProperty("input")) {

    tp = new TweeParser(argv.input);
    sfp = new StoryFormatParser(argv.format);
    let hw = new HTMLWriter(argv.output, tp.story, sfp.JSON);
    //console.log(util.inspect(tp.story, { showHidden: true, depth: null, colors: true }));

}

if(argv.hasOwnProperty("decompile")) { 

    let hd = new HTMLParser(argv.decompile);
    let tw = new TweeWriter(hd.story, argv.output);
    //console.log(util.inspect(hd.passages, { showHidden: true, depth: null, colors: true }));

}

